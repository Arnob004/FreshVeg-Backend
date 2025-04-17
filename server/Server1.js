import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("server 1 running on 5001!");
});

app.get("/home", (req, res) => {
  res.send("home 1");
});

app.listen(5001, () => console.log("✔ Server 1 running on port 5001"));
