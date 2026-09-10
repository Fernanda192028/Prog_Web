const API_URL = "/api/funcionarios";

const form = document.getElementById("form-funcionario");
const formTitulo = document.getElementById("form-titulo");
const funcionarioIdInput = document.getElementById("funcionario-id");
const nomeInput = document.getElementById("nome");
const cargoInput = document.getElementById("cargo");
const emailInput = document.getElementById("email");
const salarioInput = document.getElementById("salario");
const dataAdmissaoInput = document.getElementById("dataAdmissao");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnAtualizar = document.getElementById("btn-atualizar");

const loading = document.getElementById("loading");
const listaVazia = document.getElementById("lista-vazia");
const funcionariosContainer = document.getElementById("funcionarios-container");
const totalFuncionarios = document.getElementById("total-funcionarios");

async function carregarFuncionarios() {
  loading.classList.remove("hidden");
  listaVazia.classList.add("hidden");
  funcionariosContainer.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar funcionários.");
    }

    const funcionarios = await response.json();

    loading.classList.add("hidden");

    totalFuncionarios.textContent = `${funcionarios.length} funcionário(s) cadastrado(s)`;

    if (funcionarios.length === 0) {
      listaVazia.classList.remove("hidden");
      return;
    }

    funcionarios.forEach((funcionario) => {
      funcionariosContainer.appendChild(criarCardFuncionario(funcionario));
    });
  } catch (erro) {
    loading.classList.add("hidden");
    console.error(erro);
    alert("Não foi possível carregar os funcionários.");
  }
}

function formatarSalario(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(valor) {
  const data = new Date(valor);
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function criarCardFuncionario(funcionario) {
  const card = document.createElement("div");
  card.classList.add("card-funcionario");

  card.innerHTML = `
    <h3>${funcionario.nome}</h3>
    <p class="cargo">${funcionario.cargo}</p>
    <p class="email">${funcionario.email}</p>
    <div class="detalhes">
      <span class="salario">${formatarSalario(funcionario.salario)}</span>
      <span class="admissao">Admissão: ${formatarData(funcionario.dataAdmissao)}</span>
    </div>
    <div class="acoes-card">
      <button class="btn-laranja btn-editar">Editar</button>
      <button class="btn-vermelho btn-excluir">Excluir</button>
    </div>
  `;

  card.querySelector(".btn-editar").addEventListener("click", () => {
    preencherFormularioParaEdicao(funcionario);
  });

  card.querySelector(".btn-excluir").addEventListener("click", () => {
    excluirFuncionario(funcionario._id);
  });

  return card;
}

function preencherFormularioParaEdicao(funcionario) {
  funcionarioIdInput.value = funcionario._id;
  nomeInput.value = funcionario.nome;
  cargoInput.value = funcionario.cargo;
  emailInput.value = funcionario.email;
  salarioInput.value = funcionario.salario;
  dataAdmissaoInput.value = new Date(funcionario.dataAdmissao)
    .toISOString()
    .split("T")[0];

  formTitulo.textContent = "Editar funcionário";
  btnSalvar.textContent = "Atualizar funcionário";
  btnCancelar.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limparFormulario() {
  form.reset();
  funcionarioIdInput.value = "";
  formTitulo.textContent = "Cadastrar funcionário";
  btnSalvar.textContent = "Salvar funcionário";
  btnCancelar.classList.add("hidden");
}

async function salvarFuncionario(event) {
  event.preventDefault();

  const dados = {
    nome: nomeInput.value.trim(),
    cargo: cargoInput.value.trim(),
    email: emailInput.value.trim(),
    salario: parseFloat(salarioInput.value),
    dataAdmissao: dataAdmissaoInput.value,
  };

  const id = funcionarioIdInput.value;
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar funcionário.");
    }

    limparFormulario();
    carregarFuncionarios();
  } catch (erro) {
    console.error(erro);
    alert("Não foi possível salvar o funcionário.");
  }
}

async function excluirFuncionario(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este funcionário?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Erro ao excluir funcionário.");
    }

    carregarFuncionarios();
  } catch (erro) {
    console.error(erro);
    alert("Não foi possível excluir o funcionário.");
  }
}

form.addEventListener("submit", salvarFuncionario);
btnCancelar.addEventListener("click", limparFormulario);
btnAtualizar.addEventListener("click", carregarFuncionarios);

carregarFuncionarios();