import premierLeague from "./coleçao/coleçao.js";
import express from 'express';

const app  = express();

const buscaNomePremier = (premierLeague) => {
    return premierLeague.filter(pr => pr.nome.toLowercase())
}

app.get('/premierLeague', (req,res) => {
    res.json(premierLeague);
});


app.listen(6969, () => {
    const data = new Date();
    console.log('Servidor iniciado em: ' +data)
});