const form = document.forms.form;

function isValidForm() {
    const inputs = document.querySelectorAll(".form__input");
    const errors = document.querySelectorAll(".error-message");
    let errorsCount = 0;
    for(let i = 0; i < inputs.length - 1; i++) {
        if(inputs[i].value === "" || (inputs[i].name === "selectProfession" && inputs[i].value === "Выберите профессию")) {
			inputs[i].classList.add("error");
            errors[i].textContent = "Обязательное поле";
            errorsCount += 1;
        } else if(inputs[i].name === "password") {
            const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if(!regExp.test(inputs[i].value)) {
                inputs[i].classList.add("error");
                errors[i].textContent = "Неправильный ввод";
                errorsCount += 1;
            } else {
                inputs[i].classList.remove("error");
                errors[i].textContent = "";
            }
        } else if(inputs[i].name === "passwordRepeat") {
            if(inputs[i].value !== inputs[i - 1].value) {
                inputs[i].classList.add("error");
                errors[i].textContent = "Пароль не соответствует предыдущему";
                errorsCount += 1;
            } else {
                inputs[i].classList.remove("error");
                errors[i].textContent = "";
            }
        } else if (!inputs[i].validity.valid) {
			inputs[i].classList.add("error");
            errors[i].textContent = "Неправильный ввод";
            errorsCount += 1;
		} else {
            inputs[i].classList.remove("error");
            errors[i].textContent = "";
        }
	};
    if (!inputs[inputs.length - 1].validity.valid) {
        inputs[inputs.length - 1].classList.add("error");
        errors[inputs.length - 1].textContent = "Ошибка";
        errorsCount += 1;
    } else {
        inputs[inputs.length - 1].classList.remove("error");
        errors[inputs.length - 1].textContent = "";
    }
    if(errorsCount <= 0) {
        return true;
    } else {
        return false;
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if(isValidForm()) {
        const answers = document.querySelectorAll(".printInConsole");
        answers.forEach(function (answer) {
            if(answer.name === "genderInput") {
                if(answer.checked) {
                    console.log("Мужской пол");
                } else if(document.getElementById("radioFemale").checked) {
                    console.log("Женский пол");
                } else {
                    console.log("Неопределенный пол");
                }
            } else if(answer.name === "checkbox"){
                console.log(answer.checked);
            } else {
                console.log(answer.value);
            }
        });
        form.reset()
    }
});
