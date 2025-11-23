// Elementos do DOM
const authorizeButton = document.getElementById("authorizeButton");
const confirmButton = document.getElementById("confirmButton");
const authorizeModal = document.getElementById("authorizeModal");
const closeModalButton = document.getElementById("closeModalButton");
const modalBackdrop = document.getElementById("modalBackdrop");
const authorizeForm = document.getElementById("authorizeForm");

const packageStatusBadge = document.getElementById("packageStatusBadge");
const buttonContainer = document.getElementById("buttonContainer");
const pickupInfo = document.getElementById("pickupInfo");
const pickupText = document.getElementById("pickupText");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// Função para mostrar Toast
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.remove("opacity-0");

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.classList.add("hidden"), 300); // Espera fade out
  }, 3000);
}

// --- Lógica do Modal ---
authorizeButton.addEventListener("click", () =>
  authorizeModal.classList.remove("hidden")
);
closeModalButton.addEventListener("click", () =>
  authorizeModal.classList.add("hidden")
);
modalBackdrop.addEventListener("click", () =>
  authorizeModal.classList.add("hidden")
);

authorizeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const personName = document.getElementById("personName").value;

  // CORREÇÃO: Feedback Visual
  showToast(`Autorizado para: ${personName}`);

  authorizeModal.classList.add("hidden");

  // Atualiza Botão
  authorizeButton.textContent = "Autorizado";
  authorizeButton.disabled = true;
  authorizeButton.classList.add("bg-gray-100", "text-gray-400");
  authorizeButton.classList.remove("bg-white", "text-gray-700");
});

// --- Lógica de Confirmação de Retirada ---
confirmButton.addEventListener("click", () => {
  packageStatusBadge.textContent = "Retirada";
  packageStatusBadge.classList.remove("bg-gray-800", "text-white");
  packageStatusBadge.classList.add("bg-gray-200", "text-gray-700");
  buttonContainer.classList.add("hidden");

  // Usar a data e hora atuais para uma simulação real.
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR");
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Usando "João Silva" como exemplo
  pickupText.textContent = `Retirada por João Silva em ${date} às ${time}`;
  pickupInfo.classList.remove("hidden");

  showToast("Encomenda marcada como retirada.");
});
