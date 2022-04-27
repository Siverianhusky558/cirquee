const imgs = document.querySelectorAll('.thumbnail');

imgs.forEach((img) => {
  img.addEventListener('click', () => {
    img.classList.toggle('checked');
  });
});