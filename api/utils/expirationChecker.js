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

      const mailOptions = {
        from: "iceratana2@gmail.com",
        to: `${user.email}`,
        subject: "Your Vaccine Has Expired",
        html: `<p>Your vaccine ${user.vaccine_name} has expired. Please consider scheduling a new vaccination appointment.</p>
               <p>Click <a href="http://localhost:3000/vaccine">here</a> to schedule your appointment.</p>`,
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
