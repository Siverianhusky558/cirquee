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

// Registeration Form Verification Elements
const registerForm = document.getElementById("register-form");
const codeContainer = document.querySelector(".code");
const codeNumber = document.getElementById("code-number");
const codeInput = document.getElementById("code-input");
const verifyBtn = document.getElementById("verify");

if (registerForm == null) {
} else {
  codeInput.value = "";
  registerForm.addEventListener("submit", (form) => {
    form.preventDefault();
    codeContainer.classList.add("show");
    generateCode();
    verifyBtn.addEventListener("click", () => {
      if (codeInput.value == codeNumber.innerText) {
        registerForm.submit();
      } else {
        alert("Code entered is incorrect! Please try again.");
      }
    });
  });
}

// Login Form Loading Animation
const loginForm = document.getElementById("login-form");
const animationContainer = document.querySelector(".body");

if (loginForm == null) {
} else {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    animationContainer.classList.add("show");
    let seconds = [
      100, 300, 500, 700, 1000, 1200, 1600, 1800, 2000, 3000, 4000,
    ];
    setTimeout(
      loginForm.submit(),
      seconds[Math.floor(Math.random() * seconds.length)]
    );
  });
}

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

// Function to generate random code
function generateCode() {
  let nums = "0123456789";
  code = "";
  for (let i = 0; i < 6; i++) {
    let rand = Math.floor(Math.random() * nums.length);
    code += nums[rand];
  }
  codeNumber.innerText = code;
}
