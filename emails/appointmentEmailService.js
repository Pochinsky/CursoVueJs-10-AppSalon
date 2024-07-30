import { createTransport } from "../config/nodemailer.js";

export const sendEmailNewAppointment = async ({ date, time }) => {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send email
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon",
    subject: "AppSalon - Nueva Cita",
    text: "AppSalon - Nueva Cita",
    html: `<p>¡Atención Administrador!</p>
		<p>Tienes una nueva cita para el día ${date} a las ${time} horas.</p>`,
  });
};

export const sendEmailUpdateAppointment = async ({ date, time }) => {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send email
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon",
    subject: "AppSalon - Cita actualizada",
    text: "AppSalon - Cita actualizada",
    html: `<p>¡Atención Administrador!</p>
		<p>Un usuario ha modificado una cita.</p>
		<p>La nueva cita será el día ${date} a las ${time} horas.</p>`,
  });
};

export const sendEmailCancelAppointment = async ({ date, time }) => {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  // send email
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: "admin@appsalon",
    subject: "AppSalon - Cita cancelada",
    text: "AppSalon - Cita cancelada",
    html: `<p>¡Atención Administrador!</p>
		<p>Un usuario ha cancelado una cita.</p>
		<p>La cita estaba programada para el día ${date} a las ${time} horas.</p>`,
  });
};
