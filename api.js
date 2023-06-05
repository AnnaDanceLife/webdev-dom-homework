const nameInputElement = document.getElementById('add-form-name');
const textAreaElement = document.getElementById('add-form-text');
const formElement = document.getElementById('form');
const addComment = document.querySelector('.add-comment');
const commentsElement = document.getElementById('comments');

import { renderComments } from "./render.js";
import { fullDate } from "./main.js";
export let comments = [];

export const fetchAndRenderComments = () => {
    return fetch('https://webdev-hw-api.vercel.app/api/v1/anna-shatilova/comments', {
        method: "GET"
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            }

            return response.json()
        })
        .then((responseData) => {
            commentsElement.disabled = true;
            commentsElement.textContent = comments;
            const appComments = responseData.comments.map((comment) => {
                return {
                    author: comment.author.name,
                    date: fullDate(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            });
            comments = appComments;
            renderComments();
        })
        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                return;
            }
        })
}

export const handlePostClick = () => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/anna-shatilova/comments', {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            text: textAreaElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                .replaceAll("QUOTE_END", "</div>"),
            forceError: true
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            }

            if (response.status === 400) {
                throw new Error("Плохой запрос");
            }

            return response.json()
        })
        .then(() => {
            return fetchAndRenderComments().then(() => {
                addComment.style.display = 'none';
                formElement.style.display = 'block';
                nameInputElement.value = '';
                textAreaElement.value = '';
            })
        })
        .catch((error) => {
            formElement.style.display = 'block';
            addComment.style.display = 'none';

            if (error.message === "Сервер сломался") {
                handlePostClick();
                return;
            }
            if (error.message === "Плохой запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                return;
            }
            alert('Кажется, у вас отсутствует интернет');
            console.log(error);
        })
}