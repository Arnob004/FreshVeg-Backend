import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("server 2 running on 5002!");
});

app.get("/home", (req, res) => {
  res.send("home 2");
});

app.listen(5002, () => console.log("✔ Server 2 running on port 5002"));