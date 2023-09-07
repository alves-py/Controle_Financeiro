const jwt = require('jsonwebtoken');
const senhaJwt = require('../utils/senhaJwt');
const { verificarId, totalCategorias } = require('../bancoDeDados/consultas');

const validarNomeEmailSenha = (req, res, next) => {
    const { nome, senha, email } = req.body
    if (!senha || !nome || !email) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios" });
    }
    next();
};

const validarToken =async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
    };
    try{
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, senhaJwt);
        const {rows, rowsCount} = await verificarId(id);

        if(rowsCount === 0) {
            return res.status(401).json({mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
        }

        const {senha, ...usuario} = rows[0];
        req.usuario = usuario;
        next();

    }catch(error){
        return res.status(401).json({mensagem: "Não autorizado"});
    };
};

const validarTransacao = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios" });
    }
    const totalCategoriasValor = await totalCategorias();


    if(categoria_id > totalCategoriasValor){
        return res.status(400).json({mensagem: "categoria_id invalida. "});
    }
    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ mensagem: "tipo inválido." });
    }

    next();
}


module.exports = {
    validarNomeEmailSenha,
    validarToken,
    validarTransacao
}