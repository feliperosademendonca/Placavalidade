const { google } = require("googleapis");
const fs = require("fs");

// Carregar as credenciais do cliente
const credentials = JSON.parse(fs.readFileSync("../config/client-api.json"));
console.log(credentials);
const { client_id, client_secret, redirect_uris } =
  credentials.installed || credentials.web;

// Configurar OAuth2
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0],
);

// Gerar URL para autenticação
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

console.log("Authorize this app by visiting this URL:", authUrl);

// Depois de obter o código de autorização, troque pelo token de acesso
async function getAccessToken(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync("token.json", JSON.stringify(tokens));
  console.log("Token armazenado em token.json");
}

module.exports = oAuth2Client;
