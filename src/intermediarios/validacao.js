const jwt = require('jsonwebtoken');
const senhaJwt = require('../utils/senhaJwt');
const { verificarId, totalCategorias, totalTransacoes, buscarUsuario_id } = require('../bancoDeDados/consultas');

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
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;

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

    if( id ){
        const { rows, rowCount } = await buscarUsuario_id( id );
        if( rowCount > 0 ){
            if ( idUsuario != rows[0].usuario_id ) {
                return res.status(400).json({ mensagem: "Está transação não pertence ao usuário logado" });
            }
        }
        if ( rowCount === 0){
            return res.status(400).json({ mensagem: "Transação não encontrada" });
        }
    }

    next();
}


module.exports = {
    validarNomeEmailSenha,
    validarToken,
    validarTransacao
}