const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

// ----------------------------------------------------------------------
// REGISTRO
// POST /api/auth/register
// ----------------------------------------------------------------------
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se os dados foram enviados
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios.'
      });
    }

    // Cria o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insere no PostgreSQL
    await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso.'
    });

  } catch (error) {
    console.error('ERRO NO REGISTER:', error);

    // Email duplicado no PostgreSQL
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'Email já cadastrado.'
      });
    }

    res.status(500).json({
      message: 'Erro no servidor.',
      error: error.message
    });
  }
});

// ----------------------------------------------------------------------
// LOGIN
// POST /api/auth/login
// ----------------------------------------------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios.'
      });
    }

    // Busca o usuário no PostgreSQL
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    // Compara a senha com o hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    // Gera o token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('ERRO NO LOGIN:', error);

    res.status(500).json({
      message: 'Erro no servidor.',
      error: error.message
    });
  }
});

module.exports = router;