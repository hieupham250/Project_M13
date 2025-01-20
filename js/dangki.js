// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let registerForm = document.getElementById("register");
registerForm.onsubmit = function (event) {
  event.preventDefault();
  let username = registerForm.username.value.trim();
  let email = registerForm.email.value.trim();
  let phone = registerForm.phone.value.trim();
  let fullname = registerForm.fullname.value.trim();
  let password = registerForm.password.value.trim();
  let address = registerForm.address.value.trim();
  let check = -1;
  for (let i = 0; i < users.length; i++) {
    if (username == users[i].userName) {
      check = i;
    }
  }
  if (check != -1) {
    Swal.fire("Oops!", "Tài khoản đã tồn tại, hãy đăng nhập", "error");
  } else if (username.length > 5 && password.length > 5) {
    users.push({
      user_id: users[users.length - 1].user_id + 1,
      userName: username,
      email: email,
      fullName: fullname,
      status: "true",
      password: password,
      role: "user",
      avatar: "./img/avatar-trang-4.jpg",
      phone: phone,
      adress: address,
      online: "false",
    });
    //chuyển thành một chuỗi JSON để lưu.
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire("Đăng ký thành công", "Cảm ơn bạn", "success");
    setTimeout(
      " window.location.href = 'http://127.0.0.1:5500/dangnhap.html';",
      500
    );
  } else {
    Swal.fire("Oops!", "tên đăng nhập hoặc mật khẩu của bạn quá ngắn", "error");
  }
};

