var userName = document.getElementById("userName");
var form = document.getElementById("myForm");
var inputError = document.getElementById("inputError");
var submit = document.getElementById("submit");
var outputPannel = document.getElementById("outputPannel");
var card = document.getElementById("card");
var cardImg = document.getElementById("cardImg");
var cardTitle = document.getElementById("cardTitle");
var seeProfile = document.getElementById("seeProfile");
var notFound = document.getElementById("notFound");
card.style.display = "none";
notFound.style.display = "none";
userName.oninput = () => {
    if (userName.validity.valueMissing) {
        inputError.className = "text-danger";
        inputError.style.display = "block";
        inputError.innerText = "Enter Github username";
    } else {
        if (userName.value.indexOf(" ") !== -1) {
            inputError.className = "text-danger";
            inputError.style.display = "block";
            inputError.innerText = "You can't enter space";
        } else {
            inputError.style.display = "none";
        }
    }
}
form.onsubmit = (e) => {
    notFound.style.display = "none";
    e.preventDefault();
    if (userName.validity.valueMissing) {
        inputError.className = "text-danger";
        inputError.innerText = "Enter Github username";
        inputError.style.display = "block";
    } else {
        if (userName.value.indexOf(" ") !== -1) {
            inputError.className = "text-danger";
            inputError.style.display = "block";
            inputError.innerText = "You can't enter space";
        } else {
            card.style.display = "none";
            inputError.style.display = "none";
            submit.disabled = userName.disabled = true;
            var loader = document.createElement("img");
            loader.setAttribute("id", "loader");
            loader.setAttribute("src", "./loader.svg");
            loader.setAttribute("class", "mx-auto d-block");
            outputPannel.appendChild(loader);
            var url = `https://api.github.com/users/${userName.value}`;
            fetch(url).then(r => r.json())
                .then(r => {
                    outputPannel.removeChild(loader);
                    submit.disabled = userName.disabled = false;
                    if (r.message != "Not Found") {
                        cardImg.src = r.avatar_url;
                        cardTitle.innerText = r.name;
                        seeProfile.href = r.html_url;
                        loginName.innerText = `Login Name : ${r.login}`;
                        location.innerText = `Location : ${r.location}`;
                        company.innerText = `Company: ${r.company}`;
                        publicRepos.innerText = `Public Repos : ${r.public_repos}`;
                        publicGists.innerText = `Public Gists : ${r.public_gists}`;
                        followers.innerText = `Followers : ${r.followers}`;
                        following.innerText = `Following : ${r.following}`;
                        bio.innerText = `Bio : ${r.bio}`;
                        if (r.blog === "") {
                            blog.href = "Javascript:void(0)";
                            blog.innerText = "null";
                        } else {
                            blog.href = r.blog;
                            blog.innerText = r.blog;
                        }
                        card.style.display = "block";
                        form.reset();
                    } else {
                        notFound.style.display = "block";
                        notFound.innerText = "User not found!"
                    }

                })
                .catch(err => {
                    loader.remove();
                    notFound.innerText = "You are not connected to the internet!";
                    notFound.style.display = "block";
                    submit.disabled = userName.disabled = false;
                    console.log(err);
                });
        }
    }
}