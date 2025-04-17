import app from "./app.js";
import ConnectDB from "./Db/DB.js";

const port = process.env.PORT || 5040;

const startServer = async () => {
  try {
    await ConnectDB(); // Async DB connection
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("🚨 Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
