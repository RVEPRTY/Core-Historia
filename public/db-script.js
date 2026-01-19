const cases = [
  {
    id: "CH-001",
    title: "Online Scam Network",
    status: "Active Investigation",
    description: "Investigation into a coordinated crypto scam group operating across multiple platforms."
  },
  {
    id: "CH-002",
    title: "Doxxing Incident",
    status: "Closed",
    description: "Case involving targeted harassment and release of private information."
  },
  {
    id: "CH-003",
    title: "Impersonation Ring",
    status: "Monitoring",
    description: "Accounts impersonating staff members across Discord and Telegram."
  },
  {
    id: "CH-004",
    title: "Malicious Link Campaign",
    status: "Active",
    description: "Tracking malware links disguised as media downloads."
  },
  {
    id: "CH-005",
    title: "Data Breach Report",
    status: "Under Review",
    description: "Analysis of alleged leaked databases circulating online."
  }
];

const container = document.getElementById("caseContainer");
const searchInput = document.getElementById("searchInput");

// popup
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupID = document.getElementById("popupID");
const popupStatus = document.getElementById("popupStatus");
const popupDesc = document.getElementById("popupDesc");
const closePopup = document.getElementById("closePopup");

// render cards
function renderCases(filteredCases = []) {
  container.innerHTML = "";

  filteredCases.forEach(c => {
    const card = document.createElement("div");
    card.className = "case-card";

    card.innerHTML = `
      <div class="case-id">${c.id}</div>
      <div class="case-title">${c.title}</div>
      <div class="case-status">${c.status}</div>
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
}

// SEARCH
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    container.innerHTML = "";
    return;
  }

  const results = cases.filter(c =>
    c.id.toLowerCase().includes(query) ||
    c.title.toLowerCase().includes(query)
  );

  renderCases(results);
});

// close popup
closePopup.onclick = () => {
  popup.classList.add("hidden");
};
