import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import utils from './utils';

const log = utils.logger();

dotenv.config();

/**
 * @function resetPassword
 * @param {*} token
 * @param {*} email
 * @param {*} host
 * @returns {*} Email notification
 */
export const handleResetPassword = (token, email, host) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: '"Contact-AP" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'Contact-AP PASSWORD RESET',
    html: `
    <body><div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid #f4ab40;
          margin-bottom:10px">
        <div 
          style="
           border-bottom:1px solid #f2f3f5;
           padding-bottom:20px;
           padding-top:20px">
          <h4 
            style="
              padding-top:0; 
              padding-left:20px; 
              margin:0; 
              font-size:30px;
              font-family:'Kurale', serif;">
              Contact-AP</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             You have requested to reset your password for Contact-AP account. Please click on the button below to reset your password.
          </p>
      <p
         style=""><a href="http://${host}/reset/${token}" 
            style="
              display:inline-block;
              font-size:15px;color:#ffffff;
              padding:10px 15px;
              text-decoration:none;
              background-color:#f4ab40;
              border-radius:3px" 
              target="_blank">
              Reset Password
          </a>
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:40px;
              color:#686f7a">
              If you haven't made this request please ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              Contact-AP Team.<br>
            <a href="https://contact-ap.herokuapp.com"
              style="color: #f4ab40">https://contact-ap.herokuapp.com
            </a>
          </p>
        </div>
     </div>
    </div>
  </body>
    `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      log.error(error);
      return error;
    }
  });
};

/**
 * @function sendSuccessfulResetMail
 * @param {*} email
 * @returns {*} Email notification
 */
export const sendSuccessfulResetMail = (email) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Contact-AP" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'Contact-AP PASSWORD CHANGE SUCCESSFUL',
    html: `  <div style="width: 100%; color: white; background-color: #fff; padding: 2%;">
    <div style="width: 60%; background-color: #2c3e56; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%; border-bottom: 1.2px solid black">
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2%; font-family: kurale serif">Contact-AP</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          This email confirms that your new Contact-AP password has been updated.
    You can now access your Account.
        </div>
          <br>
          Thanks You.
        <div>
          <br>
        </div>
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; border-top: 1.2px solid black; width:100%">
        <p><small style="padding-left: 2%; text-align: center; color:white;"> Copyright M.jeck</small></p>
      </div>
    </div>
  </div> `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return (`Message ${info.messageId} send: ${info.response}`);
  });
};
