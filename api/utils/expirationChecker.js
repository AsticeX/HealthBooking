import VaccineUser from "../models/Vaccine_User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendExpirationEmail = async (user) => {
  try {
    if (user.flag === 0) {
      const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "iceratana2@gmail.com",
          pass: "hlpv samr eicn gzrj",
        },
      });

      var mailOptions = {
        from: "iceratana2@gmail.com",
        to: `${user.email}`,
        subject: "Vaccine Expire",
        html: `<head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                  <img width="128" src="https://i.ibb.co/svFsHvk/logo.png" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">วัคซีน ${user.vaccine_name} ของคุณหมดอายุ</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                  เพื่อสุขภาพที่ดีคุณควรที่จะเข้ารับการฉีดวัคซีนเข็มกระตุ้น หากคุณข้ารับการฉีดวัคซีนเข็มกระตุ้น     สามารถแก้ใขประวัติของคุณได้ที่นี่🎉
                                              </p>
                                              <a href="https://healthbooking-client.vercel.app/vaccine"
                                                  style="background:#77B255;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">เช็คประวัติ</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>HealthBooking</strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>`,
      };
      await transporter.sendMail(mailOptions);
      console.log(`Expiration email sent to ${user.email}`);

      // Reset flag to 7 after sending email
      await VaccineUser.findByIdAndUpdate(user._id, { flag: 7 });
    } else {
      // Decrement flag by 1 if not 0
      await VaccineUser.findByIdAndUpdate(user._id, { $inc: { flag: -1 } });
      console.log(`Expiration email not sent to ${user.email}. Flag decremented to ${user.flag - 1}.`);
    }
  } catch (error) {
    console.error("Error sending expiration email:", error.message);
  }
};

const checkVaccineExpiration = async () => {
  try {
    console.log("Checking vaccine expiration...");
    const expiredVaccines = await VaccineUser.find({ expire: { $lte: new Date() } });

    if (expiredVaccines.length > 0) {
      for (const vaccine of expiredVaccines) {
        await VaccineUser.findByIdAndUpdate(vaccine._id, { priority: 0 });
        console.log(`${vaccine.user_id} Vaccine ${vaccine.vaccine_name} has expired. Priority updated to 0.`);
        await sendExpirationEmail(vaccine); // Send email to user
      }
    } else {
      console.log("No vaccines have expired.");
    }
  } catch (error) {
    console.error("Error checking vaccine expiration:", error.message);
  }
};

const expirationChecker = () => {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0);
  const delay = targetTime.getTime() - now.getTime();
  if (delay < 0) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  setTimeout(() => {
    checkVaccineExpiration();
    setInterval(checkVaccineExpiration, 24 * 60 * 60 * 1000);
  }, delay);
};

export default expirationChecker;
