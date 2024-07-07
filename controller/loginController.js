require("dotenv").config();

const user = require("../infra/user.json");

// Função para processar a requisição de login
exports.processLogin = (req, res) => {
  const u = req.body.u.toLowerCase();
  const s = req.body.s;

  console.log("dados recebido\n usuario: " + u + "\n senha: " + s);

  verificarUsuarioSenha(u, s, req, res);
};

function verificarUsuarioSenha(usuario, senha, req, res) {
  // Supondo que user seja um array de objetos de usuário com campos u e s
  const usuarioEncontrado = user.find((u) => u.u === usuario && u.s === senha);

  console.log(usuarioEncontrado);

  if (usuarioEncontrado !== undefined) {
    // Exemplo de autenticação básica
    console.log("Usuário e senha corretos. Redirecionando...");

    // Define o nome do usuário na sessão
    req.session.username = usuarioEncontrado.u;
    req.session.isLoggedIn = true;

    res.status(200).json({ success: true, message: "Login bem-sucedido." });
  } else {
    console.log("Credenciais inválidas.");
    res.render("index");
  }
}

// Função para verificar se o usuário está logado
exports.checkLoginStatus = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next(); // Próximo middleware se estiver logado
  } else {
    res.render("index"); // Redireciona para a página de login se não estiver logado
  }
};
