// api.js

// Reemplazo de YOUR_MERRIAM_WEBSTER_API_KEY' por mi API key
const apiKey = '691f973f-6746-45f7-9c56-751e8543fe7c';

// Función para presentar la solicitud a la API
async function fetchWordDefinition(word) {
    // Construcción de la URL de la API con palabra y clave
  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

  // El binomio try-catch maneja los errores de la API
  // Try devuelve data, que puede dar error (potencialmente). Sin error, se resuelve en "try"
  try {
    const response = await fetch(apiUrl); // Solicitud a la API
    const data = await response.json(); // Conversión de respuesta a JSON

    // Manejo de los datos de la respuesta de la API con:
    //console.log(data); --lo usaría para debugging, pero es más privado así (porque esta API es pública)
    handleApiResponse(data); 
    // Paso si el potencial error ocurre, manejo de errores en la consola
  } catch (error) {
    console.error('Error al obtener los datos:', error);

    // Llamado a la función para mostrar mensaje de error al usuario
    displayError();
  }
}

// Función para manejar la respuesta de la API
function handleApiResponse(data) {
    // Verificación si la respuesta contiene datos y la estructura necesaria
    //Para saber si es un array, >0  o tiene otro error 
  if (Array.isArray(data) && data.length > 0 && data[0].shortdef) {
       //Verificar si shortdef es un array
    if (Array.isArray(data[0].shortdef)) {
        // Obtener la información relevante de la respuesta
        const definition = data[0].shortdef.join(', ');
  
        // Llamar a la función para mostrar la información al usuario
      displayDefinition(definition);
    } else {
      // En caso de una respuesta vacía, mostrar un mensaje al usuario
      displayError('El formato de la respuesta no es el esperado.');
    }
 } else {
    // En caso de respuesta vacía o con estructura incorrecta, muestra mensaje al usuario
   displayError('No hay información para la palabra que buscas.');
 }
}
  
  // Función para mostrar la definición al usuario
  function displayDefinition(definition) {
    // Función para contactar con el usuario 
    console.log('La definición es:', definition);
  }
  
  // Función para mostrar mensajes de error al usuario
  function displayError(message = '¡Error! Vuelve a intentarlo.') {
    // Aquí puedes utilizar tu lógica para mostrar mensajes de error en tu interfaz de usuario
    console.error('Error:', message);
  }
  


  // Ejemplo: Llamar a la función con una palabra
  fetchWordDefinition('ejemplo');

