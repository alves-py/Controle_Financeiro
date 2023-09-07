const { buscarTransacoesUsuario, buscarTransacaoId, buscarUsuario_id, totalTransacoes } = require("../bancoDeDados/consultas");
const { deleteTransacao } = require("../bancoDeDados/deletar");
const { lancarTransacao } = require("../bancoDeDados/inserir");
const { updateTransacao } = require("../bancoDeDados/update");

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
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }

}

const AtualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;
    try {
        const { rows } = await buscarUsuario_id ( id );

        if ( idUsuario != rows[0].usuario_id ) {
            return res.status(400).json({ mensagem: "Está transação não pertence ao usuário logado" });
        }

        await updateTransacao(id, descricao, valor, data, categoria_id, idUsuario, tipo);

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

const deletarTransacao = async (req, res) => {
    const { id: idUsuario} = req.usuario;
    const { id } = req.params;


    try {
        const { rows, rowCount } = await buscarUsuario_id ( id );
        if( rowCount > 0 ){
            if ( idUsuario != rows[0].usuario_id ) {
                return res.status(400).json({ mensagem: "Está transação não pertence ao usuário logado" });
            }
        }
        if ( rowCount === 0){
            return res.status(400).json({ mensagem: "Transação não encontrada" });
        }
        
        await deleteTransacao( id );

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    } 
}

const extratoTransacao = async (req, res) => {
    const { id: idUsuario} = req.usuario;
try{
    const { rows, rowCount } = await buscarTransacoesUsuario( idUsuario );
    const listaEntrada = rows.filter( transacao => transacao.tipo === "entrada");
    const listaSaida = rows.filter( transacao => transacao.tipo === "saida");

    const totalEntrada = listaEntrada.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    const totalSaida = listaSaida.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

    return res.status(200).json({entrada: totalEntrada,
    saida: totalSaida});
} catch{
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
}

};

module.exports = {
    listarTransacoes,
    buscarTransacao,
    inserirTransacao,
    AtualizarTransacao,
    deletarTransacao,
    extratoTransacao
}