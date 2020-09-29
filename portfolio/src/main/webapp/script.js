// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


window.onscroll = function() {scrollFunction()};

var nav = document.getElementById("navbar");
var sticky = nav.offsetTop;

function scrollFunction() {
    if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
/**
 * Adds a message from data servlet to the page.
 */

function loadComments() {
  fetch('/list-comments').then(response => response.json()).then((allComments) => {
    const commentListElement = document.getElementById('history');
    allComments.forEach((comment) => {
      commentListElement.appendChild(createTaskElement(comment));
    })
  });
}

/** Creates an element that represents a comment, including its delete button. */
function createTaskElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const contentElement = document.createElement('span');
  //console.log(comment.comment);
  contentElement.innerText = comment.user + "\n" + comment.userComment + "\n" + "\n";

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);

    //Remove the task from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(contentElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}

/** Tells the server to delete the task. */
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

// function translateComment() {
//     // getting comment and language code
//     const comment = document.getElementById('history').value;
//     const languageCode = document.getElementById('language').value;

//     // determine where to store translated comments
//     const resultContainer = document.getElementById('results');
//     const params = new URLSearchParams();
//         params.append('comment', comment);
//         params.append('languageCode', languageCode);

//     fetch('/translate', {method: 'POST', body: params}).then(response => response.json()).then((translatedComment) => {
//         resultContainer.innerText = translatedComment;
//         });
// }
