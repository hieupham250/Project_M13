let catagory = JSON.parse(localStorage.getItem("catagory"));
// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));
let userNameLink = document.getElementById("userName");
let avatarImage = document.getElementById("avatar");
let checkAdmin = -1;
for (let i = 0; i < users.length; i++) {
  if (users[i].role == "admin") {
    checkAdmin = i;
    break;
  }
}
userNameLink.textContent = users[checkAdmin].fullName;
avatarImage.src = users[checkAdmin].avatar;
//kết thúc phần hiện thị use đăng nhập
let table = document.getElementById("table");

//=======lấy dữ liệu từ data sử lý in ra màn hình thông tin của các use
table.innerHTML = "";

table.innerHTML = `

<tr>
<th scope="col">#</th>
<th scope="col">username</th>
<th scope="col">fullName</th>
<th scope="col">email</th>
 <th scope="col">status</th>
<th></th>
</tr>`;
for (let i = 0; i < users.length; i++) {
  if (users[i].role == "user") {
    table.innerHTML =
      table.innerHTML +
      ` <tr id="${users[i].user_id}">
        <th scope="row">${i + 1}</th>
        <td>${users[i].userName}</td>
        <td>${users[i].fullName}</td>
        <td>${users[i].email}</td>
        <td>
          ${
            users[i].status == "true"
              ? '<i class="fa-solid fa-lock-open btn-update"></i>'
              : '<i class="fa-solid fa-lock btn-update"></i>'
          } 
        </td>
      </tr>`;
  }
}

//thay đổi trạng thái
table.onclick = function (event) {
  if (event.target.classList.contains("btn-update")) {
    let id = event.target.parentElement.parentElement.id;
    let check = -1;
    for (let i = 0; i < users.length; i = i + 1) {
      if (users[i].user_id === Number(id)) {
        check = i;
      }
    }
    if (check > -1) {
      if (users[check].status == "true") {
        users[check] = {
          user_id: users[check].user_id,
          userName: users[check].userName,
          email: users[check].email,
          fullName: users[check].fullName,
          status: "false",
          password: users[check].password,
          role: users[check].role,
          avatar: users[check].avatar,
          phone: users[check].phone,
          adress: users[check].adress,
          online: users[check].online,
        };
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
      } else {
        users[check] = {
          user_id: users[check].user_id,
          userName: users[check].userName,
          email: users[check].email,
          fullName: users[check].fullName,
          status: "true",
          password: users[check].password,
          role: users[check].role,
          avatar: users[check].avatar,
          phone: users[check].phone,
          adress: users[check].adress,
          online: users[check].online,
        };
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
      }
    }
  }
};

// chức năng logout
// Lấy ra phần tử có ID là "logout"
let logoutButton = document.getElementById("logout");
// Thêm sự kiện click vào phần tử
logoutButton.addEventListener("click", function () {
  for (let i = 0; i < users.length; i++) {
    users[i].online = {
      user_id: users[i].user_id,
      userName: users[i].userName,
      email: users[i].email,
      fullName: users[i].fullName,
      status: users[i].status,
      password: users[i].password,
      role: users[i].role,
      avatar: users[i].avatar,
      phone: users[i].phone,
      adress: users[i].adress,
      online: "false",
    };
  }
  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire("Đăng xuất thành công", "Cảm ơn bạn", "success");
  setTimeout(
    " window.location.href = 'http://127.0.0.1:5500/dangnhap.html';",
    500
  );
});
