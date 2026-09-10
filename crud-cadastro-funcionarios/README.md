# CRUD de Funcionários

Projeto no mesmo padrão do CRUD de Produtos: Node.js + Express + MongoDB no backend, HTML/CSS/JS puro no frontend.

## Estrutura

```
funcionarios-crud/
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── public/
└── README.md
```

## Como rodar

1. Entre na pasta do backend e instale as dependências:
   ```
   cd backend
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente e ajuste se precisar:
   ```
   cp .env.example .env
   ```

3. Garanta que o MongoDB está rodando (local ou Atlas) e que a `MONGODB_URI` no `.env` aponta para ele.

4. Inicie o servidor:
   ```
   npm start
   ```
   ou, em modo desenvolvimento com reinício automático:
   ```
   npm run dev
   ```

5. Acesse **http://localhost:8000** no navegador. O backend serve o frontend automaticamente.

## Campos do funcionário

- **nome** (texto, obrigatório)
- **cargo** (texto, obrigatório)
- **email** (texto, obrigatório)
- **salario** (número, obrigatório)
- **dataAdmissao** (data, obrigatório)

## Rotas da API

| Método | Rota                     | Descrição                     |
|--------|--------------------------|--------------------------------|
| GET    | `/api/funcionarios`      | Lista todos os funcionários    |
| GET    | `/api/funcionarios/:id`  | Busca um funcionário           |
| POST   | `/api/funcionarios`      | Cria um funcionário            |
| PUT    | `/api/funcionarios/:id`  | Atualiza um funcionário        |
| DELETE | `/api/funcionarios/:id`  | Remove um funcionário          |
