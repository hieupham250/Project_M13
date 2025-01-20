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

//hiện thị bánh nổi bật
let btnBanhTab = document.getElementById("nav-banh-tab");
let btnTraTab = document.getElementById("nav-tra-tab");
let containerBanh = document.getElementById("product-container-banh");
for (let i = 0; i < 4; i++) {
  let product = products[i];
  const productHTML = `
  <div class="col-12 col-sm-6 col-lg-3">
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
        <span class="price-new">${product.unit_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
      </div>
    </div>
  </div>
</div>
    `;
  containerBanh.innerHTML += productHTML;
}
//click vào tab bánh
btnBanhTab.addEventListener("click", function () {
  // Thêm lớp "active" vào nút khi được click
  btnBanhTab.classList.add("active");
  // Xóa lớp "active" từ tất cả các nút khác
  let allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach(function (link) {
    if (link !== btnBanhTab) {
      link.classList.remove("active");
    }
  });
  containerBanh.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    let product = products[i];
    const productHTML = `
    <div class="col-12 col-sm-6 col-lg-3">
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
    containerBanh.innerHTML += productHTML;
  }
  attachAddToCartEvent();
  attachToViewEvent();
});

//click vào tab trà
btnTraTab.addEventListener("click", function () {
  // Thêm lớp "active" vào nút khi được click
  btnTraTab.classList.add("active");
  // Xóa lớp "active" từ tất cả các nút khác
  let allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach(function (link) {
    if (link !== btnTraTab) {
      link.classList.remove("active");
    }
  });
  containerBanh.innerHTML = "";
  //hiện thị trà nổi bật
  for (let i = 4; i < 8; i++) {
    let product = products[i];
    const productHTML = `
    <div class="col-12 col-sm-6 col-lg-3">
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
    containerBanh.innerHTML += productHTML;
  }
  attachAddToCartEvent();
  attachToViewEvent();
});

//hiện thị sản phẩm mới
// Lặp qua danh sách sản phẩm và render ra HTML tương ứng
// Lấy đối tượng chứa sản phẩm
const productContainerMoi = document.getElementById("product-container-moi");
// Tạo HTML cho mỗi sản phẩm và thêm vào trong productContainer
for (let i = products.length - 1; i > products.length - 5; i--) {
  let product = products[i];
  const productHTML = `
      <div class="col-sm-12 col-md-6 mb-4">
        <div class="food-new-card">
          <div class="product-img">
            <a href=""><img class="img-fluid" src="${product.image}" alt=""></a>
          </div>
          <div class="product-info">
            <h6><a class="product-name" href="">${product.product_name}</a></h6>
            <div class="price">
              <span class="price-new">${product.unit_price}đ</span>
              <span class="description">Đang cập nhật...</span>
            </div>
          </div>
        </div>
      </div>
    `;

  // Thêm sản phẩm vào trong productContainer
  productContainerMoi.innerHTML += productHTML;
}
// thêm sản phẩm vào giỏ hàng
// Hàm để gán sự kiện click cho các nút thêm vào giỏ hàng
function attachAddToCartEvent() {
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
  });
}

// Sau khi tạo lại các sản phẩm ở cả tab "Bánh" và "Trà"
// Gọi hàm để gán sự kiện click cho các nút thêm vào giỏ hàng
attachAddToCartEvent();

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

//xem chi tiết
function attachToViewEvent() {
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
}
attachToViewEvent();
