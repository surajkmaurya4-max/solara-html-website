/* ---------- Editable data ---------- */
const APPS = [
  { name: "Leave & Attendance", desc: "Apply for leave and check your balance.", cat: "people", icon: "🌴", href: "#" },
  { name: "Payslips", desc: "Download monthly payslips and tax forms.", cat: "finance", icon: "💵", href: "#" },
  { name: "Expense Claims", desc: "Submit bills and track reimbursements.", cat: "finance", icon: "🧾", href: "#" },
  { name: "Timesheets", desc: "Log your hours against projects.", cat: "work", icon: "⏱️", href: "#" },
  { name: "Project Board", desc: "Tasks, sprints and deadlines for your team.", cat: "work", icon: "📋", href: "#" },
  { name: "CRM", desc: "Customers, leads and sales pipeline.", cat: "work", icon: "🤝", href: "#" },
  { name: "Learning Hub", desc: "Courses, certifications and training.", cat: "people", icon: "🎓", href: "#" },
  { name: "Room Booking", desc: "Reserve meeting rooms and desks.", cat: "work", icon: "🏢", href: "#" },
];

const NEWS = [
  { title: "Q3 results: record growth across all regions", meta: "Finance · 2 days ago" },
  { title: "New health insurance plan starts 1 December", meta: "HR · 4 days ago" },
  { title: "Scheduled maintenance this Saturday, 10 PM", meta: "IT · 5 days ago" },
  { title: "Diwali holiday schedule and office timings", meta: "HR · 1 week ago" },
];

const PEOPLE = [
  { name: "Ananya Rao", role: "Product Manager", team: "Product", city: "Bengaluru" },
  { name: "Rohit Mehta", role: "Senior Engineer", team: "Engineering", city: "Pune" },
  { name: "Sara Thomas", role: "HR Business Partner", team: "People", city: "Bengaluru" },
  { name: "Vikram Nair", role: "Finance Lead", team: "Finance", city: "Mumbai" },
  { name: "Meera Iyer", role: "UX Designer", team: "Design", city: "Chennai" },
  { name: "Arjun Singh", role: "Sales Manager", team: "Sales", city: "Delhi" },
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ---------- Mobile menu ---------- */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
$$("#navLinks a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

/* ---------- Greeting, date and clock ---------- */
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  $("#greeting").textContent = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  $("#todayDate").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  $("#todayTime").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 30000);
$("#year").textContent = new Date().getFullYear();

/* ---------- Apps: filter + search ---------- */
let activeFilter = "all";
let searchTerm = "";

function renderApps() {
  const list = APPS.filter(a =>
    (activeFilter === "all" || a.cat === activeFilter) &&
    (a.name + " " + a.desc).toLowerCase().includes(searchTerm)
  );
  $("#appGrid").innerHTML = list.map(a => `
    <a class="app" href="${a.href}">
      <span class="app-icon" aria-hidden="true">${a.icon}</span>
      <h3>${a.name}</h3>
      <p>${a.desc}</p>
    </a>`).join("");
  $("#appEmpty").hidden = list.length > 0;
  return list.length;
}

$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  activeFilter = tab.dataset.filter;
  renderApps();
}));

const searchInput = $("#searchInput");
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  const count = renderApps();
  $("#searchHint").textContent = searchTerm ? `${count} app${count === 1 ? "" : "s"} found` : "";
});
$("#heroSearch").addEventListener("submit", e => {
  e.preventDefault();
  $("#apps").scrollIntoView();
});

/* ---------- News ---------- */
$("#newsList").innerHTML = NEWS.map(n =>
  `<li><a href="#">${n.title}</a><small>${n.meta}</small></li>`).join("");

/* ---------- People directory ---------- */
function renderPeople(term = "") {
  const list = PEOPLE.filter(p =>
    Object.values(p).join(" ").toLowerCase().includes(term));
  $("#peopleGrid").innerHTML = list.map(p => {
    const initials = p.name.split(" ").map(w => w[0]).join("");
    return `
      <div class="person">
        <div class="avatar" aria-hidden="true">${initials}</div>
        <div>
          <h3>${p.name}</h3>
          <p>${p.role}<br>${p.team} · ${p.city}</p>
        </div>
      </div>`;
  }).join("");
  $("#peopleEmpty").hidden = list.length > 0;
}
renderPeople();
$("#peopleInput").addEventListener("input", e => renderPeople(e.target.value.trim().toLowerCase()));

renderApps();

/* ---------- Support form validation ---------- */
const form = $("#supportForm");
const rules = {
  name: v => v.trim().length >= 2 || "Enter your name.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid work email.",
  dept: v => v !== "" || "Choose a team.",
  msg: v => v.trim().length >= 10 || "Describe your request in at least 10 characters.",
};

function validateField(name) {
  const input = form.elements[name];
  const result = rules[name](input.value);
  const ok = result === true;
  input.closest(".field").classList.toggle("invalid", !ok);
  $(`.error[data-for="${name}"]`).textContent = ok ? "" : result;
  return ok;
}

Object.keys(rules).forEach(name =>
  form.elements[name].addEventListener("blur", () => validateField(name)));

form.addEventListener("submit", e => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(validateField).every(Boolean);
  if (!allValid) {
    toast("Fix the highlighted fields and send again.");
    return;
  }
  form.reset();
  toast("Request sent. The team will reply within one working day.");
});