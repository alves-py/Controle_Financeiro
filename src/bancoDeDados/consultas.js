const conexaoDoBanco = require(`../bancoDeDados/conexaoDB`);

const verificarEmailExistente = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const { rowCount } = await conexaoDoBanco.query(query, values);
    
    return rowCount > 0;
}

const buscarHash = async (email) => {
    const { rows } = await conexaoDoBanco.query(`SELECT * FROM usuarios 
    WHERE email = $1`, [email]);
    return rows[0];
}

const verificarId = async (id) => {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const values = [id];
    return { rows, rowCount } = await conexaoDoBanco.query(query, values);
}

const buscarCategorias = async () => {
    return await conexaoDoBanco.query("SELECT * FROM categorias");
}

const buscarTransacoesUsuario = async (idUsuario) => {
    return await conexaoDoBanco.query('SELECT * FROM transacoes WHERE usuario_id = $1', [idUsuario]);
}

const buscarTransacaoId = async (idTransacao, idUsuario) => {
    return await conexaoDoBanco.query('SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2', [idTransacao, idUsuario]);
}

const totalCategorias = async () => {
    const resultado = await conexaoDoBanco.query('SELECT count(id) FROM categorias;');
    return parseInt(resultado.rows[0].count);
}

module.exports = {
    verificarEmailExistente,
    buscarHash,
    verificarId,
    buscarCategorias,
    buscarTransacoesUsuario,
    buscarTransacaoId,
    totalCategorias
}