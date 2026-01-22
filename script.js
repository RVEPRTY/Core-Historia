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

const codingClass = {
  topic: "Coding Basics",
  date: "2026-01-28",          // YYYY-MM-DD
  time: "18:00",               // 24h HH:MM
  timezone: "America/New_York" // your timezone
};


function getClassDate() {
  const raw = `${codingClass.date}T${codingClass.time}:00`;

  return new Date(
    new Date(raw).toLocaleString("en-US", {
      timeZone: codingClass.timezone
    })
  );
}

function updateSchedule() {
  const now = new Date();
  const classDate = getClassDate();

  document.getElementById("class-topic").textContent =
    codingClass.topic;

  document.getElementById("class-date").textContent =
    classDate.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  document.getElementById("class-time").textContent =
    classDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });

  const diff = classDate - now;
  const liveIndicator = document.getElementById("live-indicator");
  const countdown = document.getElementById("countdown-timer");

  if (diff <= 0 && diff > -3600000) {
    // LIVE for 1 hour
    liveIndicator.classList.remove("hidden");
    countdown.textContent = "LIVE NOW";
  } else if (diff > 0) {
    liveIndicator.classList.add("hidden");

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    countdown.textContent =
      `${days}d ${hours}h ${minutes}m`;
  } else {
    liveIndicator.classList.add("hidden");
    countdown.textContent = "Completed";
  }
}

updateSchedule();
setInterval(updateSchedule, 60000);


// Captcha and Contact Form

// Gens captcha
let captchaA = Math.floor(Math.random() * 10) + 1;
let captchaB = Math.floor(Math.random() * 10) + 1;

function refreshCaptcha() {
  captchaA = Math.floor(Math.random() * 10) + 1;
  captchaB = Math.floor(Math.random() * 10) + 1;

  const q = document.getElementById("captcha-question");
  if (q) q.textContent = `What is ${captchaA} + ${captchaB}?`;
}


refreshCaptcha();


const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const discord = document.getElementById("discord").value;
    const message = document.getElementById("message").value;
    const captcha = document.getElementById("captcha-answer").value;
    const status = document.getElementById("contact-status");

    status.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          discord,
          message,
          captcha,
          captchaExpected: captchaA + captchaB
        })
      });

      const data = await res.json();

      if (data.success) {
        status.textContent = "Message sent successfully.";
        contactForm.reset();
        refreshCaptcha();
      } else {
        status.textContent = data.error || "Failed to send message.";
        refreshCaptcha();
      }
    } catch (err) {
      status.textContent = "Server error. Please try again later.";
      refreshCaptcha();
    }
  });
}

