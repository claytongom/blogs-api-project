# Projeto API de Blogs

## Visão Geral

Nesta API RESTful que simula um blog, um usuário autenticado pode criar uma nova postagem em um blog com título, conteúdo e categorias relacionadas. Os usuários também podem ser criados, excluídos e listados, categorias podem ser criadas e listadas, e postagens podem ser criadas, listadas, excluídas e atualizadas. A API utiliza Tokens JSON Web para autenticação.

O projeto utiliza o MySQL como sistema de gerenciamento de banco de dados, e a comunicação entre a aplicação e o banco de dados é facilitada pelo ORM Sequelize.

A arquitetura de software deste projeto segue uma estrutura de três camadas: a camada Modelo, responsável pela comunicação com o banco de dados; a camada de Serviço, no meio, que valida regras de negócio; e a camada de Controlador, que lida com as solicitações HTTP e fornece respostas.

Este projeto foi desenvolvido durante meus estudos de desenvolvimento web back-end na @betrybe.

## Diagrama Banco de Dados

![Diagrama de Entidade e Relacionamento](https://github.com/tryber/sd-028-a-project-blogs-api/raw/master/public/der.png)


## Principais Linguagens e Ferramentas Utilizadas

Neste projeto, foram utilizadas as seguintes linguagens e ferramentas:

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript assíncrono baseado no V8.
- [Express.js](https://expressjs.com/): Framework web para Node.js que simplifica a construção de aplicativos web e APIs.
- [Sequelize](https://sequelize.org/): ORM (Object-Relational Mapping) baseado em JavaScript para bancos de dados SQL.
- [MySQL](https://www.mysql.com/): Sistema de gerenciamento de banco de dados relacional de código aberto.
- [Joi](https://joi.dev/): Biblioteca de validação de dados de entrada para Node.js.
- [JSON Web Token (JWT)](https://jwt.io/): Método compacto para representar informações entre duas partes como um objeto JSON.
- [Docker](https://www.docker.com/): Plataforma para desenvolvimento, envio e execução de aplicativos em contêineres.
- Arquitetura de software em camadas: Abordagem de design que divide um sistema em componentes interconectados e independentes.

Certifique-se de consultar a documentação oficial de cada uma dessas tecnologias para obter informações mais detalhadas.


## Instalação

<details>
<summary><strong>Com Docker</strong></summary>

1. Inicie os contêineres `blogs_api` e `blogs_api_db` usando o comando: `docker-compose up -d --build`
2. Acesse o terminal do contêiner `blogs_api` com: `docker exec -it blogs_api bash`
3. Dentro do terminal, instale as dependências usando: `npm install`
4. Todos os outros comandos do Node devem ser executados dentro do contêiner

</details>

<details>
<summary><strong>Sem Docker</strong></summary>

1. Instale as dependências usando: `npm install` (requer a versão 16 do Node)
2. Configure um arquivo `.env` com base no arquivo `.env.example` fornecido

</details>

<details>
<summary><strong>Comandos uteis</strong></summary>

- Para executar a aplicação, use: `npm start` ou `npm run debug` (para recarregamento ao vivo)
- Para executar testes dos requisitos do projeto, use: `npm test` para todos os testes ou `npm test <nome-do-teste>` para um requisito específico (ex: `npm test req01`)
- Use `npm run drop` para excluir o banco de dados
- Use `npm run prestart` para criar o banco de dados e suas tabelas
- Use `npm run seed` para popular as tabelas

</details>

## Endpoints

<details>
<summary><strong>POST </strong><code>/login</code></summary>

<br />

- Valida o email e a senha fornecidos e retorna um token JWT.
  
<br />

**Exemplo de Corpo da Solicitação:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Exemplo de Token Retornado:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**Exemplos de Requisições Inválidas:**
- Resposta para uma solicitação faltando um ou ambos os campos obrigatórios (status 400):
  
```json
{ "message": "Some required fields are missing" }
```

- Response for a request with incorrect or non-existing "email" and/or "password" (status 400):
  
```json
{ "message": "Invalid fields" }
```

</details>

<details>
<summary><strong>GET </strong><code>/user</code></summary>

<br />

- Retorna um array com todos os usuários cadastrados ordenados por seu id, ou um array vazio se não houver usuários. Requer um token válido

Exemplo:

```json
[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  {
      "id": 2,
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  },
]
```
</details>

<details>
<summary><strong>POST </strong><code>/user</code></summary>

<br />

- Cria um novo usuário e retorna um Json Web Token válido. As validações são feitas no corpo da requisição.

Exemplo de corpo de solicitação:

```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  // image is not requireed
}
```

Exemplo de resposta para entrada válida:
  
```json
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
```
Exemplos de solicitações inválidas:

- Resposta para solicitação com o campo "displayName" com menos de 8 caracteres (status 400):

```json
{
  "message": "\"displayName\" length must be at least 8 characters long"
}
```

- Resposta para solicitação com comprimento de "senha" inválido (status 400):
```json
{
  "message": "\"password\" length must be at least 6 characters long"
}
```

- Resposta para solicitação com um usuário existente (status 409):
  
```json
{
  "message": "User already registered"
}
```

</details>
  
<details>
<summary><strong>GET </strong><code>/user/:id</code></summary>

<br />

- Retorna o usuário com o id especificado. Requer um token válido
  
Example of response for valid entry:

```json
{
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```

Response for invalid id (status 404):

```json
{
  "message": "User does not exist"
}
```

</details>
  
<details>
<summary><strong>DELETE </strong><code>/user/me</code></summary>

<br />

- Deletes the logged in user according to the id in the token. Requires a valid token

Exclui o usuário conectado de acordo com o id no token. Requer um token válido

</details>
  
<details>
<summary><strong>GET </strong><code>/categories</code></summary>

<br />

- Retorna um array com todas as categorias cadastradas, ou um array vazio se não houver nenhuma. Requer um token válido

Exemplo:

```json
[
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

  /* ... */
]
```

</details>
  
<details>
<summary><strong>GET </strong><code>/post</code></summary>

<br />

- Retorna um array com todos os posts cadastrados, ou um array vazio se não houver nenhum. Requer um token válido

Exemplo:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },
  
  /* ... */
]
```

</details>
  
<details>
<summary><strong>POST </strong><code>/post</code></summary>

<br />

- Adiciona uma nova postagem e a vincula com suas respectivas categorias. Retorna com um id inserido. Requer um token válido

Exemplo de corpo de solicitação:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

Exemplo de resposta para entrada válida:


```json
{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "updated": "2022-05-18T18:00:01.196Z",
  "published": "2022-05-18T18:00:01.196Z"
}
```

</details>
  
<details>
<summary><strong>PUT </strong><code>/post/:id</code></summary>

<br />

- Atualiza e retorna a postagem com o id especificado. Somente o usuário autor do post pode atualizá-lo, sendo que apenas os campos "título" e "conteúdo" são atualizáveis. Requer um token válido

Exemplo de corpo de solicitação:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

Exemplo de resposta para entrada válida:


```json
{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "published": "2022-05-18T18:00:01.000Z",
  "updated": "2022-05-18T18:07:32.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    },
    {
      "id": 2,
      "name": "Escola"
    }
  ]
}
```

- Exemplos de solicitações inválidas:

Resposta ao pedido sem nenhum dos campos obrigatórios (status 400):

```json
{
  "message": "Some required fields are missing"
}
```

Resposta para solicitação de atualização de postagem de usuário não autorizado (status 401):

```json
{
    "message": "Unauthorized user"
  }
```


