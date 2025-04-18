import app from "./app.js";
import ConnectDB from "./Db/DB.js";

const PORT = process.env.PORT || 5040;

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🚨 Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
