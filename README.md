# API Node MVC

**Aluno:** Rafael Queiroz Viana
**Turma:** 3DS-N

API REST de usuarios feita com Node.js, Express e MySQL, organizada no padrao de arquitetura MVC.

## Como rodar

1. Clone o repositorio e entre na pasta
2. Instale as dependencias: `npm install`
3. Crie o banco: `mysql -u root -p < schema.sql`
4. Copie `.env.example` para `.env` e preencha com seus dados do MySQL
5. Inicie o servidor: `npm run dev` (ou `npm start`)

A API fica em `http://localhost:3000/usuarios`.

## Endpoints

- GET /usuarios
- POST /usuarios
- PUT /usuarios/:id
- DELETE /usuarios/:id

## Arquitetura em camadas

- **config/**: cria o pool de conexao com o MySQL usando as variaveis do ".env"
- **models/**: unica camada que executa SQL, sempre com queries parametrizadas.
- **controllers/**: recebe a requisicao, valida os dados de entrada, chama o model e devolve a resposta HTTP com o status adequado.
- **routes/**: define os endpoints e liga cada verbo HTTP a funcao do controller.
- **app.js**: configura os middlewares e sobe o servidor, sem nenhuma query SQL.

Como a aplicacao e uma API, a camada View e o JSON retornado nas respostas.