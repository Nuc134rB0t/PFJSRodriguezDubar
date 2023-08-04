/* API: precio de cripto monedas */

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Cdogecoin&vs_currencies=usd%2Cclp%2Cars';
const cryptoCard = document.querySelector('#cryptoCard');


const fetchCrypto = async () => {
  
  let display = cryptoCard.style.display;

  // Controla si se hace el llamado a la API para mostrar el precio de las criptomonedas o si solo se ocultan
  if (display === 'none') {
    try {
      cryptoCardDisplay();
      const response = await fetch(apiUrl);
      const content = await response.json();
      //! Debugging
      console.log(content);
  
      // Limpiar el contenido existente de cryptoCard
      cryptoCard.innerHTML = '';
  
      // Recorrer el diccionario de datos (content) y mostrar cada criptomoneda en el HTML
      for (const cryptoCurrency in content) {
        if (content.hasOwnProperty(cryptoCurrency)) {
          const cryptoPrice = content[cryptoCurrency];
          const name = toTitleCase(cryptoCurrency); // Función para convertir el nombre a título
          const priceUSD = cryptoPrice.usd.toLocaleString();
          const priceCLP = cryptoPrice.clp.toLocaleString();
          const priceARS = cryptoPrice.ars.toLocaleString();
  
          const dynamicHtmlContent = document.createElement('div');
          dynamicHtmlContent.setAttribute('data-aos', 'fade-up-left'); //TodO
          dynamicHtmlContent.className = "card";
          dynamicHtmlContent.style.width = "140px";
          dynamicHtmlContent.style.height = "80px";
          dynamicHtmlContent.innerHTML = `
            <div class="card-bodyCustom">
              <h5 class="card-titleCustom" id="assetTitle">${cryptoCurrency.toUpperCase()}</h5>
              <p class="card-textCustom" id="assetUsdt">USD: ${priceUSD}</p>
              <p class="card-textCustom" id="assetClp">CLP: ${priceCLP}</p>
              <p class="card-textCustom" id="assetArs">ARS: ${priceARS}</p>
              <p class="card-textCustom"><small>Hoy: ${getCurrentDateTime()}</small></p>
            </div>
          `;
  
          cryptoCard.appendChild(dynamicHtmlContent);
  
        }
      }
    } catch (err) {
      console.error(err);
    }
  } else if (display === 'flex') {
    // Eliminar los div del dynamicHtmlContent
    while (cryptoCard.firstChild) {
      cryptoCard.removeChild(cryptoCard.firstChild);
    }
    cryptoCardDisplay();
  } else {
    alert('Hubo un problema con esta funcionalidad. Intente de nuevo.');
  }
};

// Función para convertir el nombre a título (ejemplo: bitcoin -> Bitcoin)
function toTitleCase(str) {
  return str.replace(/\b\w+/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

// Función para obtener la fecha y hora actual en formato "DD-MM-YYYY HH:MM:SS" usando la Librería LuxonJS
function getCurrentDateTime() {
  const now = luxon.DateTime.local();
  return now.toFormat('dd-MM-yyyy HH:mm:ss');
};

// Ejecuta el llamado a la API
const arrowButton = document.querySelector('#arrowButton');
arrowButton.addEventListener('click', () => {
  fetchCrypto();
});

// Muestra u oculta el precio de la criptomonedas
function cryptoCardDisplay() {
  cryptoCard.style.display = cryptoCard.style.display === 'none' ? 'flex' : 'none';
};

cryptoCardDisplay();