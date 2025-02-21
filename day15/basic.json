var GEMINI_API = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY"); // 從專案屬性中讀取 GEMINI_API_KEY，用於 API 身份驗證

function myFunction() {

  if (!GEMINI_API) {
    Logger.log("❌ API Key 未設定，請先設定 GEMINI_API_KEY！");
    return;
  }

  var url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + GEMINI_API;

  const Day15_Spreadsheet = SpreadsheetApp.openById("1v5mzVjMFQo6_xkChpmAJ_zP5olkrWbnuVTcKNSsbybI"); // 貼上你的 Google Sheet ID
  const Day15_sheet1 = Day15_Spreadsheet.getSheetByName('工作表1'); // 從剛剛抓取的試算表(Spreadsheet)找指定的工作表(sheet)

  const employee_data = Day15_sheet1.getRange(2, 1, Day15_sheet1.getLastRow() - 1, Day15_sheet1.getLastColumn()).getValues();
  const nameIndex = 0; // 員工姓名（第一列）
  const emailIndex = 1; // 部門（第二列）
  const departmentIndex = 2; // 入職年份（第三列）
  const contextIndex = 3; // 是否為資深員工（第四列）
  
  for (let i = 0; i < employee_data.length; i++) {
    const employee = employee_data[i]; // 取得當前員工的資料
    const name = employee[nameIndex];
    const email = employee[emailIndex];
    const department = employee[departmentIndex];
    const context = employee[contextIndex];

    // 構建要發送給 Gemini API 的提示
    const prompt = `員工面試投稿的內容如下：${context}。請根據這些資訊，為這位員工生成適合的面試題目，最多兩題就好。`;

    // 構建 payload
    var payload = {
      "contents": [
        {
          "parts": [
            {
              "text": prompt // 使用動態生成的提示
            }
          ]
        }
      ]
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    };

    // 發送請求到 Gemini API
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    // 提取 Gemini API 的回應
    var text = json.candidates[0].content.parts[0].text;
    Logger.log(`${name} 的簡介：${text}`); // 記錄回應到日誌
    Day15_sheet1.getRange(i + 2, 5).setValue(text); //可選擇性的寫入google sheet中
  }
}
