import express from 'express'; 
import { buscarUfs, buscarUfsPorId, buscarUfsPorNome } from "./servico/servico.js";

const app = express();

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).json({"erro": "Nenhuma UF encontrada"});
    }
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = req.params.iduf;
    const uf = buscarUfsPorId(idUF);

    if (uf) {
       res.json(uf); 
    } else if (isNaN(parseInt(idUf))){
        res.status(400).send({"erro" : "Requisição inválida" })
    } else {
        res.status(600).send({"erro" : "ID não encontrado"})
    }
});

app.listen(8080, () => {
    let data = new Date();
    console.log('Servidor iniciado na porta 8080 em: ' +data);
});