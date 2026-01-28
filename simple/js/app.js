// Fake data
const organizations = [
  {
    id: 1,
    name: "NovaTech Solutions",
    founded: 2018,
    location: "Singapore",
    employees: 125,
    description: "Tech company specializing in smart inventory systems.",
    departments: [
      {name:"Engineering", manager:"Alice", employees:50},
      {name:"Product", manager:"Bob", employees:30}
    ]
  },
  {
    id:2,
    name:"GreenWorks Corp",
    founded:2015,
    location:"Malaysia",
    employees:98,
    description:"Environmental solutions company.",
    departments:[
      {name:"Operations", manager:"Carol", employees:40},
      {name:"Sales", manager:"David", employees:25}
    ]
  },
  {
    id:3,
    name:"BlueWave Industries",
    founded:2020,
    location:"Indonesia",
    employees:60,
    description:"Manufacturing and logistics solutions.",
    departments:[
      {name:"Support", manager:"Eva", employees:15},
      {name:"Logistics", manager:"Frank", employees:20}
    ]
  }
];

// Render organizations
const content = document.getElementById("content");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

function renderOrganizations(data){
  if(data.length === 0){
    content.innerHTML = "<p>No organizations found.</p>";
    return;
  }
  content.innerHTML = data.map(org => `
    <div class="card">
      <h2>${org.name}</h2>
      <p><strong>Founded:</strong> ${org.founded}</p>
      <p><strong>Location:</strong> ${org.location}</p>
      <p><strong>Employees:</strong> ${org.employees}</p>
      <p>${org.description}</p>
      <div class="departments">
        <strong>Departments:</strong>
        <ul>
          ${org.departments.map(d => `<li>${d.name} (Manager: ${d.manager}, Employees: ${d.employees})</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

// Search + Sort
function updateDisplay(){
  let filtered = organizations.filter(org => 
    org.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    org.location.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  
  const sortBy = sortSelect.value;
  if(sortBy === "name") filtered.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortBy === "employees") filtered.sort((a,b)=>b.employees-a.employees);
  if(sortBy === "location") filtered.sort((a,b)=>a.location.localeCompare(b.location));

  renderOrganizations(filtered);
}

searchInput.addEventListener("input", updateDisplay);
sortSelect.addEventListener("change", updateDisplay);

// Initial render
updateDisplay();

// Contact form using localStorage
const contactBtn = document.getElementById("contactBtn");
contactBtn.addEventListener("click", ()=>{
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;
  
  if(!name || !email || !message){
    alert("All fields are required!");
    return;
  }
  
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push({name,email,message,date:new Date().toISOString()});
  localStorage.setItem("messages", JSON.stringify(messages));
  alert("Message sent! (Saved locally in your browser)");
  
  // Clear inputs
  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMessage").value = "";
});

// Employee Chart
const ctx = document.getElementById('employeeChart').getContext('2d');
new Chart(ctx,{
  type:'bar',
  data:{
    labels: organizations.map(o=>o.name),
    datasets:[{
      label:'Employees',
      data: organizations.map(o=>o.employees),
      backgroundColor:'#0d6efd'
    }]
  },
  options:{responsive:true, maintainAspectRatio:false}
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});
