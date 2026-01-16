const API_URL = "https://shelftrack-hzj6.onrender.com/api/books";
const AUTH_API = "https://shelftrack-hzj6.onrender.com/api/auth";

let token = localStorage.getItem("token");


const authSection = document.getElementById("authSection");
const bookFormSection = document.getElementById("bookFormSection");
const booksTableSection = document.getElementById("booksTableSection");
const logoutBtn = document.getElementById("logoutBtn");

function updateUI() {
  if (token) {
    authSection.style.display = "none";
    bookFormSection.style.display = "block";
    booksTableSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    authSection.style.display = "block";
    bookFormSection.style.display = "none";
    booksTableSection.style.display = "none";
    logoutBtn.style.display = "none";
  }
}





// Login
async function login() {
  console.log("Login button clicked"); 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

 if (data.token) {
  localStorage.setItem("token", data.token);
  token = data.token;

  updateUI();
  loadBooks();

  document.getElementById("authMsg").innerText = "Login successful";
}
 else {
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

  if (res.ok) {
    document.getElementById("authMsg").innerText =
      "Registration successful. Please login.";
    document.getElementById("authMsg").className = "text-success";
  } else {
    document.getElementById("authMsg").innerText = data.message;
    document.getElementById("authMsg").className = "text-danger";
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  token = null;
  updateUI();
}
document.getElementById("email").addEventListener("input", () => {
  document.getElementById("authMsg").innerText = "";
});
document.getElementById("password").addEventListener("input", () => {
  document.getElementById("authMsg").innerText = "";
});

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

  // 🚫 Block if not logged in
  if (!token) {
    alert("Please login first");
    return;
  }

  const book = {
    title: title.value,
    author: author.value,
    price: price.value
  };

  if (bookIdInput.value) {
    // 🔒 UPDATE (JWT required)
    await fetch(`${API_URL}/${bookIdInput.value}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(book)
    });
  } else {
    // 🔒 CREATE (JWT required)
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
  if (!token) {
    alert("Please login first");
    return;
  }

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
updateUI();

if (token) {
  loadBooks();
}

