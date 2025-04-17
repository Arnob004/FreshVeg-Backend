import mongoose, { connect } from "mongoose";
const ConnectDB = async () => {
  try {
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("❌ DB Connection Failed!!!", error.message);
    process.exit(1); // Application বন্ধ করার জন্য (optional)
  }
};
export default ConnectDB;
