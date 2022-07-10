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
  if (window.scrollY >= document.body.scrollHeight - 1050) {
    mob.classList.add("hidden");
  } else {
    mob.classList.remove("hidden");
  }
}

window.addEventListener("scroll", collide);

// export {isArabic};
