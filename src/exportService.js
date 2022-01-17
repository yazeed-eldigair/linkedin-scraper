const exportProfilesToExcel = (
  profiles,
  workSheetColumnNames,
  workSheetName,
  filePath,
  fs,
  xlsx,
  path
) => {
  const porfilesArray = profiles.map((profile) => {
    return [profile.name, profile.url, profile.title, profile.location];
  });

  const workSheetData = [workSheetColumnNames, ...porfilesArray]; // "...porfilesArray" spreads the data array of objects
  let workBook, workSheet;

  // Check if excel file exists; otherwise, append data to existing file
  if (fs.existsSync(filePath)) {
    workBook = xlsx.readFile(filePath);
    workSheet = workBook.Sheets[workSheetName];
    workSheetData.shift(); //remove header from data
    xlsx.utils.sheet_add_aoa(workSheet, workSheetData, { origin: -1 });
  } else {
    workBook = xlsx.utils.book_new();
    workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  }
  xlsx.writeFile(workBook, path.resolve(filePath));
};

module.exports = { exportProfilesToExcel };
