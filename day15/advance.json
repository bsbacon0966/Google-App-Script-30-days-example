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
  const departmentIndex = 2; // 投稿組別（第三列）
  const contextIndex = 3; // 面試者敘述（第四列）

  // 組別職責說明
  const groupResponsibilities = {
    "活動組": "負責統籌規劃與科技或社團招生的活動，需要一定活動規劃能力。",
    "技術組": "能夠教學與編寫與現今相關的科技工具教材，需要一定教學經歷。",
    "行銷組": "負責社團社群經營，並且與校外尋求合作機會。",
    "美宣組": "輔佐社群經營，設計出符合當年主視覺設計圖。",
    "財政組": "能夠管理財務分配與審查金流與預算規劃。"
  };

  for (let i = 0; i < employee_data.length; i++) {
    const employee = employee_data[i];
    const name = employee[nameIndex];
    const email = employee[emailIndex];
    const department = employee[departmentIndex]; // 取得投稿組別
    const context = employee[contextIndex]; // 取得面試者敘述

    // 根據組別獲取職責說明
    const responsibility = groupResponsibilities[department] || "未知的組別。";

    // 構建要發送給 Gemini API 的提示
    const prompt = `
      面試者組別職責：${responsibility}
      面試者敘述：${context}
      請根據面試者的組別和敘述，生成 2 個針對該組別職責的面試題目。
    `;

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
    Logger.log(`${name}（${department}）的面試題目：\n${text}`); // 記錄回應到日誌
    Day15_sheet1.getRange(i + 2, 5).setValue(text); //可選擇性的寫入google sheet中
  }
}