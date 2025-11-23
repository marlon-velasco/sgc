// Elementos do DOM
const openModalButton = document.getElementById("openModalButton");
const visitorModal = document.getElementById("visitorModal");
const closeModalButton = document.getElementById("closeModalButton");
const modalBackdrop = document.getElementById("modalBackdrop");
const visitorForm = document.getElementById("visitorForm");
const visitTypeSelect = document.getElementById("visitType");
const serviceTypeContainer = document.getElementById("serviceTypeContainer");
const visitorList = document.getElementById("visitorList");

// Chave para o localStorage
const STORAGE_KEY_VISITANTES = 'sgc_visitantes';

// --- Funções Auxiliares ---

// Carregar visitantes salvos ao iniciar
function loadVisitors() {
    const storedVisitors = localStorage.getItem(STORAGE_KEY_VISITANTES);
    if (storedVisitors) {
        const visitors = JSON.parse(storedVisitors);
        // Limpa a lista atual (exceto o exemplo estático se quiser mantê-lo, ou remove tudo)
        // visitorList.innerHTML = ''; 
        visitors.forEach(visitor => addVisitorCardToDOM(visitor, false));
    }
}

// Salvar novo visitante
function saveVisitorToStorage(visitor) {
    let visitors = [];
    const storedVisitors = localStorage.getItem(STORAGE_KEY_VISITANTES);
    if (storedVisitors) {
        visitors = JSON.parse(storedVisitors);
    }
    visitors.push(visitor);
    localStorage.setItem(STORAGE_KEY_VISITANTES, JSON.stringify(visitors));
}

// Validar Placa (Mercosul ou Antiga)
function validatePlate(plate) {
    if (!plate) return true; // Placa é opcional
    // Regex: AAA-0000 ou AAA0A00
    // Em conformidade com a Resolução 780/2019 CONTRAN, de 26 de junho de 2019
    // https://www.in.gov.br/web/dou/-/resolucao-n-780-de-26-de-junho-de-2019-179414765
    const plateRegex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$|^[a-zA-Z]{3}-[0-9]{4}$/;
    return plateRegex.test(plate);
}

function addVisitorCardToDOM(visitor, animate = true) {
    const newCard = document.createElement("div");
    newCard.className = `bg-white p-4 rounded-2xl shadow-md border border-gray-100 ${animate ? 'animate-pulse' : ''}`;

    newCard.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-bold text-gray-900">${visitor.name}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-semibold ${
              visitor.type === "familiar"
                ? "bg-gray-800 text-white"
                : "bg-blue-100 text-blue-800"
            }">
                ${visitor.typeText}
            </span>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-500">
            <i class="fa-regular fa-calendar"></i>
            <span>${visitor.date}</span>
            <i class="fa-regular fa-clock ml-2"></i>
            <span>${visitor.time}</span>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-500 mt-2">
             <i class="fa-solid fa-car"></i>
             <span>${visitor.plate}</span>
        </div>
    `;

    visitorList.prepend(newCard);

    if (animate) {
        setTimeout(() => {
            newCard.classList.remove("animate-pulse");
        }, 500);
    }
}

// --- Lógica do Modal ---

openModalButton.addEventListener("click", () => {
  visitorModal.classList.remove("hidden");
  setDefaultDateTime();
});

closeModalButton.addEventListener("click", () => visitorModal.classList.add("hidden"));
modalBackdrop.addEventListener("click", () => visitorModal.classList.add("hidden"));

visitTypeSelect.addEventListener("change", (e) => {
  if (e.target.value === "servico" || e.target.value === "delivery") {
    serviceTypeContainer.classList.remove("hidden");
  } else {
    serviceTypeContainer.classList.add("hidden");
  }
});

// Submit do formulário
visitorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("visitorName").value;
  const type = document.getElementById("visitType").value;
  const typeText = document.getElementById("visitType").options[document.getElementById("visitType").selectedIndex].text;
  const dateInput = document.getElementById("visitDate").value;
  const time = document.getElementById("visitTime").value;
  const plateInput = document.getElementById("vehiclePlate").value.toUpperCase();

  // Validação de Placa
  if (plateInput && !validatePlate(plateInput)) {
      alert("Formato de placa inválido. Use ABC-1234 ou ABC1D23");
      return;
  }

  const plate = plateInput || "Não informado";
  const dateParts = dateInput.split("-");
  const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  const newVisitor = { name, type, typeText, date, time, plate };

  // 1. Adiciona na tela
  addVisitorCardToDOM(newVisitor, true);
  
  // 2. Salva no localStorage (Persistência)
  saveVisitorToStorage(newVisitor);

  visitorForm.reset();
  serviceTypeContainer.classList.add("hidden");
  visitorModal.classList.add("hidden");
});

function setDefaultDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  document.getElementById("visitDate").value = `${year}-${month}-${day}`;
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("visitTime").value = `${hours}:${minutes}`;
}

// Carregar dados ao abrir a página
document.addEventListener('DOMContentLoaded', loadVisitors);