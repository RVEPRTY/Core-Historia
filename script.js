document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('contact-msg').textContent = "Thank you! Your message has been received.";
  this.reset();
});
