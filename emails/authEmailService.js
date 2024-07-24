import { createTransport } from "../config/nodemailer.js";

export const sendEmailVerification = async ({ name, email, token }) => {
  const transporter = createTransport(
    "sandbox.smtp.mailtrap.io",
    2525,
    "7ed5a942d07476",
    "db765ed6972f26"
  );
  // send email
  const info = await transporter.sendMail({
    from: "AppSalon",
    to: email,
    subject: "AppSalon - Confirma tu cuenta",
    text: "AppSalon - Confirma tu cuenta",
    html: `<p>¡Hola ${name}!</p>
	<p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace</p>
	<a href="http://localhost:4000/api/auth/verify/${token}">Confirmar Cuenta</a>
	<p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
	`,
  });
};
