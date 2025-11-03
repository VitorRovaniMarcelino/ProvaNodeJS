// div para mostrar os livros e botão para criar os livros

const divLivros = document.getElementById("divLivros");
const criarLivro = document.getElementById("criarLivro")

// listar livros
fetch('http://localhost:3000/livros')

    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar livros!');
        }
        return response.json();
    })

    .then(data => {
        data.forEach(livro => {
            divLivros.innerHTML += `
                <ul class="list-group">
                    <li class="list-group-item">ID: ${livro.id}</li>
                    <li class="list-group-item">Título: ${livro.titulo}</li>
                    <li class="list-group-item">Autor: ${livro.autor}</li>
                    <li class="list-group-item">Ano de Publicação: ${livro.ano_Publicacao}</li>
                    <li class="list-group-item">Gênero: ${livro.genero}</li>
                    <li class="list-group-item"><a class="btn btn-warning" onclick="editarLivro(${livro.id})">Editar</a></li>
                    <li class="list-group-item"><a class="btn btn-danger" onclick="excluirLivro(${livro.id})">Excluir</a></li>
                </ul>
                `
        });
    })

    .catch(error => console.log("Erro na requisição", error));

// função para gerar o forms de editar os livros
function editarLivro(id) {

    // deixar "invisivel" a lista de livros
    divLivros.innerHTML = ``;
    // deixar "invisivel" o botão de editar
    criarLivro.style.display = "none";


    //fetch do forms de edição
    fetch(`http://localhost:3000/livros/${id}`)

        .then(response => response.json())

        .then(livro => {
            // forms de edição
            divLivros.innerHTML = `
                    <form>
                        <h1>Editar Livro</h1>
                        <div class="mb-3">
                            <label class="form-label">Título</label>
                            <input type="text" class="form-control" id="titulo1" value="${livro.titulo}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Autor</label>
                            <input type="text" class="form-control" id="autor1" value="${livro.autor}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ano de Publicação</label>
                            <input type="number" class="form-control" id="anoPublicacao1" value="${livro.ano_Publicacao}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Gênero</label>
                            <input type="text" class="form-control" id="genero1" value="${livro.genero}">
                        </div>
                    </form>
                    <br>
                    <a class="btn btn-secondary" onclick="salvarEdicao(${livro.id})">Editar</a>
                    <a class="btn btn-danger" href="index.html">Voltar</a>
                `
        })

        .catch(error => console.log(error));

}

// função para salvar os dados editados do livro
function salvarEdicao(id) {
    const titulo = document.getElementById("titulo1").value;
    const autor = document.getElementById("autor1").value;
    const anoPublicacao = document.getElementById("anoPublicacao1").value;
    const genero = document.getElementById("genero1").value;

    const livro = {
        titulo: titulo,
        autor: autor,
        ano_Publicacao: anoPublicacao,
        genero: genero
    }


    //fetch de edição
    fetch(`http://localhost:3000/livros/${id}`, {

        method: 'PUT',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(livro)

    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar livro!');
            }
        })

        .then(livroEditado => {
            alert('Livro editado com sucesso!', livroEditado);
            window.location.href = "index.html"
        })

        .catch(error => {
            console.error('Falha na requisição:', error);
        });

}

// função para excluir livros
function excluirLivro(id) {
    fetch(`http://localhost:3000/livros/${id}`, {

        method: 'DELETE'
    })

        // confirmação se deseja excluir
        .then(response => {
            if (!confirm("Deseja realmente excluir esse livro?")) {
                return true
            }

            if (true) {
                if (response.status === 204) {
                    alert('Livro excluído com sucesso!');
                    window.location.href = "index.html"
                } else {
                    throw new Error('Erro ao remover livro.');
                }
            }
        })

        .catch(error => {
            console.error('Falha na requisição:', error);
        });
}
