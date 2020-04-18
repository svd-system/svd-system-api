# SVD System API v1.0.0

[![Build Status](https://travis-ci.com/svd-system/svd-system-api.svg?branch=develop)](https://travis-ci.com/svd-system/svd-system-api)

API do sistema SVD System, um cartão de vacinas digital.

#### Ferramentas

- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [nodemon](https://nodemon.io/)
- [Sequelize](https://sequelize.org/)
- [Travis CI](https://travis-ci.com/)
- [Heroku](https://dashboard.heroku.com/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

#### Documentação da API com Swagger

A documentação da API em desenvolvimento do SVD System está publicado no [Heroku](https://svd-system-api-feature.herokuapp.com/api/swagger-ui/).

---

### Configuração do ambiente de desenvolvimento

Para configurar o ambiente de desenvolvimento de forma apropriada, siga as instruções abaixo:

#### Pré requisitos

- npm (6.x)
- Node.js (12.x)
- PostrgreSQL (12.x)
- Visual Studio Code (1.44.x)
- Git (2.x)

#### Clonando o projeto com o Git

Para clonar o projeto via linha de comando, abra o terminal no seu computador e execute os comandos:

```shell
git clone git@github.com:svd-system/svd-system-api.git
cd svd-system-api
```

Antes de fazer qualquer alteração no código, é obrigatório dar inicio ao workflow do Git. Digite `git flow init` e aperte `Enter` algumas vezes até chegar no resultado abaixo:

```shell
git flow init

No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
Hooks and filters directory? [~/svd-system-api/.git/hooks]
```

Para mais informações a respeito do Git flow, clique [aqui](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html).

#### Instalando as dependências do projeto com npm

Existem dependências do projeto que devem ser instaladas globalmente, e que por isso não foram adicionadas ao arquivo `package.json`: o Sequelize CLI e o ESLint. Execute os comandos abaixo na raiz do projeto para instalar essas dependências globalmente e em seguida as dependências do projeto.

```shell
npm install -g sequelize-cli eslint
npm install
```

#### Conectando o servidor ao banco de dados PostgreSQL

Os dados de conexão com o banco de dados PostgreSQL devem ser definidas através de variáveis de ambiente. A maneira mais simples de fazer isso é criar o arquivo `.env` na raiz do projeto e incluir as variáveis como no exemplo abaixo:

```shell
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

Outra possibilidade é definir esses mesmos parâmetros diretamente nas variáveis de ambiente do seu computador.

Agora precisamos executar o comando a seguir para que o Sequelize crie toda a estrutura do banco de dados da aplicação:

```shell
sequelize-cli db:migrate
```

#### Executando o projeto

Depois de todas as configurações acima, execute o comando abaixo para subir o servidor no ambiente de desenvolvimento. Certifique-se de que o seu banco de dados esteja funcionando e acessível.

```shell
npm run dev
```

E em seguida, acesse o SVD System API em [localhost:8080](http://localhost:8080/) no seu navegador.

A porta padrão é a 8080, mas é possível escolher outra porta através da variável de ambiente `PORT` que pode ser definido diretamente nas variáveis de ambiente do seu computador, no arquivo `.env` ou ao executar o comando citado anteriormente:

```
env PORT=3000 npm run dev
```

#### Plugins do VSCode

Os plugins abaixo devem ser instalados no Virtual Studio Code:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Contribuição

Alexsandro Castro de Oliveira

Daniel Messias da Silva Filho

Israel Jeronimo da Silva

John Wanderson Viana da Luz

Ricardo de Lima Rocha

- [Linkedin](https://www.linkedin.com/in/ricardo-de-lima-rocha/)
- [GitHub](https://github.com/lericardolima)
