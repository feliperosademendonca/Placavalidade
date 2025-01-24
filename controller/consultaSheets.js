const { google } = require("googleapis");
const sheets = google.sheets("v4");
const fs = require("fs");

// Carregar as credenciais
const credentials = JSON.parse(
  fs.readFileSync("../config/client.json", "utf-8"),
);

// Autenticação com Service Account
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function updateCellAndSearch(queryValue) {
  const client = await auth.getClient();
  const spreadsheetId = "1BHYVzvYN9qSgtVzvBmL2Xxo8hHJvc0gniE6wb0LX77s";

  // Atualizar o valor da célula C1 com a chave
  const updateResponse = await sheets.spreadsheets.values.update({
    auth: client,
    spreadsheetId,
    range: "banco!C1", // Célula onde a chave será inserida
    valueInputOption: "RAW", // Não processar o valor
    resource: {
      values: [[7896189200095]], // A chave será colocada em C1
    },
  });

  console.log(`Célula C1 atualizada com o valor: ${queryValue}`);

  // Agora, faça a busca, como no exemplo anterior
  const range = "banco!A1"; // Onde o resultado da consulta será mostrado

  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });

  const result = response.data.values ? response.data.values[0][0] : null;

  // Verificar se encontrou algum valor
  if (result) {
    console.log("Valor encontrado:", result);
    let string = result;
    // Transformar a string em um array
    let array = string.split(";");

    // Criar um objeto com base no array
    let objeto = {};

    // Supondo que as chaves sejam 'coluna1', 'coluna2', etc., você pode fazer algo assim:
    array.forEach((valor, index) => {
      objeto[`coluna${index + 1}`] = valor;
    });

    console.log(objeto);
  } else {
    console.log("Chave não encontrada ou resultado vazio.");
  }
}

// Passar a chave que você deseja buscar
updateCellAndSearch("chave_a_ser_buscada").catch(console.error);
