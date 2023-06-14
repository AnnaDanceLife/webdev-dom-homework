import { comments } from "./api.js";
import { initReplyToCommentListeners } from "./main.js";
import { initEditCommentListeners } from "./main.js";
import { initCountLikesListeners } from "./main.js";
const commentsElement = document.getElementById('comments');


export const renderComments = () => {
  const appEl = document.getElementById('app');

    const commentsHtml = comments.
        map((comment, index) => {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>
            ${comment.author}
          </div>
          <div>
            ${comment.date}
          </div>
        </div>
        <div class="comment-body">
            ${comment.isEdit
                    ? `<textarea type="textarea" data-index=${index} class="textarea-text" rows="4">${comment.text}</textarea>`
                    : `<div class="comment-text" data-index="${index}">
              ${comment.text}
            </div>`
                }
        </div>
        <div class="comment-footer">
          <div>
            <button data-index="${index}" class="add-form-button edit-comment">
              ${comment.isEdit ? 'Сохранить' : 'Редактировать'}
            </button>
          </div>
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}">
            </button>
          </div>
        </div>
      </li>`;
        })
        .join('');


    const appHtml =`<div class="container">
    <div class="container">
      <div class="add-form">
          <h3 class="title">Форма входа</h3>
              <input type="text" class="add-form-name add-form-login" placeholder="Введите логин" id="login"/>
              <input type="password" class="add-form-name" placeholder="Введите пароль" id="password"/>
          <button id="auth-button" class="auth-button add-form-button">Войти</button>
          <button id="auth-toggle-button" class="add-form-button auth-button auth-toggle">Зарегистрироваться</button>
      </div>
   </div>
   
    <ul id="comments" class="comments">
      ${commentsHtml}
    </ul>
    <div>
      <button id="button-del" class="add-form-button">Удалить последний комментарий</button>
    </div>
    <div id="form" class="add-form">
      <input id="add-form-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="add-form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-form-button" class="add-form-button">Написать</button>
      </div>
    </div>
    <p class="add-comment" style="display: none;">Комментарий добавляется...</p>
  </div>`
  appEl.innerHTML = appHtml;

    initCountLikesListeners();
    initEditCommentListeners();
    initReplyToCommentListeners();
};
