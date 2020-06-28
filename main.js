"use strict";

const container = document.querySelector(".container-fluid");
const mainNav = document.querySelector("#main-nav");
const mainArea = document.querySelector("#main-area");
const postsArea = document.querySelector("#posts-area");
const profileForm = document.querySelector("#profile-form");
const signUpForm = document.querySelector("#sign-up-form");
const logInForm = document.querySelector("#log-in-form");
const addPostForm = document.querySelector("#add-post-form");
const overlay = document.querySelector("#overlay");
const bestPosts = document.querySelector("#best-posts");

class Animations {

    static showOverlay() {
        anime({
            targets: overlay,
            opacity: 1,
            duration: 500,
            easing: "linear"
        })
    }

    static hideOverlay() {
        anime({
            targets: overlay,
            opacity: 0,
            duration: 500,
            easing: "linear"
        })
    }

    static blurContainer() {
        anime({
            targets: container,
            filter: "blur(10px)",
            duration: 500,
            easing: "linear"
        })
    }

    static unblurContainer() {
        anime({
            targets: container,
            filter: "blur(0px)",
            duration: 500,
            easing: "linear"
        })
    }

    static showForm(element) {
        anime({
            targets: element,
            opacity: 1,
            duration: 500,
            easing: "linear"
        })
    }

    static hideForm(element) {
        anime({
            targets: element,
            opacity: 0,
            duration: 500,
            easing: "linear"
        })
    }

}

class Overlay {

    static showOverlay() {
        Animations.showOverlay();
        overlay.classList.remove("d-none");
    }

    static hideOverlay() {
        Animations.hideOverlay();
        overlay.classList.add("d-none");
    }

}

class AJAX {

    static async signUp() {
        let username = signUpForm.querySelector("#sign-username").value;
        let email = signUpForm.querySelector("#sign-email").value;
        let password = signUpForm.querySelector("#sign-password").value;
        let formData = new FormData();
        formData.append("sign-up-username", username);
        formData.append("sign-up-email", email);
        formData.append("sign-up-password", password);
        let response = fetch("main.php", {
            method: "POST",
            body: formData
        });
        response = await response;
        response = await response.text();
        return response;
    }

    static async logIn() {
        let username = logInForm.querySelector("#log-username").value;
        let password = logInForm.querySelector("#log-password").value;
        let formData = new FormData();
        formData.append("log-in-username", username);
        formData.append("log-in-password", password);
        let response = fetch("main.php", {
            method: "POST",
            body: formData
        });
        response = await response;
        response = await response.text();
        return response;
    }

    static async logout() {
        let formData = new FormData();
        formData.append("logout", "logout");
        fetch("main.php", {
            method: "POST",
            body: formData
        });
    }

    static async editProfile() {
        let newUsername = profileForm.querySelector("#new-username").value;
        let newPassword = profileForm.querySelector("#new-password").value;
        if (newUsername != "" && newPassword == "") {
            let formData = new FormData();
            formData.append("new-username", newUsername);
            let response = fetch("main.php", {
                method: "POST",
                body: formData
            });
            response = await response;
            response = await response.text();
            return response;
        } else if (newPassword != "" && newUsername == "") {
            let formData = new FormData();
            formData.append("new-password", newPassword);
            let response = fetch("main.php", {
                method: "POST",
                body: formData
            });
            response = await response;
            response = await response.text();
            return response;
        }
    }

    static async addPost() {
        let title = addPostForm.querySelector("#post-title").value;
        let content = addPostForm.querySelector("#post-content").value;
        let formData = new FormData();
        formData.append("post-title", title);
        formData.append("post-content", content);
        let response = fetch("main.php", {
            method: "POST",
            body: formData
        })
        response = await response;
        response = await response.text();
        return response;
    }

    static async fetchPosts() {
        let response = await fetch("main.php?fetch-posts", {
            method: "GET",
        });
        response = await response.json();
        return response;
    }

    static async like(postTitle, postContent) {
        let formData = new FormData();
        formData.append("liked-title", postTitle);
        formData.append("liked-content", postContent);
        fetch("main.php", {
            method: "POST",
            body: formData
        });
    }

    static async dislike(postTitle, postContent) {
        let formData = new FormData();
        formData.append("disliked-title", postTitle);
        formData.append("disliked-content", postContent);
        fetch("main.php", {
            method: "POST",
            body: formData
        });
    }

    static async bestPosts() {
        let response = await fetch("main.php?best-posts", {
            method: "GET"
        });
        response = await response;
        response = await response.json();
        return response;
    }

}

class SignUp {

    static showForm() {
        Animations.blurContainer();
        Overlay.showOverlay();
        signUpForm.classList.remove("d-none");
        Animations.showForm(signUpForm);
        signUpForm.querySelector("#form-cancel-btn").addEventListener("click", () => SignUp.hideForm());
    }

    static hideForm() {
        Animations.hideForm(signUpForm);
        signUpForm.classList.add("d-none");
        Overlay.hideOverlay();
        Animations.unblurContainer();
    }

}

class LogIn {

    static showForm() {
        Animations.blurContainer();
        Overlay.showOverlay();
        logInForm.classList.remove("d-none");
        Animations.showForm(logInForm);
        logInForm.querySelector("#form-cancel-btn").addEventListener("click", () => LogIn.hideForm());
    }

    static hideForm() {
        Animations.unblurContainer();
        Overlay.hideOverlay();
        Animations.hideForm(logInForm);
        logInForm.classList.add("d-none");
    }
    
}

class Post {

    static showForm() {
        Animations.blurContainer();
        Overlay.showOverlay();
        addPostForm.classList.remove("d-none");
        Animations.showForm(addPostForm);
        addPostForm.querySelector("#form-cancel-btn").addEventListener("click", () => Post.hideForm());
    }

    static hideForm() {
        Animations.hideForm(addPostForm);
        addPostForm.classList.add("d-none");
        Overlay.hideOverlay();
        Animations.unblurContainer();
    }

}

class Profile {

    static showForm() {
        Animations.blurContainer();
        Overlay.showOverlay();
        profileForm.classList.remove("d-none");
        Animations.showForm(profileForm);
        profileForm.querySelector("#form-cancel-btn").addEventListener("click", () => Profile.hideForm());
    }

    static hideForm() {
        Animations.hideForm(profileForm);
        profileForm.classList.add("d-none");
        Overlay.hideOverlay();
        Animations.unblurContainer();
    }

}

const signUp = async() => {
    if (signUpForm.querySelector("#sign-password").value == signUpForm.querySelector("#sign-confirm-password").value) {
        let response = await AJAX.signUp();
        if (response == "User Registered Successfully") {
            signUpForm.classList.remove("was-validated");
            signUpForm.querySelector("#sign-response").innerHTML = `
                <div class="col text-center">
                    <p style="color: #28a745">User Registered Successfully</p>
                </div>
            `;
            setTimeout(() => {
                signUpForm.querySelector("#sign-response").innerHTML = "";
            }, 1000);
            signUpForm.querySelector("#sign-username").value = "";
            signUpForm.querySelector("#sign-email").value = "";
            signUpForm.querySelector("#sign-password").value = "";
            signUpForm.querySelector("#sign-confirm-password").value = "";
        }
        if (response == "User Already Registered") {
            signUpForm.classList.remove("was-validated");
            signUpForm.querySelector("#sign-response").innerHTML = `
                <div class="col text-center">
                    <p style="color: #dc3545">User Already Registered</p>
                </div>
            `;
            setTimeout(() => {
                signUpForm.querySelector("#sign-response").innerHTML = "";
            }, 1000);
            signUpForm.querySelector("#sign-username").value = "";
            signUpForm.querySelector("#sign-email").value = "";
            signUpForm.querySelector("#sign-password").value = "";
            signUpForm.querySelector("#sign-confirm-password").value = "";
        }
    }
    else {
        signUpForm.querySelector("#sign-response").innerHTML = "";
        signUpForm.classList.add("was-validated");
        signUpForm.querySelector("#sign-password").parentElement.innerHTML += `
            <div class="invalid-feedback">
                Passwords Must Match.
            </div>
        `;
        signUpForm.querySelector("#sign-confirm-password").parentElement.innerHTML += `
            <div class="invalid-feedback">
                Passwords Must Match.
            </div>
        `;
        signUpForm.querySelector("#sign-username").value = "";
        signUpForm.querySelector("#sign-email").value = "";
        signUpForm.querySelector("#sign-password").value = "";
        signUpForm.querySelector("#sign-confirm-password").value = "";
    }
}

const login = async() => {
    let response = await AJAX.logIn();
    if (response === "Log In Successful") {
        logInForm.querySelector("#log-username").value = "";
        logInForm.querySelector("#log-password").value = "";
        logInForm.querySelector("#log-response").innerHTML = "";
        document.querySelector(".navbar-toggler").hidden = false;
        document.querySelector(".navbar-nav").hidden = false;
        mainArea.style.display = "none";  
        postsArea.classList.remove("d-none");
        postsArea.querySelector("#posts-container").innerHTML = `<h1>Posts</h1>`;
        let response = await AJAX.fetchPosts();
        let i = 0;
        Array.from(response).forEach(post => {
            postsArea.querySelector("#posts-container").innerHTML += `
                <div class="row">
                    <div class="col">
                        <div class="card post rounded-0 mt-2">
                            <div class="card-body">
                                <h2 class="card-title">${post.title}</h2>
                                <div class="row">
                                    <div class="col">
                                        <p class="card-text m-3">${post.content}</p>
                                    </div>
                                    <div class="col text-right">
                                        <a class="btn btn-secondary rounded-0 like">
                                            <i class="far fa-thumbs-up"></i>Like
                                        </a>
                                        <a class="btn btn-secondary rounded-0 dislike">
                                            <i class="far fa-thumbs-down"></i>Dislike
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            i++;
            if (i % 3 == 0) {
                postsArea.querySelector("#posts-container").innerHTML += `
                    <div class="row">
                        <div class="col">
                            <div class="ad card rounded-0 mt-2">
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        LogIn.hideForm();
        Array.from(document.querySelectorAll(".post")).forEach(post => {
            post.querySelector(".like").addEventListener("click", like);
            post.querySelector(".dislike").addEventListener("click", dislike);
        });
    }
    else {
        logInForm.querySelector("#log-username").value = "";
        logInForm.querySelector("#log-password").value = "";
        logInForm.querySelector("#log-response").innerHTML = `
            <div class="col text-center">
                <p style="color: #dc3545">User or Password is Incorrect</p>
            </div>
        `;
        setTimeout(() => {
            logInForm.querySelector("#log-response").innerHTML = ""
        }, 1000);
    }
    let date = new Date().getDay();
    if (date >= 6) {
        getBestPosts();
    }
}

const addPost = async() => {
    let response = await AJAX.addPost();
    if (response == "Post Added") {
        postsArea.querySelector("#posts-container").innerHTML += `
        <div class="row">
            <div class="col">
                <div class="card post rounded-0 mt-2">
                    <div class="card-body">
                        <h2 class="card-title">${addPostForm.querySelector("#post-title").value}</h2>
                        <div class="row">
                            <div class="col">
                                <p class="card-text m-3">${addPostForm.querySelector("#post-content").value}</p>
                            </div>
                            <div class="col text-right">
                                <a class="btn btn-secondary rounded-0 like">
                                    <i class="far fa-thumbs-up"></i>Like
                                </a>
                                <a class="btn btn-secondary rounded-0 dislike">
                                    <i class="far fa-thumbs-down"></i>Dislike
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        addPostForm.querySelector("#post-title").value = "";
        addPostForm.querySelector("#post-content").value = "";
        Post.hideForm();
        Array.from(document.querySelectorAll(".post")).forEach(post => {
            post.querySelector(".like").addEventListener("click", like);
            post.querySelector(".dislike").addEventListener("click", dislike);
        });
    }
}

const editProfile = async() => {
    if (profileForm.querySelector("#new-password").value == profileForm.querySelector("#new-password-confirm").value) {
        let response = await AJAX.editProfile();
        if (response == "Profile Edited Successfully") {
            profileForm.classList.remove("was-validated");
            profileForm.querySelector("#edit-response").innerHTML = `
                <div class="col text-center">
                    <p style="color: #28a745">Profile Edited Successfully</p>
                </div>
            `;
            setTimeout(() => {
                profileForm.querySelector("#edit-response").innerHTML = "";
            }, 1000);
            profileForm.querySelector("#new-username").value = "";
            profileForm.querySelector("#new-password").value = "";
            profileForm.querySelector("#new-password-confirm").value = "";
        }
        if (response == "Failed to Edit Profile") {
            profileForm.classList.remove("was-validated");
            profileForm.querySelector("#edit-response").innerHTML = `
                <div class="col text-center">
                    <p style="color: #dc3545">Failed to Edit Profile</p>
                </div>
            `;
            setTimeout(() => {
                profileForm.querySelector("#edit-response").innerHTML = "";
            }, 1000);
            profileForm.querySelector("#new-username").value = "";
            profileForm.querySelector("#new-password").value = "";
            profileForm.querySelector("#new-password-confirm").value = "";
        }
    }
    else {
        profileForm.querySelector("#edit-response").innerHTML = "";
        profileForm.classList.add("was-validated");
        profileForm.querySelector("#edit-response").innerHTML = `
            <div class="col text-center">
                <p style="color: #dc3545">Passwords Must Match</p>
            </div>
        `;
        setTimeout(() => {
            profileForm.querySelector("#edit-response").innerHTML = "";
        }, 1000);
        profileForm.querySelector("#new-username").value = "";
        profileForm.querySelector("#new-password").value = "";
        profileForm.querySelector("#new-password-confirm").value = "";
    }
}

const like = async(event) => {
    let postTitle = event.path[4].querySelector(".card-title").innerText;
    let postContent = event.path[4].querySelector(".card-text").innerText;
    await AJAX.like(postTitle, postContent);
    event.path[4].querySelector(".like").disabled = true;
    event.path[4].querySelector(".like").classList.add("disabled");
    event.path[4].querySelector(".dislike").disabled = false;
    event.path[4].querySelector(".dislike").classList.remove("disabled");
}

const dislike = async(event) => {
    let postTitle = event.path[4].querySelector(".card-title").innerText;
    let postContent = event.path[4].querySelector(".card-text").innerText;
    await AJAX.dislike(postTitle, postContent);
    event.path[4].querySelector(".dislike").disabled = true;
    event.path[4].querySelector(".dislike").classList.add("disabled");
    event.path[4].querySelector(".like").disabled = false;
    event.path[4].querySelector(".like").classList.remove("disabled");
}

const getBestPosts = async() => {
    let response = await AJAX.bestPosts();
    bestPosts.querySelector("#best-posts-container").innerHTML = "";
    let i = 0;
    while (i <= 4) {
        bestPosts.querySelector("#best-posts-container").innerHTML += `
            <p class="text-center">${response[i].title}</p>
        `;
        i++;
    }
    Animations.blurContainer();
    Overlay.showOverlay();
    bestPosts.classList.remove("d-none");
    Animations.showForm(bestPosts);
    bestPosts.querySelector(".btn").addEventListener("click", () => {
        Animations.hideForm(bestPosts);
        bestPosts.classList.add("d-none");
        Overlay.hideOverlay();
        Animations.unblurContainer();
    });
}

document.querySelector("#sign-up").addEventListener("click", (event) => {
    event.preventDefault();
    SignUp.showForm();
    signUpForm.querySelector("#sign-up-btn").addEventListener("click", signUp);
});

document.querySelector("#log-in").addEventListener("click", (event) => {
    event.preventDefault();
    LogIn.showForm();
    logInForm.querySelector("#log-in-btn").addEventListener("click", login);
});

document.querySelector("#logout").addEventListener("click", async(event) => {
    event.preventDefault();
    await AJAX.logout();
    document.querySelector(".navbar-toggler").hidden = true;
    document.querySelector(".navbar-nav").hidden = true;
    document.querySelector(".navbar-collapse").classList.remove("show");
    postsArea.querySelector("#posts-container").innerHTML = `<h1>Posts</h1>`;
    postsArea.classList.add("d-none");
    mainArea.style.display = "block";
});

document.querySelector("#add-post").addEventListener("click", (event) => {
    event.preventDefault();
    Post.showForm();
    addPostForm.querySelector("#add-post-btn").addEventListener("click", addPost);
});


document.querySelector("#profile").addEventListener("click", (event) => {
    event.preventDefault();
    Profile.showForm();
    profileForm.querySelector("#edit-profile-btn").addEventListener("click", editProfile);
});