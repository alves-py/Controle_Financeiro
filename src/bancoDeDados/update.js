const conexaoDoBanco = require(`../bancoDeDados/conexaoDB`);

const updateUsuario = async (nome, email, senhaCriptografada, id) => {
    const query = `
    UPDATE usuarios
    SET nome = $1, email = $2, senha = $3
    WHERE id = $4 RETURNING *
`;
    const values = [nome, email, senhaCriptografada, id];
    return await conexaoDoBanco.query(query, values);
}

const updateTransacao = async(id, descricao, valor, data, categoria_id, idUsuario, tipo) => {
    const query = `
    UPDATE transacoes 
    SET descricao = $1, valor = $2, data = $3, categoria_id = $4, usuario_id = $5, tipo = $6
    WHERE id = $7 RETURNING *;
`;
    const values = [descricao, valor, data, categoria_id, idUsuario, tipo, id];
    return await conexaoDoBanco.query(query, values);
}

module.exports = {
    updateUsuario,
    updateTransacao
}