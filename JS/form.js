const formulario = document.getElementById("formulario"); //acceso al form
//coloca #formulario porque trabaja con el id
const inputs = document.querySelectorAll("#formulario input") //All arregla todos los inputs

//OBJETO llamados expresiones que dentro contiene propiedades
//nos permiten usar las expresiones regulares especificadas
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //letras y espacios, pueden llevar acento
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/,
    pais: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    telefono: /^\d{7,14}$/, //7 a 14 numeros
    mensaje: /^[a-zA-ZÀ-ÿ0-9.,\s]{1,200}$/
}

/*SI APLICAMOS ESTO SABREMOS DONDE ESTAMOS POSICIONADOS EN EL FORM
const validarFormulario = (e) => {
    console.log(e.target.name);
}
*/

//OBJETOS CON VALORES
const campos = {
    nombre: false,
    correo: false,
    pais: false,
    telefono: false,
    mensaje: false
}

const validarFormulario = (e) => {
    switch (e.target.name) { //Recorre por los name
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;

        case "pais":
            validarCampo(expresiones.pais, e.target, "pais");
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
            break;

        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, "mensaje");
            break;
    }
}

//FUNCION REUTILIZABLE PARA HABILITAR CAMPOS
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) { //si la expresion es cierta, hace esto
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-check");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-xmark");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-xmark");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-check");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

//TRABAJANDO CON EL BOTON ENVIAR
//preventDefault es para evitar que se envie dando click en Enviar
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //parametro e, de elemento...Se utiliza para que no cambie el ur
    //SI TODO ES CORRECTO
    if (campos.nombre && campos.correo && campos.pais && campos.telefono && campos.mensaje) {
        formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            //TIMER PARA QUE SE BORRE EL MSJ
        }, 4000);
        document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario__grupo-correcto");
        });
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});