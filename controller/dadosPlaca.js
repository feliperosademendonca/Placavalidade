module.exports = ()=> {const inputValor = req.body.inputValor;
const dataValidade = req.body.dateValor;

console.log(`Valor recebido do usuário: ${inputValor}`);
console.log(`Data recebida do usuário: ${dataValidade}`);
const datas = processarDatas(dataValidade);
console.log(`Datas: ${JSON.stringify(datas)}`);

async function consultarBanco(inputValor) {
  const client = await pool.connect();
  try {
    let query;
    if (inputValor.length > 5) {
      query = "SELECT * FROM minha_tabela WHERE ean = $1 LIMIT 1";
    } else {
      query = "SELECT * FROM minha_tabela WHERE codint = $1 LIMIT 1";
    }
    const result = await client.query(query, [inputValor]);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

try {
  const resultado = await consultarBanco(inputValor);
  if (resultado) {
    const { ean, codint, info } = resultado;
    console.log(`EAN: ${ean}, Codint: ${codint}, Info: ${info}`);

    const url = `/placa?info=${info}
                  &ean=${ean}&codint=${codint}
                  &dataValidade=${datas.dataDeValidade}
                  &novaData=${datas.novaData}
                  &diasParaVencer=${datas.diasParaVencer}
                  &ano=${datas.novoAno}
                  &dia=${datas.novoDia}
                  &mes=${datas.novoMes}
                  &dataHora=${datas.dataAtualCompleta}
                  &dataRecebimento=${datas.dataDeRecebimento}`;

    res.json({ url });
  } else {
    res.status(404).send("Nenhum resultado encontrado");
  }
} catch (error) {
  console.error("Erro ao processar a solicitação:", error);
  res.status(500).send("Erro interno do servidor");
}}