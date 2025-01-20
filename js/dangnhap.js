// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let loginForm = document.getElementById("login");
let orders = JSON.parse(localStorage.getItem("orders"));
loginForm.onsubmit = function (event) {
  event.preventDefault();
  let username = loginForm.username.value.trim();
  let password = loginForm.password.value.trim();
  let check = -1;

  for (let i = 0; i < users.length; i++) {
    if (username == users[i].userName && password == users[i].password) {
      check = i;
    } else {
      users[i].online = "false";
    }
  }
  if (check == -1) {
    Swal.fire(
      "Oops!",
      "Kiểm tra lại đăng nhập, nếu bạn chưa có tài khoản nhớ đăng kí",
      "error"
    );
  } else if (users[check].status == "false") {
    Swal.fire("Oops!", "Tài khoản đã bị khóa, hãy liên hệ admin", "error");
  } else {
    users[check].online = "true";
    localStorage.setItem("users", JSON.stringify(users));
    if (users[check].role == "admin") {
      Swal.fire("Đăng nhập thành công", "xin chào admin", "success");
      setTimeout(
        " window.location.href = 'http://127.0.0.1:5500/adminSP.html';",
        500
      );
    } else {
      let checkCart = -1;
      for (let i = 0; i < orders.length; i++) {
        if (
          orders[i].status == 1 &&
          users[check].user_id == orders[i].user_id
        ) {
          checkCart = orders[i];
          break;
        }
      }
      //nếu checkCart=-1 thì nó chưa có giỏ hàng phải tạo mới
      if (checkCart == -1) {
        if (orders.length == 0) {
          orders.push({
            order_id: 1,
            serial_number: "MDH00" + 1,
            user_id: users[check].user_id,
            order_at: "",
            total_price: 0,
            status: 1,
            note: "",
            order_details: [],
            receive_name: "",
            receive_address: "",
            receive_phone: "",
          });
          localStorage.setItem("orders", JSON.stringify(orders));
        } else {
          orders.push({
            order_id: orders[orders.length - 1].order_id + 1, // tạo id mới
            serial_number: "MDH00" + orders[orders.length - 1].order_id + 1, // tạo id mới
            user_id: users[check].user_id,
            order_at: "", // thời gian đặt
            total_price: 0,
            status: 1,
            note: "", // nội dung
            order_details: [],
            receive_name: "", // người nhận hàng
            receive_address: "",
            receive_phone: "",
          });
          localStorage.setItem("orders", JSON.stringify(orders));
        }
      }
      Swal.fire("Đăng nhập thành công", "Cảm ơn bạn", "success");
      setTimeout(
        " window.location.href = 'http://127.0.0.1:5501/index.html';",
        500
      );
    }
  }
};
