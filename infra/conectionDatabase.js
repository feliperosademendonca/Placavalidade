const pg = require("pg");
const { Pool } = pg;
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

module.exports = pool;


/* //teste de conexão do banco de dados
async function consultarBanco() {
  const client = await pool.connect();
  try {
    const queryResult = await client.query(
      "SELECT * FROM minha_tabela LIMIT 1"
    );
    return queryResult.rows;
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
    throw error;
  } finally {
    client.release();
  }
}

consultarBanco()
  .then((resultados) => {
    console.log(resultados);
  })
  .catch((error) => {
    console.error("Erro:", error);
  });


 */