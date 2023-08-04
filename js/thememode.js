// Consulta cúal es el tema preferido guardado en el LocalStorage
function getUserPreference() {
    return localStorage.getItem('theme') || 'system';
};

// Guarda la preferencia del usuario
function saveUserPreference(userPreference) {
    localStorage.setItem('theme', userPreference);
};

// Obtiene el tema preferido
function getAppliedMode(userPreference) {
    if (userPreference === 'light') {
        return 'light';
    }
    if (userPreference === 'dark') {
        return 'dark';
    }
    if (matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
};

// Aplica el modo del tema en la etiqueta html
function setAppliedMode(mode) {
    document.documentElement.dataset.appliedMode = mode;
};

// Rota entre el próximo de los 3 modos disponibles: Claro, Oscuro, Sistema
function rotatePreferences(userPreference) {
    if (userPreference === 'system') {
        return 'light'
    }
    if (userPreference === 'light') {
        return 'dark';
    }
    if (userPreference === 'dark') {
        return 'system';
    }
    // Protección en caso de algún valor invalido
    return 'system';
};

// Llama el span del botón para cambiar su texto
const themeDisplay = document.getElementById('mode');
// Llama al botón que cambia el tema para aplicar el evento onclick
const themeToggler = document.getElementById('theme-toggle');

let userPreference = getUserPreference();
setAppliedMode(getAppliedMode(userPreference));
// Mantiene el emoji del botón en español al cargar el sitio
if (userPreference === 'system') {
    themeDisplay.innerText = '🖥️';
} else if (userPreference === 'dark') {
    themeDisplay.innerText = '🌛';
} else {
    themeDisplay.innerText = '🌞';
};

// Aplica evento al botón que cambia el tema
themeToggler.onclick = () => {
    const newUserPref = rotatePreferences(userPreference);
    userPreference = newUserPref;
    saveUserPreference(newUserPref);
    setAppliedMode(getAppliedMode(newUserPref));
    // Mantiene el emoji del botón en español al rotar de tema
    if (newUserPref === 'system') {
        themeDisplay.innerText = '🖥️';
    } else if (newUserPref === 'dark') {
        themeDisplay.innerText = '🌛';
    } else {
        themeDisplay.innerText = '🌞';
    }
};