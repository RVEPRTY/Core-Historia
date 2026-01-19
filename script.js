const SITE_ONLINE = true; 

if (!SITE_ONLINE) {
  document.body.innerHTML = `
    <div style="
      background:#000;
      color:#fff;
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      text-align:center;
      font-family:Arial;
      padding:40px;
    ">
      <h1 style="font-size:42px; margin-bottom:20px;">
        The Website’s Status is Currently Down
      </h1>

      <p style="font-size:18px; opacity:0.8;">
        DM <strong>rveprty.</strong> to bring the website back up
      </p>
    </div>
  `;
}


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

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => {
  observer.observe(section);
});

