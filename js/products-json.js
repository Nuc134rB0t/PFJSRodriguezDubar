// fetch de json local
let carsList = document.querySelector('#superAutos');

fetch('../json/products.json')
.then((response) => response.json())
.then((content) => {
    //! Debugging
    console.log(`JSON:`, content);

    content.map((item) => {
        const dynamicHtmlContent = document.createElement('div');
        dynamicHtmlContent.innerHTML = `
        <h4>${item.description}</h4>
        <p>Código: ${item.id}</p>
        <p>Precio Neto: ${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <img src="${item.image}" alt="Foto de un super auto ${item.description}." max-height="100px" width="400px" /></img>
        `
        carsList.append(dynamicHtmlContent);
    });
});