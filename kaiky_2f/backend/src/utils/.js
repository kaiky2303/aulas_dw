// Um banco de dados de usuários simulado para fins de teste
const users = [
  {
    id: 1,
    email: 'teste@exemplo.com',
    // Senha 'senha123' criptografada com bcrypt. Nunca armazene senhas em texto puro!
    password: '$2b$10$eNAhIfXqTC0yRgokzrzSoeVgOmymfaVw4oIMCcwC3kJU4CCg6KrRa' 
  },
  {
    id: 2,
    email: 'usuario2@exemplo.com',
    password: '$2b$10$P4O14F6PtVNgnkoS2QyM5eTbntfjmkLHwcusjPxLYNxwslTmmm9SK'
  },
];

module.exports = users;