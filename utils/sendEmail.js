import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Buat transporter (Tukang Pos)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "muthiearmalia@gmail.com", // Ganti dengan email Gmail kamu
      pass: "dpuw fnve dykh hklc", // Ganti dengan 16 karakter App Password tadi
    },
  });

  // 2. Tentukan detail email
  const mailOptions = {
    from: '"MuthieNotes Support" <emailkamu@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html (Jika ingin pakai format bagus nanti)
  };

  // 3. Kirim email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;