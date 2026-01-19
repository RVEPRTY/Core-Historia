const cases = [
  {
    id: "CH-001",
    title: "Scam Network",
    status: "Active",
    description: "Investigation into coordinated online scam operations."
  },
  {
    id: "CH-002",
    title: "Doxxing Incident",
    status: "Closed",
    description: "Targeted harassment and exposure of private data."
  },
  {
    id: "CH-003",
    title: "Impersonation Accounts",
    status: "Monitoring",
    description: "Fake staff accounts identified."
  },
  {
    id: "CH-004",
    title: "Malware Campaign",
    status: "Active",
    description: "Malicious downloads spread via shortened links."
  },
  {
    id: "CH-005",
    title: "Data Breach Archive",
    status: "Review",
    description: "Leaked datasets under verification."
  }
];

const searchInput = document.getElementById("searchInput");
const container = document.getElementById("caseContainer");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupID = document.getElementById("popupID");
const popupStatus = document.getElementById("popupStatus");
const popupDesc = document.getElementById("popupDesc");
const closePopup = document.getElementById("closePopup");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  container.innerHTML = "";

  if (!value) return;

  const results = cases.filter(c =>
    c.id.toLowerCase().includes(value) ||
    c.title.toLowerCase().includes(value)
  );

  results.forEach(c => {
    const card = document.createElement("div");
    card.className = "case-card";

    card.innerHTML = `
      <h3>${c.id}</h3>
      <p>${c.title}</p>
      <span>${c.status}</span>
    `;

    card.onclick = () => {
      popupTitle.textContent = c.title;
      popupID.textContent = c.id;
      popupStatus.textContent = c.status;
      popupDesc.textContent = c.description;
      popup.classList.remove("hidden");
    };

    container.appendChild(card);
  });
});

closePopup.onclick = () => {
  popup.classList.add("hidden");
};
