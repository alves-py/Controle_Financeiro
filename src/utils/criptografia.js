const bcrypt = require(`bcrypt`);

const criptografarSenha = async (senha) => {
    return await bcrypt.hash(senha, 10);
};

const compararSenha = async (senha, hash) => {
    return await bcrypt.compare(senha, hash)
};

module.exports = {
    criptografarSenha,
    compararSenha
};
