const showPasswordButton = document.querySelector(".form-field__show-password");
const hidePasswordButton = document.querySelector(".form-field__hide-password");

showPasswordButton.addEventListener(
    "click",
    () => {
        showPasswordButton.classList.add("form-field__show-password-replace");
        hidePasswordButton.classList.add("form-field__hide-password-replace");
        document.querySelector(".form-field__password").type = "text";
    }
)

hidePasswordButton.addEventListener(
    "click",
    () => {
        showPasswordButton.classList.remove("form-field__show-password-replace");
        hidePasswordButton.classList.remove("form-field__hide-password-replace");
        document.querySelector(".form-field__password").type = "password";
    }
)