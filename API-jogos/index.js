import express from 'express';
import lista from './jogos.js';  

const app = express();

const buscaPorGenero = (genero) => { 
  return lista.filter(jogo => jogo.genero.toLowerCase() === genero.toLowerCase());
};

const buscaPorPlataforma = (plataforma) => { 
  return lista.filter(jogo => jogo.plataforma.toLowerCase() === plataforma.toLowerCase());
};

app.get('/jgs', (req, res) => {
  const genero = req.query.genero;
  const plataforma = req.query.plataforma;

  if (plataforma) {
    const resultado = buscaPorPlataforma(plataforma);
    if (resultado.length > 0) {
      return res.json(resultado);
    } else {
      return res.status(404).json({ erro: 'Nenhum jogo encontrado para o gênero especificado' });
    }
  };

  if (genero) {
    const resultado = buscaPorGenero(genero);
    if (resultado.length > 0) {
      return res.json(resultado);
    } else {
      return res.status(404).json({ erro: 'Nenhum jogo encontrado para o gênero especificado' });
    }
  }

  res.json(lista);
});

app.get('/jgs/:id', (req, res) => {
  const jgID = parseInt(req.params.id);
  let mensagemErro = '';
  let jg;
  
  if (!(isNaN(jgID))) {
    jg = lista.find(j => j.id === jgID);
    if (!jg) {
      mensagemErro = 'Jogo não encontrado';
    }
  } else {
    res.status(400).json({ "erro": "ID inválido" });
  }

  if (jg) {
    res.json(jg);
  } else {  
    res.status(404).json({ "erro": mensagemErro });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});