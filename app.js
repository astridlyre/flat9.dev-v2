import express from "express";
import helmet from "helmet";

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.static("/www"));
