// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));
let orders = JSON.parse(localStorage.getItem("orders"));
let order_detail = JSON.parse(localStorage.getItem("order_detail"));
// Lấy phần tử có id là "myAccountHeader"
let accountHeader = document.getElementById("myAccountHeader");
let userOnline = document.getElementById("userOnline");
let userNameLink = document.getElementById("userName");
let avatarImage = document.getElementById("avatar");
let cardShow = document.getElementById("card-show");
let quantity1 = document.getElementById("quantity1");
let quantity2 = document.getElementById("quantity2");
let userOnl = 0;
let oderCartUse = -1;
for (let i = 0; i < users.length; i++) {
  if (users[i].online == "true") {
    accountHeader.style.display = "none";
    userOnline.style.display = "block";
    userNameLink.textContent = users[i].fullName;
    avatarImage.src = users[i].avatar;
    cardShow.classList.remove("card-show");
    userOnl = i;
    break;
    //duyệt qua tất cả oder nếu là status 1 nghĩa là giỏ hàng và của use đang onl thì tính số oder chi tiết
  }
  
}
//kết thúc phần hiện thị use đăng nhập
//phần hiện thị giỏ hàng
let sum = 0;
let cardUseronl = [];
for (let i = 0; i < orders.length; i++) {
  if (orders[i].user_id == users[userOnl].user_id && orders[i].status == 1) {
    cardUseronl = orders[i].order_details;
    oderCartUse = i;
    break;
  }
}
if (cardUseronl.length != 0) {
  for (let i = 0; i < cardUseronl.length; i++) {
    for (let j = 0; j < order_detail.length; j++) {
      if (cardUseronl[i] == order_detail[j].order_detail_id) {
        sum = sum + order_detail[j].order_quantity;
      }
    }
  }
  quantity1.innerHTML = sum;
  quantity2.innerHTML = sum;
} else {
  quantity1.innerHTML = 0;
  quantity2.innerHTML = 0;
}
//lấy các sản phẩm trong giỏ hàng
//tạo ra mảng đối tượng gồm ID sản phẩm và số lượng trong giỏ hàng
let productCart = [];
for (let i = 0; i < cardUseronl.length; i++) {
  for (let j = 0; j < order_detail.length; j++) {
    if (cardUseronl[i] == order_detail[j].order_detail_id) {
      productCart.push({
        product_id: order_detail[j].product_id,
        order_quantity: order_detail[j].order_quantity,
        order_detail_id: order_detail[j].order_detail_id,
      });
    }
  }
}
// kết hợp dữ liệu tạo ra dữ liệu hoàn chỉnh
let cartproduct = [];
for (let i = 0; i < productCart.length; i++) {
  for (let j = 0; j < products.length; j++) {
    if (productCart[i].product_id == products[j].product_id) {
      cartproduct.push({
        product_id: productCart[i].product_id,
        product_name: products[j].product_name,
        unit_price: products[j].unit_price,
        image: products[j].image,
        order_quantity: productCart[i].order_quantity,
        order_detail_id: productCart[i].order_detail_id,
      });
    }
  }
}
//hiện thị giỏ hàng
//tổng tiền có ship
let priceTotalAll = document.getElementById("priceTotalAll");
let showCard = document.getElementById("showCard");
let priceTotalcart = 0;
for (let i = 0; i < cartproduct.length; i++) {
  let product = cartproduct[i];
  priceTotalcart = priceTotalcart + product.unit_price * product.order_quantity;
  const productHTML = `
    <div class="product-item">
                        <img src="${product.image}" alt="">
                        <div class="product-info">
                            <div class="product-name">Lamington</div>
                            <input type="text" value="${product.order_quantity}">
                        </div>
                        <div class="price">${product.unit_price}đ</div>
                    </div>
    `;
  showCard.innerHTML += productHTML;
}
let priceTotal = document.getElementById("priceTotal");
if (cartproduct.length == 0) {
  priceTotal.innerHTML = 0 + "đ";
  priceTotalAll.innerHTML = 0;
} else {
  priceTotal.innerHTML = priceTotalcart + "đ";
  priceTotalAll.innerHTML = priceTotalcart + 40000 + "đ";
}

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
    " window.location.href = 'http://127.0.0.1:5503/dangnhap.html';",
    500
  );
});
