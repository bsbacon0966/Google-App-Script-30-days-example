function myFunction() {
    const Day3_Spreadsheet = SpreadsheetApp.openById("1cWVnqRwyh-NxbSrbPK2igSnPdG_CkOklvLnYD7vulJY"); //貼上你的Google Sheet ID
    /*
    if (Day3_Spreadsheet) {               //確認是否抓到指定的試算表(Spreadsheet)
      Logger.log(`此試算表存在`);
    }
    */
  
    const Day3_sheet1 = Day3_Spreadsheet.getSheetByName('工作表1'); //從剛剛抓取的試算表(Spreadsheet)找指定的工作表(sheet)
    /*
    if (Day3_sheet1) {               //確認是否抓到指定的工作表(sheet)
      Logger.log(`工作表1存在`);
    }
    */
    const currentYear = new Date().getFullYear(); // 當前年份 2025
    Logger.log(currentYear);
    const employee_data = Day3_sheet1.getRange(2, 1, Day3_sheet1.getLastRow() - 1, Day3_sheet1.getLastColumn()).getValues();
    Logger.log(employee_data);
  
    const nameIndex = 0; // 員工姓名（第一列）
    const departmentIndex = 1; // 部門（第二列）
    const joinYearIndex = 2; // 入職年份（第三列）
    const isSeniorIndex = 3; // 是否為資深員工（第四列）
  
    // 遍歷每一位員工的資料
    for (let i = 0; i < employee_data.length; i++) {
      const joinYear = employee_data[i][joinYearIndex];// 年資
      
      // 計算年資
      const yearsWorked = currentYear - joinYear;
      // 若年資大於4年，則是資深員工
      if (yearsWorked >= 4) {
        Day3_sheet1.getRange(i + 2, isSeniorIndex + 1).setValue("是"); // 填寫"是"到指定位置
      }
      else{
        Day3_sheet1.getRange(i + 2, isSeniorIndex + 1).setValue("否");
      }
    }
  }
  