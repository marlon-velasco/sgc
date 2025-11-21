// Elementos do DOM
const openModalButton = document.getElementById("openModalButton");
const visitorModal = document.getElementById("visitorModal");
const closeModalButton = document.getElementById("closeModalButton");
const modalBackdrop = document.getElementById("modalBackdrop");
const visitorForm = document.getElementById("visitorForm");
const visitTypeSelect = document.getElementById("visitType");
const serviceTypeContainer = document.getElementById("serviceTypeContainer");
const visitorList = document.getElementById("visitorList");

// --- Lógica do Modal ---

// Abrir modal
openModalButton.addEventListener("click", () => {
  visitorModal.classList.remove("hidden");
});

// Fechar modal (botão X)
closeModalButton.addEventListener("click", () => {
  visitorModal.classList.add("hidden");
});

// Fechar modal (clicando no fundo)
modalBackdrop.addEventListener("click", () => {
  visitorModal.classList.add("hidden");
});

// Mostrar/Esconder campo "Tipo de Serviço"
visitTypeSelect.addEventListener("change", (e) => {
  if (e.target.value === "servico" || e.target.value === "delivery") {
    serviceTypeContainer.classList.remove("hidden");
  } else {
    serviceTypeContainer.classList.add("hidden");
  }
});

// Submit do formulário de cadastro
visitorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Pegar valores do formulário
  const name = document.getElementById("visitorName").value;
  const type = document.getElementById("visitType").value;
  const typeText =
    document.getElementById("visitType").options[
      document.getElementById("visitType").selectedIndex
    ].text;
  const dateInput = document.getElementById("visitDate").value;
  const time = document.getElementById("visitTime").value;
  const plate =
    document.getElementById("vehiclePlate").value || "Não informado";

  // Formatar data (de YYYY-MM-DD para DD/MM/YYYY)
  const dateParts = dateInput.split("-");
  const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  // Log de simulação
  console.log("Novo visitante cadastrado:");
  console.log({ name, type, date, time, plate });

  // Criar o novo card de visitante
  const newCard = document.createElement("div");
  newCard.className =
    "bg-white p-4 rounded-2xl shadow-md border border-gray-100 animate-pulse"; // Animação

  newCard.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gray-900">${name}</h3>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                      type === "familiar"
                        ? "bg-gray-800 text-white"
                        : "bg-blue-100 text-blue-800"
                    }">
                        ${typeText}
                    </span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>${date}</span>
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>${time}</span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                     <span>${plate}</span>
                </div>
            `;

  // Adicionar o novo card no topo da lista
  visitorList.prepend(newCard);

  // Remover animação após um tempo
  setTimeout(() => {
    newCard.classList.remove("animate-pulse");
  }, 500);

  // Limpar formulário e fechar modal
  visitorForm.reset();
  serviceTypeContainer.classList.add("hidden");
  visitorModal.classList.add("hidden");
});

// Define a data e hora atuais nos campos do modal
function setDefaultDateTime() {
  const now = new Date();

  // Formata a data para YYYY-MM-DD
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  document.getElementById("visitDate").value = `${year}-${month}-${day}`;

  // Formata a hora para HH:MM
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("visitTime").value = `${hours}:${minutes}`;
}

// Define os valores padrão ao abrir o modal
openModalButton.addEventListener("click", setDefaultDateTime);
// Define os valores padrão ao carregar a página (para os inputs)
setDefaultDateTime();
