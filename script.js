document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('contact-msg').textContent = "Thank you! Your message has been received.";
  this.reset();
});

function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const dateStr = now.toLocaleDateString(undefined, options);
  const timeStr = now.toLocaleTimeString(undefined, { hour12: false });

  clockElement.textContent = `${dateStr} | ${timeStr}`;
}


setInterval(updateClock, 1000);
updateClock(); // initial call


document.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
    document.body.classList.add("loaded");
   
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = 'none';
    }, 500);
  }, 500); 
});
