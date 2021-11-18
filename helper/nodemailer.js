const nodemailer = require("nodemailer");


async function postEmailCreator(inputPlayer) {
  try {
    let pass = process.env.GMAIL_PASS
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'nzwebfuture@gmail.com',
      pass: pass
    },
  });
  let info = await transporter.sendMail({
    from: 'nzwebfuture@gmail.com', // sender address
    to: inputPlayer.email, // list of receivers
    subject: "Hello, Thank You For Joining", // Subject line
    text: `
    Hallo you are joining the ${inputPlayer.eventname}.
    Sports: ${inputPlayer.category}
    save the date on ${inputPlayer.date} , ${inputPlayer.time}.
    Dont be missing!  
    `, // plain text body
  });
} catch (error) {
  console.log(error , 'malah eror');
}
}

module.exports = postEmailCreator