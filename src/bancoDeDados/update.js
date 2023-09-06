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

module.exports = {
    updateUsuario,
}