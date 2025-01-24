const { google } = require("googleapis");
const sheets = google.sheets("v4");
const fs = require("fs");

// Carregar o arquivo de credenciais
const credentials = JSON.parse(
  fs.readFileSync("../config/client.json", "utf-8"),
);

// Autenticação com Service Account
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function accessSpreadsheet() {
  const client = await auth.getClient();
  const spreadsheetId = "1BHYVzvYN9qSgtVzvBmL2Xxo8hHJvc0gniE6wb0LX77s";
  const range = "banco!A1:A2";

  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });

  console.log("Dados:", response.data);
}

accessSpreadsheet().catch(console.error);
