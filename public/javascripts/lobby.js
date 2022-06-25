let form = document.getElementById("lobby__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inviteCode = e.target.room.value;

  window.location = `/room?room=${inviteCode}`;
});
