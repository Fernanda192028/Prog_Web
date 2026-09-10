# 👥 CRUD de Funcionários

Um sistema web completo para o gerenciamento de funcionários, englobando as operações fundamentais de Criação, Leitura, Atualização e Exclusão (CRUD). O projeto consome uma API RESTful construída em Node.js e apresenta os dados em uma interface limpa e responsiva.

## 🚀 Funcionalidades

- **Cadastro:** Inserção de novos funcionários com validação de campos obrigatórios.
- **Listagem:** Visualização de todos os funcionários cadastrados no banco de dados.
- **Atualização:** Edição de dados específicos (como promoções de cargo ou reajustes salariais).
- **Remoção:** Exclusão segura de registros do sistema.
- **Integração:** O backend serve automaticamente os arquivos estáticos do frontend.

## 🛠️ Tecnologias Utilizadas

**Backend:**
* [Node.js](https://nodejs.org/) - Ambiente de execução
* [Express.js](https://expressjs.com/) - Framework web para estruturação das rotas da API
* [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL (modelagem via Mongoose)

**Frontend:**
* HTML5 estrutural e semântico
* CSS3 puro para estilização e responsividade
* JavaScript (Vanilla) para consumo da API e manipulação do DOM

## 📁 Estrutura do Projeto

```text
funcionarios-crud/
├── backend/
│   ├── src/
│   │   └── server.js      # Ponto de entrada da API e conexão com o banco
│   ├── .env.example       # Template para variáveis de ambiente
│   └── package.json       # Dependências e scripts do Node
├── frontend/
│   ├── index.html         # Estrutura principal da página
│   ├── app.js             # Lógica de interface e chamadas HTTP
│   ├── style.css          # Estilos visuais
│   └── public/            # Assets estáticos (imagens, ícones)
└── README.md