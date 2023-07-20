//------Validación formulario pacientes------ 

const formulariopac = document.getElementById('formspac')
const inputspac = document.querySelectorAll('#formspac input')

const expreregpac = {
    nombrepac: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    apellidopac: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    cedulapac: /^[\d]{7,10}$/,
    edadpac: /^[\d]{1,3}$/,
    telefonopac: /^\d{7,14}$/,
}

const campospac = {
    nombrepac: false,
    apellidopac: false,
    cedulapac: false,
    edadpac: false,
    telefonopac: false
}

const ValFormpac = (e) => {
    switch (e.target.name){
        case "nombrepac":
            ValidarCampopac(expreregpac.nombrepac, e.target,'nombrepac')
        break;
        case "apellidopac":
            ValidarCampopac(expreregpac.apellidopac, e.target,'apellidopac')
        break;
        case "cedulapac":
            ValidarCampopac(expreregpac.cedulapac, e.target,'cedulapac')
        break;
        case "edadpac":
            ValidarCampopac(expreregpac.edadpac, e.target,'edadpac')
        break;
        case "telefonopac":
            ValidarCampopac(expreregpac.telefonopac, e.target,'telefonopac')
        break;
    }
}

const ValidarCampopac = (expresionpac, inputpac, campopac) => {
    if (expresionpac.test(inputpac.value)){
        document.getElementById(`grupo__${campopac}`).classList.remove('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campopac}`).classList.add('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campopac} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campopac} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campopac} .forminputerror`).classList.remove('forminputerror-activo')
        campospac[campopac] = true;
    } else {
        document.getElementById(`grupo__${campopac}`).classList.add('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campopac}`).classList.remove('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campopac} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campopac} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campopac} .forminputerror`).classList.add('forminputerror-activo')
        campospac[campopac] = false;
    }

}



inputspac.forEach((input) => {
    input.addEventListener('keyup', ValFormpac)
    input.addEventListener('blur', ValFormpac)
})

let InfosPacientes = []

const procesatodo = (e) => {
    e.preventDefault();

    if(campospac.nombrepac && campospac.apellidopac && campospac.cedulapac && campospac.edadpac && campospac.telefonopac){

        let InfoPacientes = {
            id: Date.now,
            Nombrepac: document.getElementById('nombrepac').value,
            Apellidopac: document.getElementById('apellidopac').value,
            Cedulapac: document.getElementById('cedulapac').value,
            Edadpac: document.getElementById('edadpac').value,
            Telefonopac: document.getElementById('telefonopac').value,
            Especialidadreque: document.getElementById('especialidadop').value
        }
        InfosPacientes.push(InfoPacientes);
        tablaPacientes()

        document.querySelector('#formspac').reset();

        document.getElementById('formmensexitopacp').classList.add('formmensexito-activo')
        setTimeout(() => {
            document.getElementById('formmensexitopacp').classList.remove('formmensexito-activo');
        }, 5000);

        document.querySelectorAll('.formulariogrupo-correcto').forEach((icono) => {
            icono.classList.remove('formulariogrupo-correcto');
        });
    } else {
            document.getElementById('formmessagepac').classList.add('formmessage-activo');
        }
    
}

function tablaPacientes(){
    const Tablapacientes = document.getElementById("Tablapacientes")
    const tbody = Tablapacientes.querySelector("tbody")
    Tablapacientes.innerHTML = "<thead><tr><th>Nombre</th><th>Apellido</th><th>Cedula</th><th>Edad</th><th>Telefono</th><th>Especialidad</th></tr></thead>"
    
    InfosPacientes.forEach((InfoPacientes) =>{
        //crear la tupla o fila
        const tupla = Tablapacientes.insertRow(-1) //0 -1 orden de agregación
        //crear los campos
        const nombrePaciente = document.createElement("td")
        const apellidoPaciente = document.createElement("td")
        const cedulaPaciente = document.createElement("td")
        const edadPaciente = document.createElement("td")
        const telefonoPaciente = document.createElement("td")
        const especialidadPaciente = document.createElement("td")
        //agregar los valores a cada campo
        nombrePaciente.textContent = InfoPacientes.Nombrepac
        apellidoPaciente.textContent = InfoPacientes.Apellidopac
        cedulaPaciente.textContent = InfoPacientes.Cedulapac
        edadPaciente.textContent = InfoPacientes.Edadpac
        telefonoPaciente.textContent = InfoPacientes.Telefonopac
        especialidadPaciente.textContent = InfoPacientes.Especialidadreque
        //agrgar los campos a la tupla
        tupla.appendChild(nombrePaciente)
        tupla.appendChild(apellidoPaciente)
        tupla.appendChild(cedulaPaciente)
        tupla.appendChild(edadPaciente)
        tupla.appendChild(telefonoPaciente)
        tupla.appendChild(especialidadPaciente)
    })
}

formulariopac.addEventListener('submit', procesatodo)