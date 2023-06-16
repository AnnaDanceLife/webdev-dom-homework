import { login } from "./api.js";

export function renderLoginComponent(appEl, commentsHtml) {
    const appHtml = `
<div class="container">
<ul id="comments" class="comments">
${commentsHtml}
</ul>
  <div class="add-form">
      <h3 class="title">Форма входа</h3>
          <input type="text" class="add-form-name add-form-login" placeholder="Введите логин" id="login"/> <br>
          <input type="password" class="add-form-name" placeholder="Введите пароль" id="password"/>
      <button id="auth-button" class="auth-button add-form-button">Войти</button>
      <button id="auth-toggle-button" class="add-form-button auth-button auth-toggle">Зарегистрироваться</button>
  </div>
  </div>`

    appEl.innerHTML = appHtml;

    const authButton = document.getElementById('auth-button');
    authButton.addEventListener('click', () => {
        login();
    })
}