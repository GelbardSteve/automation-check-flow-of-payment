const fs = require("fs");

//Get today date
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const year = today.getFullYear();
const todayDate = `${month}-${day}-${year}`;

createReport = (repoName) => {
  return `../Task-Automation-project/reports/${repoName}.txt`;
};

getData = () => {
  return `Time: ${today.getHours()}:${
    today.getMinutes() < "10" ? "0" + today.getMinutes() : today.getMinutes()
  }, Date: ${todayDate}\r\n\r\n`;
};

insertDataToReport = (cellData, statusData) => {
  return `${statusData ? "SUCCEED" : "FAILED"}: At Comment: ${cellData.join(
    " | "
  )}\r\n`;
};

module.exports = {
  createNewReport: function (NameOfReport) {
    // writeFile function with filename, content and callback function
    fs.writeFile(createReport(NameOfReport), getData(), (err) => {
      if (err) throw err;
    });
  },

  insertStatusReport(comment, status, cell, testName) {
    fs.appendFile(
      `../Task-Automation-project/reports/${testName}.txt`,
      `${status ? "SUCCEED" : "FAILED"} At Comment: ${comment}, Data - ${
        typeof cell == "object" ? cell.join(" | ") : cell
      }\r\n`,
      (err) => {
        if (err) throw err;
      }
    );
  },
};