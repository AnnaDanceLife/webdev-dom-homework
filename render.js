import { comments } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { initReplyToCommentListeners } from "./main.js";
import { initEditCommentListeners } from "./main.js";
import { initCountLikesListeners } from "./main.js";
import { handlePostClick } from "./api.js";


export const renderComments = (isInitionalLoading, user) => {
  const app = document.getElementById('app');
  const commentsHtml = comments.
    map((comment, index) => {
      return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>
          ${comment.author.name}
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

  const appHtml = `
  <div class="container">
      <ul id="comments" class="comments">
        ${isInitionalLoading
      ? '<div class="loading">Комментарии загружаются...</div>'
      : commentsHtml
    }
      </ul>
      ${user
      ? `
          <div id="form" class="add-form">
            <input id="add-form-name" type="text" class="add-form-name" value="${user.name}" disabled/>
            <textarea id="add-form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
            <div class="add-form-row">
              <button id="add-form-button" class="add-form-button">Написать</button>
            </div>
          </div>`
      : `
      <div class="form-loading" style="margin-top: 20px">
      Чтобы добавить комментарий, <a href='#' id="go-to-login">авторизуйтесь</a>
      </div>`
    }
</div>`

  app.innerHTML = appHtml;
  const goToLogin = document.getElementById('go-to-login');

  if (!user) {
    goToLogin.addEventListener('click', (event) => {
      event.preventDefault();
      renderLogin();
    })
  }

  if (user) {
    const buttonElement = document.getElementById('add-form-button');

    buttonElement.addEventListener('click', () => {
      const textAreaElement = document.getElementById('add-form-text');
      textAreaElement.classList.remove('error');

      if (textAreaElement.value.trim() === '') {
        return textAreaElement.classList.add('error');
      } else {
        handlePostClick().then((response) => {
          renderComments(response.user)
        });
      }
    });
  }

  initCountLikesListeners();
  initEditCommentListeners();
  initReplyToCommentListeners();
};
