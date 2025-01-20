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
let userOnl = -1;
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
if (userOnl != -1) {
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
}
//kết thúc phần hiện thị use đăng nhập

let productView = JSON.parse(localStorage.getItem("productView"));
let viewsp = document.getElementById("viewsp");
for (let i = 0; i < products.length; i++) {
  if (products[i].product_id == Number(productView)) {
    viewsp.innerHTML = `
        <h4>CHI TIẾT SẢN PHẨM</h4>
        <div>
          <div class="product-item chitietsanpham">
            <div class="product-img">
              <a class="image anhchitiet" href=""><img class="img-fluid" src="${
                products[i].image
              }" alt=""></a>
              <div id ="${products[i].product_id}" class="product-action">
              ${
                userOnl != -1
                  ? `<button id="btn_cart" class="btn_cart"> 
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>`
                  : ""
              }
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
            <div class="product-info">
              <a class="product-name" href="#">${products[i].product_name}</a>
              <div class="price">
                <span class="price-new">${products[i].unit_price}đ</span>
              </div>
            </div>
          </div>
        </div>
        <div class="thongtinsanpham">
        <b>Thông tin chi tiết sản phẩm</b>
          <p>${products[i].description}</p>
        </div>
        `;
    if (userOnl != -1) {
      // thêm sản phẩm vào giỏ hàng
      let button = document.getElementById("btn_cart");
      button.addEventListener("click", function (event) {
        // Lấy ra thẻ cha của button đã được click
        let parentDiv = event.target.closest(".product-action");

        // Kiểm tra xem thẻ cha có tồn tại không
        if (parentDiv) {
          // Lấy ra ID của sản phẩm
          let productId = parentDiv.id;

          // Tìm sản phẩm trong giỏ hàng
          let productInCart = order_detail.find(
            (item) =>
              item.product_id === productId &&
              item.order_id === orders[oderCartUse].order_id
          );

          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
          if (productInCart) {
            productInCart.order_quantity += 1;
          } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
            let newOrderDetail = {
              order_detail_id:
                order_detail.length > 0
                  ? order_detail[order_detail.length - 1].order_detail_id + 1
                  : 1,
              order_id: orders[oderCartUse].order_id,
              product_id: productId,
              name: orders[oderCartUse].product_name,
              unit_price: orders[oderCartUse].unit_price,
              order_quantity: 1,
            };
            order_detail.push(newOrderDetail);
            orders[oderCartUse].order_details.push(
              newOrderDetail.order_detail_id
            );
          }

          // Cập nhật localStorage và tải lại trang
          localStorage.setItem("order_detail", JSON.stringify(order_detail));
          localStorage.setItem("orders", JSON.stringify(orders));
          location.reload();
        }
      });
    }
  }
}
//sản phẩm nổi bật
let containerBanh = document.getElementById("product-container-noibat");
for (let i = 0; i < 8; i++) {
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
