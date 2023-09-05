const validarNomeEmailSenha = (req, res, next) => {
    const { nome, senha, email } = req.body
    if (!senha || !nome || !email) {
        return res.status(400).json({ mensagem: "todos os campos são obrigatorios" });
    }
    next();
};


module.exports = {
    validarNomeEmailSenha,
}