const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { exportProfilesToExcel } = require("./exportProfiles");

const excelFileName = "Profiles.xlsx";
const workSheetName = "Freelancers";
const workSheetColumnNames = ["name", "linkedin_url", "title", "location"];
const filePath = `./outputFiles/${excelFileName}`;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("healthy");
});

app.post("/", (req, res) => {
  const profiles = req.body;

  exportProfilesToExcel(
    profiles,
    workSheetColumnNames,
    workSheetName,
    filePath,
    fs,
    xlsx,
    path
  );

  res.json("Profiles exported succesully");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
