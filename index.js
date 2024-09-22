const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const session = require("express-session");

const bodyParser = require("body-parser");
const path = require("path");
const loginController = require("./controller/loginController");
const pool = require("./infra/conectionDatabase");
const { processarDatas } = require("./controller/date");
require("dotenv").config();

// Middleware de parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do middleware de sessão
app.use(session({
  secret: process.env.SESSION_SECRET, // Deve ser uma chave secreta segura
  resave: false,               // Evita salvar a sessão se ela não for modificada
  saveUninitialized: false,    // Não salva sessões vazias
  cookie: { secure: false }    // `secure: true` se usar HTTPS
}));

// Middleware para definir variáveis globais em todas as rotas
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next(); // Passa para a próxima função de middleware
});

// Configuração da ViewEngine
app.engine("handlebars", handlebars.engine({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views", "layouts")
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rota index
app.get("/", function (req, res) {
  res.render("index");
});

// Rota login
app.post("/login", loginController.processLogin);

// Rota placa
app.get("/placa", loginController.checkLoginStatus, (req, res) => {
  const {
    info,
    ean,
    codint,
    novaData,
    dataHora,
    diasParaVencer,
    dataValidade,
    dia,
    mes,
    ano,
    dataRecebimento
  } = req.query;

  res.render("placa", {
    info: info,
    ean: ean,
    codint: codint,
    dataValidade: dataValidade,
    diasParaVencer: diasParaVencer,
    novaData: novaData,
    dia: dia,
    mes: mes,
    ano: ano,
    dataHora: dataHora,
    dataDeRecebimento: dataRecebimento,
    u: res.locals.username,
  });
});

// Rota placaPOST
app.post("/placa", loginController.checkLoginStatus, async (req, res) => {
  const inputValor = req.body.inputValor;
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
  }
});

// Rota pesquisaGET
app.get("/pesquisa", loginController.checkLoginStatus, (req, res) => {
  res.render("pesquisa", { username: res.locals.username });
});

// Rota cadastroGET
app.get("/cadastro", loginController.checkLoginStatus, (req, res) => {
  res.render("cadastro", { username: res.locals.username });
});

// Rota cadastroPOST
app.post("/cadastro/dados", loginController.checkLoginStatus, async (req, res) => {
  let info = req.body.info;
  let ean = req.body.ean;
  let codint = req.body.codint;

  console.log(`dados enviados para cadastro: ${info}, ${ean}, ${codint}`);

  try {
    const client = await pool.connect();

    await client.query(
      "INSERT INTO minha_tabela (info, ean, codint) VALUES ($1, $2, $3)",
      [info, ean, codint]
    );

    client.release();
    res.status(200).json({ message: "Dados salvos com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    res.status(500).json({ message: "Erro ao salvar dados!" });
  }
});

// Rota para logout
app.get("/sair", loginController.checkLoginStatus, (req, res) => {
  console.log("chamou a rota sair");
  console.log("Antes de destruir a sessão:", req.session);

  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao encerrar a sessão:", err);
      return res.status(500).send("Erro ao encerrar a sessão");
    }
    console.log("Sessão destruída com sucesso.");
    return res.status(200).send("Finalizando Sessão");
  });
});

// Rota para endereço público
app.use(express.static(__dirname + "/public/"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Servidor iniciado na porta " + port));
