const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
let inputPlayer =  {
  email: 'nawfalzuhdi@gmail.com',
  eventname: 'bola',
  date: 21,
  time:'8.30'
}
let pass = process.env.GMAIL_PASS

console.log(pass);
async function postEmailCreator(inputPlayer) {
try {
  console.log(inputPlayer);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'nzwebfuture@gmail.com',
      pass: pass
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'nzwebfuture@gmail.com', // sender address
    to: inputPlayer.email, // list of receivers
    subject: "Hello, Thank You For Joining", // Subject line
    text: `
    Hallo you are joining the ${inputPlayer.eventname}.
    save the date on ${inputPlayer.date} , ${inputPlayer.time}.
    Dont be missing!  
    `, // plain text body
  });
  console.log(info);
} catch (error) {
  console.log(error , 'malah eror');
}

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

postEmailCreator(inputPlayer)