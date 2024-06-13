# Projeto para a aula da FIAP - CRUD 2CTJ

## Iniciar Projeto

Na raiz do projeto rode o comando:

```sh
yarn install ou npm install
```

Executar o servidor:

```sh
yarn start ou npm start
```

## Arquitetura do projeto

CRUD--2CTJ/
├── app/                  # Diretório principal da aplicação
│   ├── controllers/      # Controladores para rotas e lógica de negócio
│   │   │
│   │   └──  users.js     # Controlador de usuários (e outros se necessário)
│   ├── routes/           # Rotas da API REST
│   │   │
│   │   └── users.js      # Rotas de usuários (e outros se necessário)
│   │── index.js          # Ponto de entrada da aplicação
│   ├── config/           # Configurações da aplicação
│   │   └── database.js   # Configuração da conexão com o MongoDB
│   ├── package.json      # Arquivo de dependências do projeto
│   └── README.md         # Arquivo com instruções do projeto
└───────────────────────