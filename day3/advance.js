function myFunction() {
    const Day3_Spreadsheet = SpreadsheetApp.openById("1cWVnqRwyh-NxbSrbPK2igSnPdG_CkOklvLnYD7vulJY"); //貼上你的Google Sheet ID
    const Day3_sheet1 = Day3_Spreadsheet.getSheetByName('工作表1'); //從剛剛抓取的試算表(Spreadsheet)找指定的工作表(sheet)
  
    const currentYear = new Date().getFullYear(); // 當前年份 2025
    const employee_data = Day3_sheet1.getRange(2, 1, Day3_sheet1.getLastRow() - 1, Day3_sheet1.getLastColumn()).getValues();
  
    const nameIndex = 0; // 員工姓名（第一列）
    const departmentIndex = 1; // 部門（第二列）
    const joinYearIndex = 2; // 入職年份（第三列）
    const isSeniorIndex = 3; // 是否為資深員工（第四列）
    const bonusIndex = 4; // 獎金數(第五列)
  
    // 遍歷每一位員工的資料
    for (let i = 0; i < employee_data.length; i++) {
      const joinYear = employee_data[i][joinYearIndex];// 年資
      
      // 計算年資
      const yearsWorked = currentYear - joinYear;
      
      if (yearsWorked >= 4) {
        Day3_sheet1.getRange(i + 2, isSeniorIndex + 1).setValue("是");
  
        //獎金計算
        let bonus = 0;
        const employee_department = employee_data[i][bonusIndex]; //員工部門
        if(employee_department=="資訊部門") bonus = 4000 * yearsWorked;
        else if(employee_department=="財政部門") bonus = 3500 * yearsWorked;
        else bonus = 3000 * yearsWorked;
        Day3_sheet1.getRange(i + 2, bonusIndex + 1).setValue(bonus);
      }
      else{
        Day3_sheet1.getRange(i + 2, isSeniorIndex + 1).setValue("否");
        Day3_sheet1.getRange(i + 2, bonusIndex + 1).setValue(0);
      }
    }
  }
  