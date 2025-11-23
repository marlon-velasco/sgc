document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email'); // Atualizado ID
    const emailError = document.getElementById('email-error');

    // 1. Lógica para mostrar/ocultar senha
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'password') {
            passwordIcon.classList.remove('fa-eye');
            passwordIcon.classList.add('fa-eye-slash');
        } else {
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        }
    });

    // 2. Validação e Redirecionamento
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Regex simples para validação de email
        // https://learn.microsoft.com/pt-br/dotnet/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Resetar erros
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');

        let isValid = true;

        // Valida E-mail
        if (!emailPattern.test(emailValue)) {
            emailError.classList.remove('hidden');
            emailInput.classList.add('border-red-500');
            isValid = false;
        }

        // Valida Senha (exemplo simples: não vazia)
        if (passwordValue === '') {
            alert("A senha é obrigatória.");
            isValid = false;
        }

        if (isValid) {
            // Simula persistência de sessão básica
            localStorage.setItem('user_session', JSON.stringify({ email: emailValue, loggedIn: true }));
            window.location.href = 'dashboard.html';
        }
    });
});