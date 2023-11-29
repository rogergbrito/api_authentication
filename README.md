# API de Autenticação

API para fazer a autenticação e autorização de um usuário na aplicação.
Conta com um sistema de cadastro, login, visualização, atualização e exclusão de usuários da base de dados.

Banco de dados: PostgreSQL

Versão do Nodejs: 18.14.2

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

1. Clone o repositório: `git clone https://github.com/rogergbrito/api_authentication.git`
2. Acesse o diretório do projeto: `cd api_authentication`
3. Instale as dependências: `npm install`

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_PASSWORD=example_password
DATABASE_USER=example_user
DATABASE_HOST=example_host
DATABASE_PORT=example_port
TOKEN_SECRET=example_jwt_secret
```

## Bibliotecas Utilizadas

- bcrypt: Versão 5.1.1
- cors: Versão 2.8.5
- dotenv: Versão 16.3.1
- express: Versão 4.18.2
- express-rate-limit: Versão 7.1.1
- jsonwebtoken: Versão 9.0.2
- pg: Versão 8.11.3

## Execução

Para executar a aplicação, você pode rodar o próprio typescript com o `npm run dev` (isso irá executar o ts-node-dev instalado nas dependências) ou pode transpilar o typescript para javascript através do `npx tsc` e iniciar com o  `node dist/app.js`

Você poderá definir a porta da aplicação no arquivo `.env` ou rodar na padrão: `3001`

## Rotas

- `POST` /api/signup: Rota para registrar o usuário
- `POST` /api/login: Rota para autenticar o usuário
- `GET` /api/users: Rota para listar todos os usuários
- `GET` /api/users/:id: Rota para obter informações de um usuário específico
- `PUT` /api/users/:id: Rota para atualizar um usuário por completo
- `PATCH` /api/users/:id: Rota para atualizar parcialmente um usuário
- `DELETE` /api/users/:id: Rota para apagar um usuário



## Contribuindo

Se quiser contribuir com este projeto, siga os passos abaixo:

- Faça um fork do projeto
- Crie uma branch para sua feature (git checkout -b feature/sua-feature)
- Faça commit das suas mudanças (git commit -am 'Adicione sua feature')
- Faça push para a branch (git push origin feature/sua-feature)
- Abra um pull request