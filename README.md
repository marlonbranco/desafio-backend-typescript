# Projeto Backend CRUD em TypeScript & Node.JS ⚙

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Node.JS](https://img.shields.io/badge/-Node.JS-339933?logo=node.js&logoColor=white)](https://nodejs.org/en/)

Simples CRUD de Users e Addresses aplicando as técnologias Node.JS, TypeScript, TypeORM, Express, JWT e BCrypt.

Além disso na construção do projeto foram aplicados os conceitos de SOLID e TDD.

## Após clonar o repositório instale as dependências

```bash
yarn
```

## Criação do Banco de Dados com Docker

```bash
docker-compose -f docker-compose.yml up -d
```

> Após a execução a imagem desafio-backend-typescript será gerada no seu Docker

## Criando a estrutura básica do Banco de Dados

Para criar as tabelas no banco de dados, execute o seguinte comando:

```bash
yarn typeorm migration:run
```

### Estrutura do Banco

![UML do BD](.github/media/UML.png)

## Executando o projeto

Para executar o servidor rode o seguinte comando:

```bash
yarn dev:server
```

> Se estiver tudo ok aparecerá a seguinte mensagem no terminal: Back-end started on port 3333! 🚀

# Documentação das rotas da API com Postman

Acesse a este que com a documentação das rotas e é possível testálas pelo próprio Postman: [![Postman](https://img.shields.io/badge/-POSTMAN-FF6C37?logo=postman&logoColor=white)](http://tinyurl.com/back-end-documentation)

Habilite o **Enviroment _dev_** no canto superior direito, onde está escrito **No Enviroment**.

Nele já estão configuradas as variáveis de ambiente como a base_url e o token para a autenticação nas rotas, o último será obtido após a criação da sessão.

**_OBS:_**Todo o envio de dados será feito por um arquivo JSON através do Body da requisição.

## Para começar a usar as Rotas:

Primeiro **crie** um usuário, já há um User **John Doe** definido no Body da requisição:
**POST** Create User

## Sessions

Em seguida obtenha o **Token JWT** para a configuração do **Enviroment** criando uma sessão:
**POST** Create a Session

# IMPORTANTE

Copie e cole o **Token** obtido no **Enviroment _dev_** na variável **token**, é importante que você faça isso porque TODAS as rotas EXCETO a rota Create User fazem o uso da autenticação por JWT.

## Users

**GET** List All Users:
A rota lista todas as informações de todos os usuários da aplicação.

## User

**GET** Show User:
Mostra os dados do usuário, é necessário passar o ID do usuário os Query Params do request:

> /user/?user_id

**GET** List All Addresses From User:
A rota mostra todos os endereços de um usuário, ela filtrará pelo ID do usuário enviado no Query Params:

> /user/addresses/?user_id

**PUT** Update User:
Nesta rota é possível fazer a atualização nos dados do usuário, pelo ID informado no Query Params:

> /user/?user_id

**DELETE** Delete User:
Nesta rota é possível deletar um usuário, pelo ID informado no Query Params:

> /users/?user_id

## Users

**GET** List All Users:
Lista todos os usuários cadastrados:

> /users/

## Profile

**PUT** Update User Profile:
Nesta rota é possível fazer a atualização nos dados do usuário **AUTENTICADO** e a **TROCA DE SENHA** informando a **old_password**, a troca de senha é opcional:

> /profile/

## Address

**POST** Create Address:
Crie um endereço a partir do ID do usuário informado no Query Params do request:

> /address/?user_id

**GET** Show Address:
Mostra os dados de um endereço, é necessário passar o ID do endereço os Query Params do request:

> /address/?address_id

**PUT** Update Address:
Nesta rota é possível fazer a atualização dos dados de um endereço, pelo ID informado no Query Params:

> /address/?address_id

**DELETE** Delete Address:
Nesta rota é possível deletar um endereço, pelo ID informado no Query Params:

> /address/?address_id

## Addresses

**GET** List All Addresses:
Lista todos os endereços cadastrados:

> /address/
