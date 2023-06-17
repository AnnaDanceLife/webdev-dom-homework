import { comments, token } from "./api.js";
import { initReplyToCommentListeners } from "./main.js";
import { initEditCommentListeners } from "./main.js";
import { initCountLikesListeners } from "./main.js";
import { handlePostClick } from "./api.js";
import { renderLoginComponent } from "./login-component.js";
import { getInitionalLoading } from "./api.js";
import { setUser } from "./api.js";
import { getPostComment } from "./api.js";
// import { deleteLastComment } from "./api.js";

export const renderApp = () => {
  const isInitionalLoading = getInitionalLoading();
  const isPostComment = getPostComment;
  let userApi = setUser();
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


  const appHtml = `
  <div class="container">
    <ul id="comments" class="comments">
  ${isInitionalLoading
      ? `<p class="add-comment" >Комментарии загружаются</p>`
      : commentsHtml}
    </ul>
  ${token
      ? `
    <div>
      <button id="button-del" class="add-form-button">Удалить последний комментарий</button>
    </div>
    ${isPostComment
        ? `<p class="add-comment" >Комментарий добавляется</p>`
        :
        `<div id="form" class="add-form">
          <input id="add-form-name" type="text" class="add-form-name" value="${userApi.user.name}" disabled/>
          <textarea id="add-form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
          rows="4"></textarea>
          <div class="add-form-row">
            <button id="add-form-button" class="add-form-button">Написать</button>
          </div>
        </div>`}`
      : `
    <div class="form-loading" style="margin-top: 20px">
    Чтобы добавить комментарий, <a href='#' id="go-to-login">авторизуйтесь</a>
    </div>`
    }
  </div>`

  appEl.innerHTML = appHtml;

  if (!token) {
    document.getElementById('go-to-login').addEventListener('click', (event) => {
      event.preventDefault();
      renderLoginComponent(appEl, commentsHtml);

    })
  }
  if (token) {
    const buttonElement = document.getElementById('add-form-button');
    const textAreaElement = document.getElementById('add-form-text');


    buttonElement.addEventListener('click', () => {

      textAreaElement.classList.remove('error');

      if (textAreaElement.value.trim() === '') {
        return textAreaElement.classList.add('error');
      }

      handlePostClick();
    });

    // if (isInitionalLoading = false) {
    //   document.getElementById('button-del').addEventListener('click', () => {
    //     const commentsElement = document.getElementById('comments');

    //     const id = commentsElement.dataset.id;
    //     const comment = comments[id];
    //     comments.pop();

    //     deleteLastComment(id);
    //     renderApp();
    //   });

    }
}

// Выключение кнопки при пустом поле ввода

// function onblur(e) {
//   if (nameInputElement.value === '' || textAreaElement.value === '') {
//     buttonElement.disabled = true;
//     buttonElement.classList.add('button-no-active');
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove('button-no-active');
//   }
// };

// nameInputElement.addEventListener('input', onblur);
// textAreaElement.addEventListener('input', onblur);

// Добавление элемента в список по нажатию Enter 

// formElement.addEventListener('keyup', function (event) {

//   if (event.keyCode === 13) {
//     fetchAndRenderComments();
//     nameInputElement.value = '';
//     textAreaElement.value = '';
//   }

//   renderApp();
// });

// Удаление последнего элемента

// const buttonDelElement = document.getElementById('button-del');

// buttonDelElement.addEventListener('click', () => {
//   const commentsElement = document.getElementById('comments');

//   const index = commentsElement.dataset.index;
//   const comment = comments[index];
//   comments.pop();
//   renderApp();
// });


// initCountLikesListeners();
// initEditCommentListeners();
// initReplyToCommentListeners();
// };
