// --- Chaves de Armazenamento ---
const KEY_REX_STATUS = 'sgc_pet_rex_lost'; // true ou false

// --- Elementos do Modal de Cadastro ---
const openCadastrarPetModal = document.getElementById("openCadastrarPetModal");
const cadastrarPetModal = document.getElementById("cadastrarPetModal");
const closeCadastrarPetModal = document.getElementById("closeCadastrarPetModal");
const petRegistrationForm = document.getElementById("petRegistrationForm");

openCadastrarPetModal.addEventListener("click", () => cadastrarPetModal.classList.remove("hidden"));
closeCadastrarPetModal.addEventListener("click", () => cadastrarPetModal.classList.add("hidden"));

petRegistrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pet cadastrado com sucesso! (Simulação)");
  cadastrarPetModal.classList.add("hidden");
  petRegistrationForm.reset();
});

// --- Elementos do Modal Pet Encontrado (Outros pets) ---
const openPetFoundModal = document.getElementById("openPetFoundModal");
const petFoundModal = document.getElementById("petFoundModal");
const closePetFoundModal = document.getElementById("closePetFoundModal");
const confirmFoundAlertButton = document.getElementById("confirmFoundAlertButton");
const cancelFoundButton = document.getElementById("cancelFoundButton");

if(openPetFoundModal) {
    openPetFoundModal.addEventListener("click", () => petFoundModal.classList.remove("hidden"));
}
closePetFoundModal.addEventListener("click", () => petFoundModal.classList.add("hidden"));
cancelFoundButton.addEventListener("click", () => petFoundModal.classList.add("hidden"));

confirmFoundAlertButton.addEventListener("click", () => {
  console.log(`ALERTA ENVIADO!`);
  petFoundModal.classList.add("hidden");
  // Esconder o card do Mimi se foi encontrado
  // document.getElementById("cardMimi").classList.add("hidden");
});

// --- Lógica de Estado (Persistência) para "Meus Pets" ---
const markFoundButton = document.getElementById("markFoundButton");
const myPetCardRex = document.getElementById("myPetCardRex");
const myPetStatusTag = document.getElementById("myPetStatusTag");
const lostSinceLine = document.getElementById("lostSinceLine");
const lostPetCount = document.getElementById("lostPetCount");
const lostPetsAlert = document.getElementById("lostPetsAlert");

// Função para atualizar a UI baseada no estado
function updateRexUI(isLost) {
    if (!isLost) {
        // Estado: SEGURO
        myPetStatusTag.textContent = "Seguro";
        myPetStatusTag.classList.remove("bg-red-600");
        myPetStatusTag.classList.add("bg-green-600");
        
        // Remove borda vermelha do card
        myPetCardRex.classList.remove("border-red-500");
        myPetCardRex.classList.add("border-green-500"); // feedback verde

        lostSinceLine.classList.add("hidden");

        markFoundButton.textContent = "Marcar como Perdido";
        markFoundButton.classList.remove("bg-green-600", "hover:bg-green-700");
        markFoundButton.classList.add("bg-red-600", "hover:bg-red-700");
        
    } else {
        // Estado: PERDIDO
        myPetStatusTag.textContent = "Perdido";
        myPetStatusTag.classList.remove("bg-green-600");
        myPetStatusTag.classList.add("bg-red-600");
        
        myPetCardRex.classList.add("border-red-500");
        myPetCardRex.classList.remove("border-green-500");

        lostSinceLine.classList.remove("hidden");

        markFoundButton.textContent = "Marcar como Encontrado";
        markFoundButton.classList.remove("bg-red-600", "hover:bg-red-700");
        markFoundButton.classList.add("bg-green-600", "hover:bg-green-700");
    }
    updateGlobalCount(isLost);
}

function updateGlobalCount(isRexLost) {
    // Lógica simplificada: Mimi (1) + Rex (1 se perdido)
    let count = 1; // Mimi está sempre perdida na simulação base
    if (isRexLost) count += 1;
    
    lostPetCount.textContent = count;
    if (count === 0) lostPetsAlert.classList.add("hidden");
    else lostPetsAlert.classList.remove("hidden");
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Lê do localStorage. Se não existir, assume 'false' (Seguro) ou 'true' (Perdido) conforme padrão desejado.
    // Vamos assumir que começa Seguro se não tiver dados.
    const storedStatus = localStorage.getItem(KEY_REX_STATUS);
    const isRexLost = storedStatus === 'true'; // Converte string para boolean
    
    updateRexUI(isRexLost);

    markFoundButton.addEventListener("click", () => {
        // Lê o estado atual, inverte e salva
        const currentStatus = localStorage.getItem(KEY_REX_STATUS) === 'true';
        const newStatus = !currentStatus;
        
        localStorage.setItem(KEY_REX_STATUS, newStatus);
        updateRexUI(newStatus);
    });
});