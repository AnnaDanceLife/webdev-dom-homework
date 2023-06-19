'use strict';

import { comments } from "./api.js";
import { renderApp } from "./render.js";
import { fetchAndRenderComments } from "./api.js";
import { commentDate } from "./api.js";


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

            renderApp();
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

export const fullDate = (commentDate) => {

    let userDate = new Date(commentDate);

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

fetchAndRenderComments();
// renderApp();
// initCountLikesListeners();
// initEditCommentListeners();
// initReplyToCommentListeners();





