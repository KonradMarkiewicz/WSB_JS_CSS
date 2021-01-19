function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {
    const valid = /^\d+([.,]\d{1,2})?$/.test(number);
    const input = document.querySelector("input[name='number']");

    if (valid) {
        input.className = "";
        const nameMessage = document.getElementById("number-input-message");

        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        input.className = "invalid";

        if (!document.getElementById("number-input-message")) {
            const small = document.createElement("small");
            small.id = "number-input-message";
            small.className = "invalid";
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba z maksymalnie dwoma cyframi po przecinku";

            input.parentElement.appendChild(small);
        }
    }

    return valid;
}

function validateRadio(radio) {
    const input = document.getElementsByName("favouriteNumber");

    if (radio !== undefined){
        input.className = "";
        const nameMessage = document.getElementById("radio-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        input.className = "invalid";

        if (!document.getElementById("radio-input-message")) {
            const small = document.createElement("small");
            small.id = "radio-input-message";
            small.className = "invalid";
            small.innerText = "\nNie wybrano żadnej z opcji";
            input[0].parentElement.appendChild(small);
      }
    }
    return true;
}

function validatePassword(password) {
    const valid = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(password);
    const input = document.querySelector("input[name='password']");

    if (valid) {
        input.className = "";
        const nameMessage = document.getElementById("password-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        input.className = "invalid";

        if (!document.getElementById("password-input-message")) {
            const small = document.createElement("small");
            small.id = "password-input-message";
            small.className = "invalid";
            small.innerText = "Hasło powinno zawierać co najmniej 8 znaków, co najmniej 1 cyfrę, co najmniej 1 wielką literę i co najmniej 1 małą literę ";
            input.parentElement.appendChild(small);
        }
    }
    return true;
}

function validateRepeatedPassword(password, repeatedPassword) {
    let valid = false;
    const input = document.querySelector("input[name='password2']");

    if (password === repeatedPassword) {
        valid = true;
        input.className = "";
        const nameMessage = document.getElementById("password2-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        input.className = "invalid";

        if (!document.getElementById("password2-input-message")) {
            const small = document.createElement("small");
            small.id = "password2-input-message";
            small.className = "invalid";
            small.innerText = "Podane hasło jest różne od podanego w polu 'Hasło'";
            input.parentElement.appendChild(small);
        }
    }
    return valid;
}