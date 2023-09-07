const conexaoDoBanco = require(`../bancoDeDados/conexaoDB`);

const lancarTransacao = async (descricao, valor, data, categoria_id, usuario_id, tipo) => {
    const query = `INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const values = [descricao, valor, data, categoria_id, usuario_id, tipo];
    return await conexaoDoBanco.query(query, values);
}

module.exports = {
    lancarTransacao
}