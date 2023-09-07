const conexaoDoBanco = require(`../bancoDeDados/conexaoDB`);

const deleteTransacao = async (id) => {
    await conexaoDoBanco.query('DELETE FROM transacoes WHERE id = $1 ;', [id]);
}

module.exports = {
    deleteTransacao
}