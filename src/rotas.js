const express = require(`express`);
const { cadastrarUsuario, loginUsuario, atualizarUsuario, detalharUsuario } = require(`./controladores/usuarios`);
const { validarNomeEmailSenha, validarToken, validarTransacao } = require("./intermediarios/validacao");
const { listarCategorias } = require("./controladores/categoria");
const { listarTransacoes, buscarTransacao, inserirTransacao, AtualizarTransacao, deletarTransacao, extratoTransacao } = require("./controladores/transacoes");

const rotas = express();

rotas.post(`/usuario`, validarNomeEmailSenha, cadastrarUsuario);
rotas.post(`/login`, loginUsuario);

rotas.use(validarToken);
rotas.get(`/usuario`, detalharUsuario);
rotas.put(`/usuario`,validarNomeEmailSenha, atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/extrato', extratoTransacao);
rotas.get('/transacao/:id', buscarTransacao);

rotas.post('/transacao',validarTransacao, inserirTransacao);
rotas.put('/transacao/:id',validarTransacao, AtualizarTransacao);
rotas.delete('/transacao/:id', deletarTransacao);

module.exports = rotas;