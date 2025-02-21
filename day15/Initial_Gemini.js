var GEMINI_API = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY"); // 從專案屬性中讀取 GEMINI_API_KEY，用於 API 身份驗證

function callAI() { 

  if (!GEMINI_API) {                                      // 檢查 GEMINI_API_KEY 是否已設定
    Logger.log("❌ API Key 未設定，請先設定 GEMINI_API_KEY！"); // 如果未設定，記錄錯誤訊息
    return; 
  }

  var url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + GEMINI_API; 

  var payload = { // 定義要發送給 API 的請求體 (payload)
    "contents": [ // contents 陣列，包含一個或多個內容物件
      {
        "parts": [ // parts 陣列，包含一個或多個部分物件
          {
            "text": "Explain how AI works" // 要發送給 AI 模型的文字提示
          }
        ]
      }
    ]
  };

  var options = { // 定義 UrlFetchApp.fetch() 方法的選項
    'method': 'post', // 使用 POST 方法發送請求
    'contentType': 'application/json', // 設定內容類型為 JSON
    'payload': JSON.stringify(payload) // 將 payload 物件轉換為 JSON 字串
  };

  var response = UrlFetchApp.fetch(url, options); // 使用 UrlFetchApp.fetch() 方法發送 HTTP 請求，並將回應存儲在 response 變數中
  var json = JSON.parse(response.getContentText()); // 將 API 回應的 JSON 字串解析為 JavaScript 物件

  var text = json.candidates[0].content.parts[0].text; // 從 JSON 物件中提取 AI 模型生成的回應文本
  Logger.log(text); // 將回應文本記錄到 Google Apps Script 的日誌中
  return text; // 返回回應文本
}