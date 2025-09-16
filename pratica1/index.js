import express from 'express';
import times from './times.js';

const app = express();

const buscaPorNome = (time) => {
    return times.filter(times => times.time.toLowerCase().includes(time.toLowerCase()));
}

app.get('/prl', (req, res) => {
    const time = req.query.time;

    if (time) {
        const resultado = buscaPorNome(time);
        if (resultado.length > 0) {
            return res.json(resultado);
        } else {
            return res.status(404).json({ erro: 'Nenhum time encontrado com o nome especificado' });
        }
    }
    res.json(times);
});

app.get('/prl/:id', (req, res) => {
    const timeID = parseInt(req.params.id);
    let mensagemErro = '';
    let time;
    if (!(isNaN(timeID))) {
        time = times.find(t => t.id === timeID);
        if (!time) {
            mensagemErro = 'Time não encontrado';
        }
    } else {
        res.status(400).json({ "erro": "ID inválido" });
    }
    if (time) {
        res.json(time);
    } else {
        res.status(404).json({ "erro": mensagemErro });
    }    
});

app.listen(1212, () => {
    console.log('servidor rodando na porta 1212');
});