const { google } = require("googleapis");
const fs = require("fs");

const credentials = JSON.parse(
  fs.readFileSync("./config/client.json", "utf-8"),
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

async function UpdateDataBank() {
  const pool = require("../infra/conectionDatabase");

  async function importarEmLote() {
    const pgClient = await pool.connect(); // Obtendo um cliente do pool

    try {
      console.log("Conectado ao PostgreSQL");

      const client = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1BHYVzvYN9qSgtVzvBmL2Xxo8hHJvc0gniE6wb0LX77s";
      const range = "banco!A:Z";

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        console.log("Nenhum dado encontrado na planilha.");
        return;
      }

      const headers = rows[0].map((col) =>
        col.toLowerCase().replace(/\s+/g, "_"),
      );
      const dataRows = rows.slice(1);

      if (dataRows.length === 0) {
        console.log("Nenhum dado para inserir.");
        return;
      }

      const batchSize = 500; // Tamanho do lote, 500 registros por vez
      const values = [];

      // Preenchendo o array de valores com os dados da planilha
      dataRows.forEach((row) => {
        values.push(row); // Adiciona cada linha de dados da planilha em 'values'
      });

      // Processando os dados em lotes
      for (let i = 0; i < values.length; i += batchSize) {
        const batch = values.slice(i, i + batchSize);
        const numRegistros = batch.length;

        const placeholders = [];
        const batchValues = []; // Para armazenar os valores do lote

        // Preenchendo os placeholders e os valores do lote
        for (let j = 0; j < numRegistros; j++) {
          const row = batch[j];
          batchValues.push(...row); // Adiciona os dados da linha ao batch de valores

          // Gerar placeholders para cada coluna
          const rowPlaceholders = row.map(
            (_, index) => `$${j * row.length + index + 1}`,
          );
          placeholders.push(`(${rowPlaceholders.join(", ")})`);
        }

        // Log para depuração
        console.log("Placeholders:", placeholders);
        console.log("Batch Values:", batchValues);

        // Criando a query de inserção para o lote
        const insertQuery = `
          INSERT INTO minha_tabela (${headers.join(", ")})
          VALUES ${placeholders.join(", ")}
         `;

        // Executando a query com os valores do lote
        try {
          await pgClient.query(insertQuery, batchValues);
          console.log(`Inseridos ${numRegistros} registros no banco.`);
        } catch (error) {
          console.error("Erro ao executar a query:", error);
        }
      }
    } catch (error) {
      console.error("Erro ao importar dados:", error);
    } finally {
      pgClient.release(); // Libera o cliente de volta para o pool
    }
  }

  importarEmLote().catch(console.error);
}

UpdateDataBank();
