const {criptografarSenha} = require(`../utils/criptografia`)
const conexãoDoBanco = require(`../bancoDeDados/conexaoDB`);

const cadastrarUsuario = async (req, res) => {
    const { nome, senha, email } = req.body
    if (!senha || !nome || !email) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios" });
    }
    try {
        const senhaCriptografada = await criptografarSenha(senha);
        const query = `insert into usuarios (nome,email,senha) values($1,$2,$3)  returning *`;
        const values = [nome, email, senhaCriptografada];
        const { rows: usuariosCadastrados } = await conexãoDoBanco.query(query, values);
        const usuarioCadastro = usuariosCadastrados[0];
        delete usuarioCadastro.senha

        res.status(201).json(usuarioCadastro);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "erro interno no servidor " })
    }
}
module.exports = {
    cadastrarUsuario
}