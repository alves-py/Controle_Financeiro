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


module.exports = {
    verificarEmailExistente,
    buscarHash
}