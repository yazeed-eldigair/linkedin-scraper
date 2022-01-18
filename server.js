const express = require("express");
const cors = require("cors");
const excel = require("./src/exportService");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

const excelFileName = "Profiles.xlsx";
const workSheetName = "Freelancers";
const workSheetColumnNames = ["name", "linkedin_url", "title", "location"];
const filePath = `./outputFiles/${excelFileName}`;

const profileCounter = 0;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("success");
});

app.post("/", (req, res) => {
  const profiles = req.body;
  profileCounter = profileCounter + profiles.length;
  console.log("Number of profiles scraped so far:", profileCounter);
  res.json("Profiles received succesully");
  excel.exportProfilesToExcel(
    profiles,
    workSheetColumnNames,
    workSheetName,
    filePath,
    fs,
    xlsx,
    path
  );
});

app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});
