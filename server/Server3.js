import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("server 3 running on 5003!");
});

app.get("/home", (req, res) => {
  res.send("home 3");
});

app.listen(5003, () => console.log("✔ Server 3 running on port 5003"));
