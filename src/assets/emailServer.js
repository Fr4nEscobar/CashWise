const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3200;

app.use(cors());

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cashwise.no.reply@gmail.com',
      pass: 'akom hppy yazm mtmy',
    },
  });

  const mailOptions = {
    from: 'cashwise.no.reply@gmail.com',
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});