const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// json dos livros
const livros = [
    { id: 1, titulo: 'João e maria', autor: 'Pedro', ano_Publicacao: 1990, genero: 'terror' },
    { id: 2, titulo: 'Dom quixote', autor: 'Humberto', ano_Publicacao: 2012, genero: 'aventura' },
];

// rota padrão
app.get('/', (req, res) => {
    res.send('Servidor rodando.');
});

// pegar os livros
app.get('/livros', (req, res) => {
    res.json(livros);
});

// pegar livro por id
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado.');
    }
});

// adicionar livro
app.post('/livros', (req, res) => {
    const novoLivro = req.body;
    novoLivro.id = livros.length + 1;

    livros.push(novoLivro);
    res.status(201).json("Livro adicionado com sucesso!", novoLivro);
});

// editar os livros
app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const novosDados = req.body;

    const index = livros.findIndex(l => l.id === id);
    if (index !== -1) {
        livros[index] = { ...livros[index], ...novosDados };
        res.status(204).json("Livro editado com sucesso!", livros[index]);
    } else {
        res.status(404).send('Livro não encontrado.');
    }
});

// deletar os livros
app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index !== -1) {
        livros.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});