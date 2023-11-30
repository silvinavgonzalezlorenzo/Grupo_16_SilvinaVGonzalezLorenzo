// Reemplazo de 'YOUR_MERRIAM_WEBSTER_API_KEY' por mi acceso a la API key (pública) desde .env
const apiKey = process.env.REACT_APP_API_KEY;

const definitionContainer = document.getElementById("definitionContainer");

document.addEventListener("DOMContentLoaded", function () {
  const word = "algorithm"; // Sostenible: así podré cambiar la palabra cada vez que quiera
  definitionContainer.innerHTML = `<p style="font-weight: bold; font-size: 18px;">from The Merriam-Webster Dictionary API: ${word}</p>`;

  // Demorar la visibilidad del fetch en 5000 milisegundos=5s
  setTimeout(() => {
    fetchWordDefinition(word);
  }, 5000);
});
// Función para realizar la solicitud a la API
async function fetchWordDefinition(word) {
  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${encodeURIComponent(
    word
  )}?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    console.log(data); // Para hacer "debugging"

    handleApiResponse(data);
  } catch (error) {
    displayError();
  }
}

// Función para manejar la respuesta de la API
function handleApiResponse(data) {
  if (Array.isArray(data) && data.length > 0 && data[0].shortdef) {
    if (Array.isArray(data[0].shortdef)) {
      const definition = data[0].shortdef.join(", ");
      displayDefinition(definition);
    } else {
      displayError();
    }
  } else {
    displayError();
  }
}

// Función para mostrar la definición al usuario
function displayDefinition(definition) {
  // Mostrar la definición
  definitionContainer.innerHTML += `<p>(noun, British English) ${definition}</p>`;
}

// Función para mostrar mensajes de error al usuario
function displayError() {
  // Mostrar un mensaje genérico en caso de error
  definitionContainer.innerHTML += "<p>Definición no disponible.</p>";
}
