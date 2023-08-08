const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    console.log("Token de autenticação não fornecido.");
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  jwt.verify(token, "sua_chave_secreta", (err, user) => {
    if (err) {
      console.log("Falha na autenticação do token.");
      return res
        .status(403)
        .json({ message: "Falha na autenticação do token." });
    }
    req.user = user;
    console.log("Token válido. Usuário autenticado.");
    next();
  });
}

module.exports = {
  authenticateToken,
};
