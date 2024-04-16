import VaccineUser from "../models/Vaccine_User.js";

const checkVaccineExpiration = async () => {
  try {
    console.log("Checking vaccine expiration...");
    const expiredVaccines = await VaccineUser.find({ expire: { $lte: new Date() } });

    if (expiredVaccines.length > 0) {
      for (const vaccine of expiredVaccines) {
        await VaccineUser.findByIdAndUpdate(vaccine._id, { priority: 0 });
        console.log(`${vaccine.user_id} Vaccine ${vaccine.vaccine_name} has expired. Priority updated to 0.`);
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
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 59, 0);
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
