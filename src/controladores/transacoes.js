const { buscarTransacoesUsuario, buscarTransacaoId } = require("../bancoDeDados/consultas");
const { lancarTransacao } = require("../bancoDeDados/inserir");

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario;
    try{    const listaTransacoes = await buscarTransacoesUsuario(id);

        return res.json(listaTransacoes.rows);
    } catch(error){
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }

}

const buscarTransacao = async (req, res) => {
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;

    try{
        const {rows, rowCount} = await buscarTransacaoId(id, idUsuario);

        if(rowCount === 0){
            return res.status(400).json({mensagem: "Transação não encontrada."})
        }
        return res.json(rows);

    } catch(error){
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

const inserirTransacao = async (req, res) => {
    const { id: idUsuario } = req.usuario;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try{   
        const transacao = await lancarTransacao(descricao, valor, data, categoria_id, idUsuario, tipo);
        return res.json(transacao.rows[0]);
    } catch(error){
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }

}

module.exports = {
    listarTransacoes,
    buscarTransacao,
    inserirTransacao
}