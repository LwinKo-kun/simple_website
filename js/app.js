const content = document.getElementById("content");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const themeToggle = document.getElementById("themeToggle");

const btn = document.getElementById("addOrgBtn");

let organizations = [];
let editId = null;
let chart;

// =====================
// LOAD DATA
// =====================
async function loadOrganizations() {
  try {
    const response = await fetch("data/organization.json");
    const data = await response.json();

    const saved = JSON.parse(localStorage.getItem("orgs"));

    organizations = saved && saved.length ? saved : data;

    updateDisplay();
    createChart();

  } catch (err) {
    content.innerHTML = "<p>Failed to load data</p>";
    console.error(err);
  }
}

// =====================
// RENDER
// =====================
function renderOrganizations(data) {

  if (!data.length) {
    content.innerHTML = "<p>No organizations found</p>";
    return;
  }

  content.innerHTML = data.map(org => `
    <div class="card">
      <h2>${org.name}</h2>
      <p><strong>Founded:</strong> ${org.founded}</p>
      <p><strong>Location:</strong> ${org.location}</p>
      <p><strong>Employees:</strong> ${org.employees}</p>
      <p>${org.description}</p>

      <div class="card-actions">
        <button onclick="editOrg(${org.id})">Edit</button>
        <button onclick="deleteOrg(${org.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

// =====================
// ADD / UPDATE
// =====================
btn.addEventListener("click", handleSubmit);

function handleSubmit() {

  const name = orgName.value.trim();
  const founded = orgFounded.value;
  const location = orgLocation.value.trim();
  const employees = orgEmployees.value;
  const description = orgDesc.value.trim();

  if (!name || !founded || !location || !employees || !description) {
    alert("Fill all fields");
    return;
  }

  if (editId !== null) {

    const org = organizations.find(o => o.id === editId);

    org.name = name;
    org.founded = Number(founded);
    org.location = location;
    org.employees = Number(employees);
    org.description = description;

    editId = null;
    btn.textContent = "Add Organization";

  } else {

    organizations.push({
      id: Date.now(),
      name,
      founded: Number(founded),
      location,
      employees: Number(employees),
      description
    });
  }

  saveData();
  resetForm();
}

// =====================
// EDIT
// =====================
function editOrg(id) {

  const org = organizations.find(o => o.id === id);
  editId = id;

  orgName.value = org.name;
  orgFounded.value = org.founded;
  orgLocation.value = org.location;
  orgEmployees.value = org.employees;
  orgDesc.value = org.description;

  btn.textContent = "Update Organization";
}

// =====================
// DELETE
// =====================
function deleteOrg(id) {

  if (!confirm("Delete this organization?")) return;

  organizations = organizations.filter(o => o.id !== id);

  saveData();
}

// =====================
// SAVE
// =====================
function saveData() {
  localStorage.setItem("orgs", JSON.stringify(organizations));
  updateDisplay();
  createChart();
}

// =====================
// DISPLAY LOGIC
// =====================
function updateDisplay() {

  let filtered = organizations.filter(org =>
    org.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    org.location.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  if (sortSelect.value === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortSelect.value === "employees") {
    filtered.sort((a, b) => b.employees - a.employees);
  }

  if (sortSelect.value === "location") {
    filtered.sort((a, b) => a.location.localeCompare(b.location));
  }

  renderOrganizations(filtered);
}

// =====================
// EVENTS
// =====================
searchInput.addEventListener("input", updateDisplay);
sortSelect.addEventListener("change", updateDisplay);

// =====================
// CONTACT FORM
// =====================
document.getElementById("contactBtn").addEventListener("click", () => {

  const name = contactName.value.trim();
  const email = contactEmail.value.trim();
  const message = contactMessage.value.trim();

  if (!name || !email || !message) {
    alert("Fill all fields");
    return;
  }

  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  messages.push({ name, email, message, date: new Date().toLocaleString() });

  localStorage.setItem("messages", JSON.stringify(messages));

  alert("Message saved");

  contactName.value = "";
  contactEmail.value = "";
  contactMessage.value = "";
});

// =====================
// CHART
// =====================
function createChart() {

  const ctx = document.getElementById("employeeChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: organizations.map(o => o.name),
      datasets: [{
        label: "Employees",
        data: organizations.map(o => o.employees)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// =====================
// THEME TOGGLE
// =====================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// =====================
// RESET FORM
// =====================
function resetForm() {
  orgName.value = "";
  orgFounded.value = "";
  orgLocation.value = "";
  orgEmployees.value = "";
  orgDesc.value = "";
}

// =====================
// INIT
// =====================
loadOrganizations();