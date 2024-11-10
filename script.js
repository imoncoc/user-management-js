let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

function displayUsers(users) {
  const userDataDiv = document.getElementById("user-data");
  userDataDiv.innerHTML = users
    .map(
      (user) => `
        <div class="user-div">
            <h2>User ${user.id}</h2>
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
        </div>
    `
    )
    .join("");
}

displayUsers(users);

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementsByClassName("close-btn")[0];
const addUserForm = document.getElementById("add-user-form");

openModalBtn.onclick = function () {
  modal.style.display = "block";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("user-id").value = "";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

addUserForm.onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const userId = document.getElementById("user-id").value;

  if (userId) {
    const user = users.find((user) => user.id === parseInt(userId));
    user.name = name;
    user.email = email;
  } else {
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: name,
      email: email,
    };
    users.push(newUser);
  }

  displayUsers(users);
  modal.style.display = "none";
};

function editUser(userId) {
  const user = users.find((user) => user.id === userId);
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("user-id").value = user.id;
  modal.style.display = "block";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  displayUsers(users);
}
