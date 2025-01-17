const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Defina a origem do seu frontend
  methods: ["GET", "POST"],
  credentials: true, // Permite o envio de cookies
};

app.use(cors(corsOptions));
app.use(cookieParser());

const bodyParser = require("body-parser");
const path = require("path");
const loginController = require("./controller/loginController");
const pool = require("./infra/conectionDatabase");
const { processarDatas } = require("./controller/date");
require("dotenv").config();

// Middleware de parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Servir favicon antes da rota coringa
app.get("/favicon.ico", (req, res) => res.status(204).end()); // Resolve Responde sem conteúdo

// Middleware para definir variáveis globais em todas as rotas
app.use((req, res, next) => {
  next(); // Passa para a próxima função de middleware
});

// Configuração da ViewEngine
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rota index
app.get("/", function (req, res) {
  res.render("index");
});

// Rota placa
app.get("/placa", (req, res) => {
  console.log("user:", req.user);
  console.log("\nCarregar pagina placa GET\n");
  res.render("placa");
});

app.post("/login", loginController.processLogin);

// Rota placaPOST
app.post("/placa", loginController.checkLoginStatus, (req, res) => {
  return res.json({ user: req.user });
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
app.post(
  "/cadastro/dados",
  loginController.checkLoginStatus,
  async (req, res) => {
    let info = req.body.info;
    let ean = req.body.ean;
    let codint = req.body.codint;

    console.log(`dados enviados para cadastro: ${info}, ${ean}, ${codint}`);

    try {
      const client = await pool.connect();

      await client.query(
        "INSERT INTO minha_tabela (info, ean, codint) VALUES ($1, $2, $3)",
        [info, ean, codint],
      );

      client.release();
      res.status(200).json({ message: "Dados salvos com sucesso!" });
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      res.status(500).json({ message: "Erro ao salvar dados!" });
    }
  },
);

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
