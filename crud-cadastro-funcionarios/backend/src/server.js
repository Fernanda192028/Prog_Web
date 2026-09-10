require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/funcionarios-crud";

app.use(cors());
app.use(express.json());

// Serve o frontend estático (mesmo padrão do CRUD de produtos)
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

// ----------------- Conexão com o MongoDB -----------------
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// ----------------- Schema / Model -----------------
const funcionarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    cargo: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    salario: { type: Number, required: true, min: 0 },
    dataAdmissao: { type: Date, required: true },
  },
  { timestamps: true }
);

const Funcionario = mongoose.model("Funcionario", funcionarioSchema);

// ----------------- Rotas -----------------

// GET /api/funcionarios - lista todos
app.get("/api/funcionarios", async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().sort({ createdAt: -1 });
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar funcionários." });
  }
});

// GET /api/funcionarios/:id - busca um
app.get("/api/funcionarios/:id", async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ erro: "Funcionário não encontrado." });
    }
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar funcionário." });
  }
});

// POST /api/funcionarios - cria (salva no MongoDB)
app.post("/api/funcionarios", async (req, res) => {
  try {
    const { nome, cargo, email, salario, dataAdmissao } = req.body;

    if (!nome || !cargo || !email || salario == null || !dataAdmissao) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    const novoFuncionario = new Funcionario({
      nome,
      cargo,
      email,
      salario,
      dataAdmissao,
    });

    const salvo = await novoFuncionario.save();
    res.status(201).json(salvo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar funcionário." });
  }
});

// PUT /api/funcionarios/:id - atualiza
app.put("/api/funcionarios/:id", async (req, res) => {
  try {
    const { nome, cargo, email, salario, dataAdmissao } = req.body;

    const atualizado = await Funcionario.findByIdAndUpdate(
      req.params.id,
      { nome, cargo, email, salario, dataAdmissao },
      { new: true, runValidators: true }
    );

    if (!atualizado) {
      return res.status(404).json({ erro: "Funcionário não encontrado." });
    }

    res.json(atualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar funcionário." });
  }
});

// DELETE /api/funcionarios/:id - remove
app.delete("/api/funcionarios/:id", async (req, res) => {
  try {
    const removido = await Funcionario.findByIdAndDelete(req.params.id);
    if (!removido) {
      return res.status(404).json({ erro: "Funcionário não encontrado." });
    }
    res.json({ mensagem: "Funcionário removido com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao remover funcionário." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});