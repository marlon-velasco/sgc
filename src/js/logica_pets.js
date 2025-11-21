// --- Elementos do Modal de Cadastro ---
const openCadastrarPetModal = document.getElementById("openCadastrarPetModal");
const cadastrarPetModal = document.getElementById("cadastrarPetModal");
const closeCadastrarPetModal = document.getElementById(
  "closeCadastrarPetModal"
);
const petRegistrationForm = document.getElementById("petRegistrationForm");

openCadastrarPetModal.addEventListener("click", () => {
  cadastrarPetModal.classList.remove("hidden");
});

closeCadastrarPetModal.addEventListener("click", () => {
  cadastrarPetModal.classList.add("hidden");
});

// Simular envio do formulário de cadastro
petRegistrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Novo Pet Cadastrado:", {
    name: document.getElementById("petName").value,
    species: document.getElementById("species").value,
    breed: document.getElementById("breed").value,
    color: document.getElementById("color").value,
    description: document.getElementById("description").value,
  });
  cadastrarPetModal.classList.add("hidden");
  // Limpar formulário
  petRegistrationForm.reset();
});

// --- Elementos do Modal Pet Encontrado ---
const openPetFoundModal = document.getElementById("openPetFoundModal");
const petFoundModal = document.getElementById("petFoundModal");
const closePetFoundModal = document.getElementById("closePetFoundModal");
const confirmFoundAlertButton = document.getElementById(
  "confirmFoundAlertButton"
);
const cancelFoundButton = document.getElementById("cancelFoundButton");

openPetFoundModal.addEventListener("click", () => {
  petFoundModal.classList.remove("hidden");
});

closePetFoundModal.addEventListener("click", () => {
  petFoundModal.classList.add("hidden");
});

cancelFoundButton.addEventListener("click", () => {
  petFoundModal.classList.add("hidden");
});

confirmFoundAlertButton.addEventListener("click", () => {
  console.log(`ALERTA DE PET ENCONTRADO ENVIADO! Pet: Mimi, Dono: Ana Costa`);
  petFoundModal.classList.add("hidden");
});

// --- Simular a lógica de Marcar como Encontrado/Perdido ---
const markFoundButton = document.getElementById("markFoundButton");
const myPetCardRex = document.getElementById("myPetCardRex");
const myPetStatusTag = document.getElementById("myPetStatusTag");
const lostSinceLine = document.getElementById("lostSinceLine");
const lostPetCount = document.getElementById("lostPetCount");

let isRexLost = true;

markFoundButton.addEventListener("click", () => {
  if (isRexLost) {
    // Mudar estado para SEGURO
    myPetStatusTag.textContent = "Seguro";
    myPetStatusTag.classList.remove("bg-red-600");
    myPetStatusTag.classList.add("bg-green-600");

    lostSinceLine.classList.add("hidden");

    markFoundButton.textContent = "Marcar como Perdido";
    markFoundButton.classList.remove(
      "bg-green-600",
      "text-white",
      "hover:bg-green-700"
    );
    markFoundButton.classList.add(
      "bg-red-600",
      "text-white",
      "hover:bg-red-700"
    );

    isRexLost = false;

    // Atualiza contagem de pets perdidos no alerta
    const newCount = parseInt(lostPetCount.textContent) - 1;
    lostPetCount.textContent = newCount;
    if (newCount === 0) {
      document.getElementById("lostPetsAlert").classList.add("hidden");
    }

    console.log("Pet Rex marcado como ENCONTRADO.");
  } else {
    // Mudar estado para PERDIDO
    myPetStatusTag.textContent = "Perdido";
    myPetStatusTag.classList.remove("bg-green-600");
    myPetStatusTag.classList.add("bg-red-600");

    lostSinceLine.classList.remove("hidden");

    markFoundButton.textContent = "Marcar como Encontrado";
    markFoundButton.classList.remove(
      "bg-red-600",
      "text-white",
      "hover:bg-red-700"
    );
    markFoundButton.classList.add(
      "bg-green-600",
      "text-white",
      "hover:bg-green-700"
    );

    isRexLost = true;

    // Atualiza contagem de pets perdidos no alerta
    const newCount = parseInt(lostPetCount.textContent) + 1;
    lostPetCount.textContent = newCount;
    document.getElementById("lostPetsAlert").classList.remove("hidden");

    console.log("Pet Rex marcado como PERDIDO.");
  }
});
