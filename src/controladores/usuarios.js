const {criptografarSenha, compararSenha} = require(`../utils/criptografia`)
const { verificarEmailExistente, buscarHash } = require('../bancoDeDados/consultas');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../utils/senhaJwt');
const conexaoDoBanco = require(`../bancoDeDados/conexaoDB`);

const cadastrarUsuario = async (req, res) => {
    const { nome, senha, email } = req.body
    try {
        const emailExistente = await verificarEmailExistente(email);
        if (emailExistente) {
            return res.status(400).json({ mensagem: "Este e-mail já foi cadastrado" });
        }
        const senhaCriptografada = await criptografarSenha(senha);
        const query = `insert into usuarios (nome,email,senha) values($1,$2,$3)  returning *`;
        const values = [nome, email, senhaCriptografada];
        const { rows: usuariosCadastrados } = await conexaoDoBanco.query(query, values);
        const usuarioCadastro = usuariosCadastrados[0];
        delete usuarioCadastro.senha;

        res.status(201).json(usuarioCadastro);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "erro interno no servidor " });
    }
}

const loginUsuario = async (req, res) => {
    const {email, senha} = req.body;
    if (!senha || !email) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios" });
    }
    const emailExistente = await verificarEmailExistente(email);
    if (!emailExistente) {
        return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }
    const {senha: hash, ...usuario} = await buscarHash(email);
    const senhaCorreta = await compararSenha(senha, hash);

    if(!senhaCorreta){
        return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }
    try{
        const token = await jwt.sign({id: usuario.id}, senhaJwt, {expiresIn: '8h'});
        return res.status(200).json({usuario, token});

    } catch(error){
        return res.status(500).json({ mensagem: "erro interno no servidor " });
    }


}
module.exports = {
    cadastrarUsuario,
    loginUsuario
}