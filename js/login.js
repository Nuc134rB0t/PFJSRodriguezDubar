// Muestra el formulario de inicio de sesión y ocultar el de registro
function showLoginForm() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('registerContainer').style.display = 'none';
};

// Muestra el formulario de registro y ocultar el de inicio de sesión
function showRegisterForm() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
}

// Maneja el evento de inicio de sesión
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si el usuario existe en el localStorage
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        // Crea una marca de sesión exitosa en el localStorage
        localStorage.setItem('sessionStarted', 'true');
        // Redirecciona al usuario a uwu.html
        window.location.href = './pages/uwu.html';
    } else {
        // Mostrar SweetAlert con mensaje de error
        Swal.fire({
            title: 'Credenciales inválidas',
            text: 'Por favor, inténtalo nuevamente.',
            icon: 'error',
        });
    }
}

// Manejar el evento de registro
function handleRegistration(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si el usuario ya existe en el localStorage
    const existingUser = users.find((u) => u.username === newUsername);
    if (existingUser) {
        // Mostrar SweetAlert con mensaje de error
        Swal.fire({
            title: 'El nombre de usuario ya está en uso',
            text: 'Por favor, elige otro.',
            icon: 'error',
        });
    } else {
        // Registra el nuevo usuario
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        // Mostrar SweetAlert con mensaje de éxito
        Swal.fire({
            title: 'Registro exitoso',
            text: 'El nuevo usuario: ' + newUsername + ' ha sido registrado!',
            icon: 'success',
        });
        // Mmuestra el formulario de inicio de sesión después de registrarse
        showLoginForm();
    }
}

// Asigna los manejadores de eventos a los formularios y enlaces
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegistration);
document.getElementById('goToRegister').addEventListener('click', showRegisterForm);
document.getElementById('goToLogin').addEventListener('click', showLoginForm);

// Muestra el formulario de inicio de sesión al cargar la página
showLoginForm();