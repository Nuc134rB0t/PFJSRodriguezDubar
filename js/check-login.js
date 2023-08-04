// Verificar si el usuario ha iniciado sesión
function checkLoginStatus() {
    const sessionStarted = localStorage.getItem('sessionStarted');
    const currentPage = window.location.pathname;

    // Si no hay una marca de sesión en el localStorage y el usuario intenta acceder a uwu.html directamente, redirigir al formulario de inicio de sesión.
    if (!sessionStarted && currentPage.includes('/pages/uwu.html')) {
        window.location.href = '../index.html';
    }

    // Si hay una marca de sesión en el localStorage y el usuario intenta acceder a uwu.html directamente, permitir el acceso a la página.
    if (sessionStarted && currentPage.includes('/pages/uwu.html')) {
        return;
    }

    // Si hay una marca de sesión en el localStorage y el usuario intenta acceder a index.html directamente, redirigir a uwu.html si ha iniciado sesión.
    if (sessionStarted && currentPage.includes('/index.html')) {
        window.location.href = './pages/uwu.html';
    }
    // Si no se cumple ninguna de las condiciones anteriores, redirigir al formulario de inicio de sesión.
    window.location.href = '../index.html';
};

// Cerrar la sesión
function handleLogout() {
    localStorage.removeItem('sessionStarted'); // Eliminar la marca de sesión en el localStorage
    window.location.href = '../index.html'; // Redireccionar al formulario de inicio de sesión (index.html)
};

// Agregar el evento de clic al botón "Salir" si no se ha agregado previamente
document.getElementById('session-toggle').addEventListener('click', function () {
    handleLogout();
});


// Llamar a la función para verificar el estado del inicio de sesión al cargar la página.
checkLoginStatus();