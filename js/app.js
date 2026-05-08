const content = document.getElementById("content");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const themeToggle = document.getElementById("themeToggle");

let organizations = [];

// Fetch JSON data
async function loadOrganizations() {
  try {
    const response = await fetch("data/organizations.json");
    organizations = await response.json();

    updateDisplay();
    createChart();
  } catch (error) {
    content.innerHTML = "<p>Failed to load organizations.</p>";
    console.error(error);
  }
}

// Render organizations
function renderOrganizations(data) {
  if (data.length === 0) {
    content.innerHTML = "<p>No organizations found.</p>";
    return;
  }

  content.innerHTML = data.map(org => `
    <div class="card">
      <h2>${org.name}</h2>

      <div class="info-grid">
        <p><strong>Founded:</strong> ${org.founded}</p>
        <p><strong>Location:</strong> ${org.location}</p>
        <p><strong>Employees:</strong> ${org.employees}</p>
      </div>

      <p>${org.description}</p>

      <div class="departments">
        <strong>Departments:</strong>

        <ul>
          ${org.departments.map(dep => `
            <li>
              ${dep.name}
              <br>
              Manager: ${dep.manager}
              <br>
              Employees: ${dep.employees}
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

// Search and Sort
function updateDisplay() {

  let filtered = organizations.filter(org =>
    org.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    org.location.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const sortBy = sortSelect.value;

  if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "employees") {
    filtered.sort((a, b) => b.employees - a.employees);
  }

  if (sortBy === "location") {
    filtered.sort((a, b) =>
      a.location.localeCompare(b.location)
    );
  }

  renderOrganizations(filtered);
}

searchInput.addEventListener("input", updateDisplay);
sortSelect.addEventListener("change", updateDisplay);

// Contact Form
document.getElementById("contactBtn")
.addEventListener("click", () => {

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    alert("All fields are required!");
    return;
  }

  const messages =
    JSON.parse(localStorage.getItem("messages")) || [];

  messages.push({
    name,
    email,
    message,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(
    "messages",
    JSON.stringify(messages)
  );

  alert("Message saved successfully!");

  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMessage").value = "";
});

// Chart
let chart;

function createChart() {

  const ctx = document
    .getElementById("employeeChart");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: organizations.map(org => org.name),

      datasets: [{
        label: "Employees",
        data: organizations.map(org => org.employees)
      }]
    },

    options: {
      responsive: true,

      maintainAspectRatio: false
    }
  });
}

// Dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Load data
loadOrganizations();