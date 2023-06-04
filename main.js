'use strict';
const buttonElement = document.getElementById('add-form-button');
const nameInputElement = document.getElementById('add-form-name');
const textAreaElement = document.getElementById('add-form-text');
const formElement = document.getElementById('form');
const addComment = document.querySelector('.add-comment');
const commentsElement = document.getElementById('comments');

import { comments } from "./api.js";
import { renderComments } from "./render.js";

commentsElement.disabled = true;
commentsElement.textContent = 'Комментарии загружаются';

import { fetchAndRenderComments, handlePostClick } from "./api.js";


export const initCountLikesListeners = () => {
    const countLikesElements = document.querySelectorAll('.like-button');

    for (const countLikesElement of countLikesElements) {
        countLikesElement.addEventListener('click', (event) => {
            function delay(interval = 300) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, interval);
                });
            };
            event.stopPropagation();

            const index = countLikesElement.dataset.index;
            const comment = comments[index];
            comment.isLikeLoading = true;
            renderComments();

            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1;
                comment.isLiked = !comment.isLiked;
                comment.isLikeLoading = false;
                renderComments();
            });
        })
    };
};

// Дополнительное задание DOM-2 - работа кнопок "Редактировать комментарий"

export const initEditCommentListeners = () => {
    const editCommentElements = document.querySelectorAll('.edit-comment');

    for (const editCommentElement of editCommentElements) {
        editCommentElement.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = editCommentElement.dataset.index;
            const comment = comments[index];


            if (comment.isEdit) {
                const textArea = document.querySelector('.textarea-text');

                comment.text = textArea.value;
            }

            comment.isEdit = !comment.isEdit;
            comments[index].isEdit = comment.isEdit;

            renderComments();
        });
    }
};

// Сценарий "Ответ на комментарий"

export const initReplyToCommentListeners = () => {
    const replyToCommentElements = document.querySelectorAll('.comment-text');

    for (const replyToCommentElement of replyToCommentElements) {
        replyToCommentElement.addEventListener('click', () => {
            const index = replyToCommentElement.dataset.index;
            const comment = comments[index];

            // Строка кода к основному заданию по DOM -3
            // textAreaElement.value = comment.author +"\r\n" + comment.text;

            textAreaElement.value = `QUOTE_BEGIN ${comment.author + ':' + "\r\n" + comment.text} QUOTE_END`;
        });
    };
};

export const fullDate = () => {

    let userDate = new Date();

    let date = userDate.getDate();
    if (date < 10) date = '0' + date;

    let month = userDate.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = userDate.getFullYear() % 100;
    if (year < 10) year = '0' + year;

    let hours = userDate.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = userDate.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    return `${date}.${month}.${year} ${hours}:${minutes}`;
};

renderComments();
initCountLikesListeners();
initEditCommentListeners();
initReplyToCommentListeners();

buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove('error');
    textAreaElement.classList.remove('error');

    if (nameInputElement.value.trim() === '') {
        return nameInputElement.classList.add('error');
    } else if (textAreaElement.value.trim() === '') {
        return textAreaElement.classList.add('error');
    }

    formElement.style.display = 'none';
    addComment.style.display = 'block';
    handlePostClick();
});

// Выключение кнопки при пустом поле ввода

function onblur(e) {
    if (nameInputElement.value === '' || textAreaElement.value === '') {
        buttonElement.disabled = true;
        buttonElement.classList.add('button-no-active');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('button-no-active');
    }
};
nameInputElement.addEventListener('input', onblur);
textAreaElement.addEventListener('input', onblur);


// Добавление элемента в список по нажатию Enter 

formElement.addEventListener('keyup', function (event) {

    if (event.keyCode === 13) {
        fetchAndRenderComments();
        nameInputElement.value = '';
        textAreaElement.value = '';
    }

    renderComments();
});


// Удаление последнего элемента

const buttonDelElement = document.getElementById('button-del');

buttonDelElement.addEventListener('click', () => {
    const index = commentsElement.dataset.index;
    const comment = comments[index];
    comments.pop();
    renderComments();
});