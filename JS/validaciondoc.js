//------Validación formulario doctores------ 

const formulariodoc = document.getElementById('formsdoc')
const inputs = document.querySelectorAll('#formsdoc input')

const expreregdoc = {
    nombredoc: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    apellidodoc: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    ceduladoc: /^[\d]{7,10}$/,
    consultoriodoc: /^[\d]{3,5}$/,
    emaildoc: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombredoc: false,
    apellidodoc: false,
    ceduladoc: false,
    consultoriodoc: false,
    emaildoc: false
}

const ValFormdoc = (e) => {
    switch (e.target.name){
        case "nombredoc":
            ValidarCampo(expreregdoc.nombredoc, e.target,'nombredoc')
        break;
        case "apellidodoc":
            ValidarCampo(expreregdoc.apellidodoc, e.target,'apellidodoc')
        break;
        case "ceduladoc":
            ValidarCampo(expreregdoc.ceduladoc, e.target,'ceduladoc')
        break;
        case "consultoriodoc":
            ValidarCampo(expreregdoc.consultoriodoc, e.target,'consultoriodoc')
        break;
        case "emaildoc":
            ValidarCampo(expreregdoc.emaildoc, e.target,'emaildoc')
        break;
    }
}

const ValidarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campo} .forminputerror`).classList.remove('forminputerror-activo')
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campo} .forminputerror`).classList.add('forminputerror-activo')
        campos[campo] = false;
    }

}


inputs.forEach((input) => {
    input.addEventListener('keyup', ValFormdoc)
    input.addEventListener('blur', ValFormdoc)
})

let InfosDoctores = []

const procesatododoc = (e) => {
    e.preventDefault();

    if(campos.nombredoc && campos.apellidodoc && campos.ceduladoc && campos.consultoriodoc && campos.emaildoc){

        let InfoDoctores = {
            id: Date.now,
            Nombredoc: document.getElementById('nombredoc').value,
            Apellidodoc: document.getElementById('apellidodoc').value,
            Ceduladoc: document.getElementById('ceduladoc').value,
            Especialidaddoc: document.getElementById('especialidaddoc').value,
            Consultoriodoc: document.getElementById('consultoriodoc').value,
            Emaildoc: document.getElementById('emaildoc').value
        }
        InfosDoctores.push(InfoDoctores);
        tablaDoctores()

        document.querySelector('#formsdoc').reset();
        document.getElementById('formmensexitodocp').classList.add('formmensexito-activo')
        setTimeout(() => {
            document.getElementById('formmensexitodocp').classList.remove('formmensexito-activo');
        }, 5000);

        document.querySelectorAll('.formulariogrupo-correcto').forEach((icono) => {
            icono.classList.remove('formulariogrupo-correcto');
        });
    } else {
        document.getElementById('formmessagedoc').classList.add('formmessage-activo');
    }
}
function tablaDoctores(){
    const Tabladoctores = document.getElementById("Tabladoctores")
    const tbody = Tabladoctores.querySelector("tbody")
    Tabladoctores.innerHTML = "<thead><tr><th>Nombre</th><th>Apellido</th><th>Cedula</th><th>Especialidad</th><th>Consultorio</th><th>Email</th></tr></thead>"
    
    InfosDoctores.forEach((InfoDoctores) =>{
        //crear la tupla o fila
        const tupla = Tabladoctores.insertRow(-1) //0 -1 orden de agregación
        //crear los campos
        const nombreDoctor = document.createElement("td")
        const apellidoDoctor = document.createElement("td")
        const cedulaDoctor = document.createElement("td")
        const especialidadDoctor = document.createElement("td")
        const consultorioDoctor = document.createElement("td")
        const emailDoctor = document.createElement("td")
        //agregar los valores a cada campo
        nombreDoctor.textContent = InfoDoctores.Nombredoc
        apellidoDoctor.textContent = InfoDoctores.Apellidodoc
        cedulaDoctor.textContent = InfoDoctores.Ceduladoc
        especialidadDoctor.textContent = InfoDoctores.Especialidaddoc
        consultorioDoctor.textContent = InfoDoctores.Consultoriodoc
        emailDoctor.textContent = InfoDoctores.Emaildoc
        //agrgar los campos a la tupla
        tupla.appendChild(nombreDoctor)
        tupla.appendChild(apellidoDoctor)
        tupla.appendChild(cedulaDoctor)
        tupla.appendChild(especialidadDoctor)
        tupla.appendChild(consultorioDoctor)
        tupla.appendChild(emailDoctor)
    })
}

formulariodoc.addEventListener('submit', procesatododoc)















