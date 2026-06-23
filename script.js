const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");
const fetchButton = document.getElementById("fetchButton");
const errorOnPage = document.getElementById("error");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

fetchButton.addEventListener('click', event => {
fetch("https://jsonplaceholder.typicode.com/posts")  
.then(response => {
        return response.json();
    })
    .then(data => { 
data.forEach(newPost => { 
const newPostTitle = document.createElement('h1');
const newPostBody = document.createElement('p');
const deleteButton = document.createElement('button');
newPostTitle.innerHTML = newPost.title;
newPostBody.innerHTML = newPost.body;
postList.appendChild(newPostTitle);
postList.appendChild(newPostBody);
postList.appendChild(deleteButton);
deleteButton.textContent = ("Delete")
deleteButton.addEventListener('click', event => {
    console.log("delete clicked");
    fetch(`https://jsonplaceholder.typicode.com/posts/${newPost.id}`, {
        method: "DELETE",
    })  
.then(response => {
    newPostTitle.remove();
    newPostBody.remove();
    deleteButton.remove();
})
})
    })
    .catch(function (error) {
        console.error("Error fetching data", error);
    })
});

postForm.addEventListener('submit', event => {
    event.preventDefault()
    fetch("https://jsonplaceholder.typicode.com/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title: titleInput.value, body:bodyInput.value}),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        formSuccess.textContent = (`Submission successful, ${titleInput.value} added.`)
        titleInput.value = "";
        bodyInput.value = "";
    })
    .catch(function (error) {
        console.error("Error fetching data", error);
    })
    
})
});