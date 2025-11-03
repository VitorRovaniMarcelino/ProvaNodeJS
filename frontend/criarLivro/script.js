// função para criar os livros

function criarLivro() {

    // pegar os valores pelo id
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anoPublicacao = document.getElementById("anoPublicacao").value;
    const genero = document.getElementById("genero").value;

    const livro = {
        titulo: titulo,
        autor: autor,
        ano_Publicacao: anoPublicacao,
        genero: genero
    }


    // fetch de criação
    fetch('http://localhost:3000/livros', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(livro)

    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar livro.');
            }
            return response.json();
        })
        .then(livroCriado => {
            alert('Livro criado com sucesso!', livroCriado);
            window.location.href = "../index.html"
        })
        .catch(error => {
            console.error('Falha na requisição:', error);
        });
}