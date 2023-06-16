import { loginUser, registerUser } from "./api.js";

export function renderLoginComponent(appEl, commentsHtml) {
    let isLoginMode = true;
    const renderForm = () => {
        const appHtml = `
        <div class="container">
        <ul id="comments" class="comments">
        ${commentsHtml}
        </ul>
          <div class="add-form">
              <h3 class="title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
              ${isLoginMode
                ? ""
                : `
                <input type="text" class="add-form-name add-form-login" placeholder="Введите имя" id="name"/> <br>`
            }
                <input type="text" class="add-form-name add-form-login" placeholder="Введите логин" id="login"/> <br>
                <input type="password" class="add-form-name" placeholder="Введите пароль" id="password"/>
              <button id="auth-button" class="auth-button add-form-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
              <button id="toggle-button" class="add-form-button auth-button auth-toggle">Перейти ${isLoginMode ? "к регистрации" : "ко входу"}</button>
          </div>
        </div>`

        appEl.innerHTML = appHtml;

        const authButton = document.getElementById('auth-button');
        authButton.addEventListener('click', () => {
            if (isLoginMode) {
                const login = document.getElementById('login').value;
                const password = document.getElementById('password').value;
                if (!login) {
                    alert('Введите логин');
                    return;
                }
                if (!password) {
                    alert('Введите пароль');
                    return;
                }
                loginUser(login, password);
            } else {
                const name = document.getElementById('name').value;
                const login = document.getElementById('login').value;
                const password = document.getElementById('password').value;

                if (!name) {
                    alert('Введите имя');
                    return;
                }
                if (!login) {
                    alert('Введите логин');
                    return;
                }
                if (!password) {
                    alert('Введите пароль');
                    return;
                }
                registerUser(name, login, password);
            }
        });

        document.getElementById('toggle-button').addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm();
        })
    }
    renderForm();
}