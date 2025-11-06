document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    const loginForm = document.getElementById('login-form');

    // 1. Lógica para mostrar/ocultar senha
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Troca o ícone de olho
        if (type === 'password') {
            passwordIcon.classList.remove('fa-eye');
            passwordIcon.classList.add('fa-eye-slash');
        } else {
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        }
    });

    // 2. Lógica de redirecionamento (simulação de login)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Na simulação, qualquer login leva ao dashboard
        window.location.href = 'dashboard.html';
    });
});