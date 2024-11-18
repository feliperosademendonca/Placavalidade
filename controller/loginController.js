require("dotenv").config();
const { nextTick } = require("process");
const user = require("../infra/user.json");

// Função para processar a requisição de login
exports.processLogin = (req, res) => {
  const u = req.body.u.toLowerCase();
  const s = req.body.s;

  verificarUsuarioSenha(u, s, req, res);
};

function verificarUsuarioSenha(usuario, senha, req, res) {
  const usuarioEncontrado = user.find((u) => u.u === usuario && u.s === senha);

  if (usuarioEncontrado) {
    console.log("Usuário e senha corretos. Redirecionando...");
  
    req.session.username = usuarioEncontrado.u;
    req.session.isTrue = true;
  
    return res.status(200).json({ success: true, message: "Login bem-sucedido.", redirect: "/placa" });
  } else {
    console.log("Credenciais inválidas.");
    req.session.isTrue = false;
    return res.status(401).json({ success: false, message: "Credenciais inválidas." });
  }
}

// Middleware para verificar o status do login
exports.checkLoginStatus = (req, res,next) => {
  console.log("req.session:", req.session.username);
  if (req.session.username) {
      
    console.log("logado com sucesso") ; // O usuário está logado
    return next()
  } else {
    console.log("Não está logado"); // Não está logado
    return res.redirect('/'); // Redireciona para a página inicial
  }
};
