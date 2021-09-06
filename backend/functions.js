export function isValidEmail(email) {
  return (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    ) && email.length < 254
  );
}

export function isValidName(name) {
  return typeof name === "string" && name.length > 2 && name.length < 254;
}

export function isValidMessage(message) {
  return (
    typeof message === "string" && message.length > 2 && message.length < 500
  );
}

export function hasValidSuperSecretSecret(sss) {
  return sss === process.env.SUPER_SECRET_SECRET;
}

export function extractSecret(req, res, next) {
  const authorization = req.get("authorization");
  if (
    authorization &&
    authorization.toLowerCase().startsWith("supersecretsecret ")
  ) {
    req.superSecretSecret = authorization.substring(18);
    return next();
  } else {
    const error = new Error("No Super Secret Secret");
    return next(error);
  }
}

export async function sendMail(transporter, mail) {
  return await transporter.sendMail({
    from: `Flat9.dev Contact Form <no.reply@zircus.ca>`,
    to: mail.to,
    subject: `Message from ${mail.from.name} - Flat9.dev Contact Form`,
    text: `Name: ${mail.from.name}
Email: ${mail.from.email}
Message: ${mail.message}`,
    html: `<!DOCTYPE html>
<html>
  <head>
    <title>New Message from ${mail.from.name}</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <main role="main">
      <h1>New Message</h1>
      <address>
        ${mail.from.name}<br />
        <a
          href="mailto:${mail.from.email}"
          title="Send ${mail.from.name} a reply"
        >${mail.from.email}
        </a><br />
      </address>
      <p>${mail.message}</p>
    </main>
  </body>
</html>
    `,
  });
}
