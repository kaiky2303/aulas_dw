const express = require("express"); // Importa o módulo express
const app = express(); // Cria uma aplicação Express
const port = 3000; // Define a porta
app.use(express.json()); // Middleware para permitir JSON no corpo das requisições
// Rota principal
app.get("/", (req, res) => {
res.send("API funcionando!");
});
// Inicia o servidor
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});
let produtos = [
{ id: 1, nome: "Teclado", preco: 120 },
{ id: 2, nome: "Mouse", preco: 80 },
];
// Rota GET - lista todos os produtos
app.get("/api/produtos", (req, res) => {
res.json(produtos);
});
// Rota GET - produto específico
app.get("/api/produtos/:id", (req, res) => {
const produto = produtos.find(p => p.id == req.params.id);
produto ? res.json(produto) : res.status(404).send("Produto não encontrado");
});
// Rota POST - adiciona novo produto
app.post("/api/produtos", (req, res) => {
const novo = { id: produtos.length + 1, ...req.body };
produtos.push(novo);
res.status(201).json(novo);
});