const API_URL = "http://localhost:5000/api/books";
const AUTH_API = "http://localhost:5000/api/auth";
let token = localStorage.getItem("token");


const authSection = document.getElementById("authSection");
const bookFormSection = document.getElementById("bookFormSection");
const booksTableSection = document.getElementById("booksTableSection");
const logoutBtn = document.getElementById("logoutBtn");

function updateUI() {
  if (token) {
    authSection.classList.add("d-none");
    bookFormSection.classList.remove("d-none");
    booksTableSection.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    authSection.classList.remove("d-none");
    bookFormSection.classList.add("d-none");
    booksTableSection.classList.remove("d-none"); // 👈 THIS LINE
    logoutBtn.classList.add("d-none");
  }
}




// Login
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
  localStorage.setItem("token", data.token);
  token = data.token;
  document.getElementById("authMsg").innerText = "Login successful";
  updateUI();
} else {
    document.getElementById("authMsg").innerText = data.message;
  }
}
// Register
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${AUTH_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "User",
      email,
      password
    })
  });

  const data = await res.json();
  document.getElementById("authMsg").innerText = data.message;
}
// Logout
function logout() {
  localStorage.removeItem("token");
  token = null;
  updateUI();  
  alert("Logged out");
}


const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");
const bookIdInput = document.getElementById("bookId");

// Load books
async function loadBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();

  bookTable.innerHTML = "";

  books.forEach(book => {
    bookTable.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>₹${book.price}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editBook('${book._id}', '${book.title}', '${book.author}', ${book.price})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add / Update book
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
    price: price.value
  };

  if (bookIdInput.value) {
    // Update
    await fetch(`${API_URL}/${bookIdInput.value}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(book)
});

  } else {
    // Create
   await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(book)
});

  }

  bookForm.reset();
  bookIdInput.value = "";
  loadBooks();
});

// Edit book
function editBook(id, titleVal, authorVal, priceVal) {
  bookIdInput.value = id;
  title.value = titleVal;
  author.value = authorVal;
  price.value = priceVal;
}

// Delete book
async function deleteBook(id) {
  if (confirm("Are you sure you want to delete this book?")) {
    await fetch(`${API_URL}/${id}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

    loadBooks();
  }
}

// Initial load
loadBooks();

updateUI();

