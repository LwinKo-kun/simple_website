const content = document.getElementById("content");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// Load organizations
function loadOrganizations(search = "") {
  let url = "http://localhost/sim-web/backend/api/organizations.php";
  if(search) url += "?search=" + encodeURIComponent(search);

  fetch(url)
    .then(res => res.json())
    .then(orgs => {
      if(orgs.length === 0){
        content.innerHTML = "<p>No organizations found.</p>";
        return;
      }

      content.innerHTML = orgs.map(org => `
        <div class="card">
          <h2>${org.name}</h2>
          <p><strong>Founded:</strong> ${org.founded}</p>
          <p><strong>Location:</strong> ${org.location}</p>
          <p><strong>Employees:</strong> ${org.employees}</p>
          <p>${org.description}</p>
          <p><strong>Departments IDs:</strong> ${org.departments.join(", ")}</p>
        </div>
      `).join("");
    })
    .catch(err => {
      content.innerHTML = "<p>Failed to load organizations.</p>";
      console.error(err);
    });
}

// Initial load
loadOrganizations();

// Search
searchBtn.addEventListener("click", () => loadOrganizations(searchInput.value));
searchInput.addEventListener("keypress", e => {
  if(e.key === "Enter") loadOrganizations(searchInput.value);
});

// Contact form submission
function submitContactForm(name, email, message){
  fetch("http://localhost/sim-web/backend/api/contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(resp => alert(resp.message))
  .catch(err => alert("Failed to send message."));
}

// Contact form button
document.getElementById("contactBtn").addEventListener("click", () => {
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;
  submitContactForm(name, email, message);
});
