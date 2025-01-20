// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));
let orders = JSON.parse(localStorage.getItem("orders"));
let order_detail = JSON.parse(localStorage.getItem("order_detail"));
let catagory = JSON.parse(localStorage.getItem("catagory"));
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
//kết thúc phần hiện thị use đăng nhập
const productContainerAll = document.getElementById("product-container-toanbo");

// Tạo HTML cho mỗi sản phẩm và thêm vào trong productContainer
for (let i = products.length - 1; i >= 0; i--) {
  let product = products[i];
  for (let i = 0; i <= catagory[0].products.length; i++) {
    let productHTML = ``;
    if (product.product_id == catagory[0].products[i]) {
      productHTML = `
      <div class="col-12 col-sm-6 col-lg-4">
      <div class="product-item">
        <div class="product-img">
          <a class="image" href=""><img class="img-fluid" src="${product.image}" alt=""></a>
          <div id="${product.product_id}" class="product-action">
            <button href="" class="btn_view">
              <i class="fa-regular fa-eye"></i>
            </button>
             <button class="btn_cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <a class="product-name" href="#">${product.product_name}</a>
          <div class="price">
            <span class="price-new">${product.unit_price}đ</span>
          </div>
        </div>
      </div>
    </div>
        `;
    }

    // Thêm sản phẩm vào trong productContainer
    productContainerAll.innerHTML += productHTML;
  }
}

//sản phẩm nổi bật
let containerBanh = document.getElementById("product-container-noibat");
for (let i = 0; i < 4; i++) {
  let product = products[i];
  const productHTML = `
    <li class="danhmuc-item">
                <div class="row">
                  <div class="col-5">
                    <a href=""><img class="img-fluid" src="${product.image}" alt=""></a>
                  </div>
                  <div class="product-info col-7 pl-0">
                    <h6><a class="product-name" href="#">${product.product_name}</a></h6>
                    <div class="price">
                      <span class="price-new">${product.unit_price}đ</span>
                    </div>
                  </div>
                </div>
              </li>
    `;
  containerBanh.innerHTML += productHTML;
}
// thêm sản phẩm vào giỏ hàng
// Lấy ra tất cả các button btn_cart
let buttons = document.querySelectorAll("button.btn_cart");

// Duyệt qua từng button và thêm sự kiện click
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    // Lấy ra thẻ cha của button đã được click
    let parentDiv = event.target.closest(".product-action");

    // Kiểm tra xem thẻ cha có tồn tại không
    if (parentDiv) {
      // Lấy ra ID của thẻ cha
      let productId = parentDiv.id;
      console.log(productId);
      // Kiểm tra xem sản phẩm có trong giỏ hàng không
      let productInCart = order_detail.find(
        (item) =>
          item.product_id === productId &&
          item.order_id === orders[oderCartUse].order_id
      );

      if (productInCart) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        productInCart.order_quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
        let newOrderDetail = {
          order_detail_id:
            order_detail.length > 0
              ? order_detail[order_detail.length - 1].order_detail_id + 1
              : 1, // nếu không rỗng thì tăng giá trị lên 1 và trả về giá trị mới. Nếu rỗng thì trả về phần tử mới bắt đầu từ 1
          order_id: orders[oderCartUse].order_id,
          product_id: productId,
          name: orders[oderCartUse].product_name,
          unit_price: orders[oderCartUse].unit_price,
          order_quantity: 1,
        };
        order_detail.push(newOrderDetail);
        orders[oderCartUse].order_details.push(newOrderDetail.order_detail_id);
      }

      // Cập nhật localStorage và tải lại trang
      localStorage.setItem("order_detail", JSON.stringify(order_detail));
      localStorage.setItem("orders", JSON.stringify(orders));
      location.reload();
    }
  });
});

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
//chức năng xem thông tin tài khoản
// Thêm sự kiện onclick
userNameLink.onclick = function () {
  // xét vị trí của user đang online trong mảng user vào localStorage
  localStorage.setItem("useronline", JSON.stringify(userOnl));
  window.location.href = "http://127.0.0.1:5503/xemthongtinuser.html";
};

//chức năng xem chi tiết
// Lấy ra tất cả các button btn_view
let wiewButtons = document.querySelectorAll("button.btn_view");

// Duyệt qua từng button và thêm sự kiện click
wiewButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    // Lấy ra thẻ cha của button đã được click
    let parentDiv = event.target.closest(".product-action");

    // Kiểm tra xem thẻ cha có tồn tại không
    if (parentDiv) {
      // Lấy ra ID của thẻ cha
      let productId = parentDiv.id;
      // xét productId của sản phẩm đang chọn xem trong mảng products vào localStorage
      localStorage.setItem("productView", JSON.stringify(productId));
      window.location.href = "http://127.0.0.1:5503/sanphamxemchitiet.html";
    }
  });
});
