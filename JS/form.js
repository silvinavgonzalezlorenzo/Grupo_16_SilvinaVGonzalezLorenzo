document.addEventListener('DOMContentLoaded', function () {
    // Para traer el formulario por su ID
    const formulario = document.getElementById('formulario');
  
    // Para obtener los elementos de los grupos
    const grupoNombre = document.getElementById('grupo__nombre');
    const grupoCorreo = document.getElementById('grupo__correo');
    const grupoPais = document.getElementById('grupo__pais');
    const grupoTelefono = document.getElementById('grupo__telefono');
    const grupoMensaje = document.getElementById('grupo__mensaje');
  
    // Para obtener los inputs de los grupos
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputPais = document.getElementById('pais');
    const inputTelefono = document.getElementById('telefono');
    const inputMensaje = document.getElementById('mensaje');
  
    // Expresiones "regulares" para hacer las validaciones
    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios (pueden llevar acentos)
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      pais: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios (pueden llevar acentos)
      telefono: /^\+?\d{7,14}$/, // El teléfono puede empezar con +
      mensaje: /^[a-zA-ZÀ-ÿ\s\d.,!?¡¿()-]*$/ // Letras, espacios, números y algunos signos de puntuación
    };
  
    // Funciones de validación
    const validarCampo = (expresion, input, grupo) => {
      if (expresion.test(input.value)) {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        // Oculta el mensaje de error
        grupo.querySelector('.formulario__input-error').classList.remove('formulario__input-error-activo');
        // Cambia el borde a verde
        input.style.border = '3px solid rgb(8, 255, 8)';
      } else {
        grupo.classList.remove('formulario__grupo-correcto');
        grupo.classList.add('formulario__grupo-incorrecto');
        // Muestra el mensaje de error
        grupo.querySelector('.formulario__input-error').classList.add('formulario__input-error-activo');
        // Cambia el borde a transparente
        input.style.border = '3px solid transparent';
      }
    };
  
    // Para validar los campos al escribir
    const validarFormulario = () => {
      validarCampo(expresiones.nombre, inputNombre, grupoNombre);
      validarCampo(expresiones.correo, inputCorreo, grupoCorreo);
      validarCampo(expresiones.pais, inputPais, grupoPais);
      validarCampo(expresiones.telefono, inputTelefono, grupoTelefono);
      validarCampo(expresiones.mensaje, inputMensaje, grupoMensaje);
    };
  
    // Para mostrar el mensaje de éxito
    const mostrarMensajeExito = () => {
      const mensajeExito = document.getElementById('formulario__mensaje-exito');
      mensajeExito.innerHTML = '<span style="color: darkblue; font-size: 16px; font-weight: bold;">¡Formulario enviado con éxito!</span>';
      mensajeExito.classList.add('formulario__mensaje-exito-activo');
  
      setTimeout(() => {
        mensajeExito.classList.remove('formulario__mensaje-exito-activo');
        resetearEstilos();
      }, 8000);
    };
  
    // Para resetear los estilos de los campos
    const resetearEstilos = () => {
      const campos = [grupoNombre, grupoCorreo, grupoPais, grupoTelefono, grupoMensaje];
      campos.forEach((campo) => {
        campo.classList.remove('formulario__grupo-correcto');
        campo.classList.remove('formulario__grupo-incorrecto');
        campo.querySelector('.formulario__input-error').classList.remove('formulario__input-error-activo');
      });
      inputNombre.style.border = '1px solid #d1d1d1';
      inputCorreo.style.border = '1px solid #d1d1d1';
      inputPais.style.border = '1px solid #d1d1d1';
      inputTelefono.style.border = '1px solid #d1d1d1';
      inputMensaje.style.border = '1px solid #d1d1d1';
    };
  
    // Para validar el formulario al enviar
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      validarFormulario();
      //Para verificar que TODOS los campos estén correctos
      const camposCorrectos = [
        grupoNombre.classList.contains('formulario__grupo-correcto'),
        grupoCorreo.classList.contains('formulario__grupo-correcto'),
        grupoPais.classList.contains('formulario__grupo-correcto'),
        grupoTelefono.classList.contains('formulario__grupo-correcto'),
        grupoMensaje.classList.contains('formulario__grupo-correcto')
      ];
      //Avanza si está todo correcto
      if (camposCorrectos.every((campoCorrecto) => campoCorrecto)) {
        mostrarMensajeExito();
        formulario.reset();
      } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
          document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
        // Muestra la alerta
        alert('Error: Por favor revisa si completaste bien todos los campos.');
      }
    });
       
      // Para validar los campos al escribir
    inputNombre.addEventListener('input', validarFormulario);
    inputCorreo.addEventListener('input', validarFormulario);
    inputPais.addEventListener('input', validarFormulario);
    inputTelefono.addEventListener('input', validarFormulario);
    inputMensaje.addEventListener('input', validarFormulario);
  });
  