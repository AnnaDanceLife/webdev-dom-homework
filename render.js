export const renderComments = (element) => {
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

    element.innerHTML = commentsHtml;
    initCountLikesListeners();
    initEditCommentListeners();
    initReplyToCommentListeners();
  };
