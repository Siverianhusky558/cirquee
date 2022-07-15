var nav = document.getElementById("comp");
var mob = document.getElementById("mob");
var mq = window.matchMedia("(max-width: 640px)");

if (mq.matches) {
  nav.classList.add("d-none");
  mob.classList.remove("d-none");
} else {
  nav.classList.remove("d-none");
  mob.classList.add("d-none");
}

mq.addEventListener("change", checkIfMatch);

function checkIfMatch(e) {
  if (e.matches) {
    nav.classList.add("d-none");
    mob.classList.remove("d-none");
  } else {
    nav.classList.remove("d-none");
    mob.classList.add("d-none");
  }
}

function collide() {
  if (window.scrollY >= document.body.scrollHeight - 800) {
    mob.classList.add("hidden");
  } else {
    mob.classList.remove("hidden");
  }
}

// NAV ELEMENTS
const post = document.getElementById("post");
const newPost = document.getElementById("new");
const members = document.getElementById("members");
// const me = document.getElementById("me");

const params = window.location.pathname;

console.log(params);

if (document.body.style.backgroundColor == "rgb(17, 17, 17)") {
  if (params == "/posts") {
    post.setAttribute("fill", "#fff");
  } else if (params == "/posts/new") {
    newPost.setAttribute("fill", "#fff");
  } else if (params == "/users") {
    members.setAttribute("fill", "#fff");
  }
  // else if (params[6] == "/") {
  //   me.setAttribute("fill", "#fff");
  // }
} else {
  if (params == "/posts") {
    post.setAttribute("fill", "#000");
  } else if (params == "/posts/new") {
    newPost.setAttribute("fill", "#000");
  } else if (params == "/users") {
    members.setAttribute("fill", "#000");
  }
  // else if (params[6] == "/") {
  //   me.setAttribute("fill", "#000");
  // }
}

window.addEventListener("scroll", collide);

// export {isArabic};
