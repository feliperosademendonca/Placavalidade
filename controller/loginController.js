require("dotenv").config({});
const jwt = require("jsonwebtoken");
const user = require("../infra/user.json");

// Função para processar a requisição de login
exports.processLogin = (req, res) => {
  const u = req.body.u.toLowerCase();
  const s = req.body.s;
  console.log("u:", u, " s:", s);
  verificarUsuarioSenha(u, s, req, res);
};

function verificarUsuarioSenha(usuario, senha, req, res) {
  // Busca pelo usuário e senha no arquivo user.json
  const usuarioEncontrado = user.find((u) => u.u === usuario && u.s === senha);

  if (usuarioEncontrado) {
    console.log("Usuário e senha corretos. Gerando JWT...");

    const token = jwt.sign(
      {
        name: usuarioEncontrado.u, // ID do usuário
      },
      "secretíssima",
      { expiresIn: 360000 }, // Token válido por 1 hora
    );
    // Enviar o token como cookie HTTPOnly
    // Gerar o token
    console.log("Gerar o token");
    console.log("Token Gerado: \n", token);
    //Enviar o token como um cookie
    console.log("Enviar o token como um cookie");
    res.cookie("authToken", token, {
      httpOnly: false, // Permite o acesso via JavaScript (para o caso de querer armazenar no localStorage)
      secure: false, // Desative para desenvolvimento local (recomenda-se "true" em produção com HTTPS)
      maxAge: 3600000, // 1 hora
      path: "/",
    });

    // Enviar o token também no corpo da resposta
    res.status(200).json({
      success: true,
      message: "Login bem-sucedido",
      token: token, // Enviando o token diretamente
    });
  } else {
    console.log("Credenciais inválidas.");
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas." });
  }
}

// Middleware para verificar o status do login (usando JWT)
exports.checkLoginStatus = (req, res, next) => {
  const authorization = req.headers["authorization"];
  let token = authorization.replace(/^Bearer\s/, "");

  console.log("\ntoken recebido checkstatuslogin: ", token);

  if (token) {
    // Verificar se o token é válido
    jwt.verify(token, "secretíssima", (err, decoded) => {
      if (err) {
        console.log("Token inválido");
        return res
          .status(401)
          .json({ success: false, message: "Token inválido." });
      } else {
        console.log("Token válido. Logado com sucesso.");
         // Salva os dados do token no objeto `req.user`
        console.log(decoded)
        req.user = decoded;
        return next(); // Prossegue para a próxima rota/middleware
      }
    });
  } else {
    console.log("Token não fornecido");
    return res
      .status(401)
      .json({ success: false, message: "Token não fornecido." });
  }
};
