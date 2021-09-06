import express, { response } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { RateLimiterMemory } from "rate-limiter-flexible";
import nodemailer from "nodemailer";
import {
  isValidEmail,
  isValidMessage,
  isValidName,
  extractSecret,
  hasValidSuperSecretSecret,
  sendMail,
} from "./functions.js";
import createServer from "./socket.js";

dotenv.config(); // load config
// configure mailer
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// configure ratelimiter
const rateLimiterOpts = {
  points: 6,
  duration: 10,
};
const rateLimiter = new RateLimiterMemory(rateLimiterOpts);
const app = express();

// configure app
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => res.status(400).json({ error: "Too many requests" }));
});
app.use(extractSecret);

// message route
app.use("/api/create-message", async (req, res, next) => {
  const { name, email, message } = req.body;

  // validate the super secret secret
  if (!hasValidSuperSecretSecret(req.superSecretSecret)) {
    return res
      .status(400)
      .json({ error: "That is not the super secret secret" });
  }

  // make sure we have a name, email and message
  if (!isValidName(name) || !isValidEmail(email) || !isValidMessage(message)) {
    return res
      .status(400)
      .json({ error: "Name, email and/or message is missing/invalid" });
  }

  try {
    await sendMail(transporter, {
      to: process.env.EMAIL,
      from: {
        name,
        email,
      },
      message,
    });
    return res.json({
      response: `Your message from ${name} (${email}) was sent.`,
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/ping", (req, res) => {
  return res.json({ response: "plong" });
});

// 404 route
app.use("/", (req, res) => {
  return res.status(404).json({ error: "Unknown endpoint" });
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Malformed request" });
});

const server = createServer(app);

// startup
transporter.verify(error => {
  if (error) {
    return console.error(error);
  } else {
    console.log("Connected to mailserver");
    return server.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  }
});
