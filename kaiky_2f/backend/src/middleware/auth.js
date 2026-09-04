// backend/src/middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Pega o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho existe
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Token não fornecido'
    });
  }

  // Esperamos:
  // Authorization: Bearer TOKEN
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Formato do token inválido'
    });
  }

  const token = parts[1];

  try {
    // Verifica o JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Coloca os dados do usuário na requisição
    req.user = decoded;

    // Continua para a rota protegida
    next();

  } catch (err) {
    console.error('ERRO AO VALIDAR TOKEN:', err);

    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Token inválido ou expirado'
    });
  }
};

module.exports = verifyToken;