const { buscarCategorias } = require("../bancoDeDados/consultas")


const listarCategorias = async (req, res) => {
    try{
        const { rows } = await buscarCategorias()
        return res.json( rows );
    } catch{
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports = {
    listarCategorias
}