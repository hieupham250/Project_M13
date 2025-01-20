let catagory = JSON.parse(localStorage.getItem("catagory"));
let orders = JSON.parse(localStorage.getItem("orders"));
let order_detail = JSON.parse(localStorage.getItem("order_detail"));
// lấy tất cả thông tin của user
let users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));
let userNameLink = document.getElementById("userName");
let avatarImage = document.getElementById("avatar");
let checkAdmin = -1; // online
for (let i = 0; i < users.length; i++) {
  if (users[i].role == "admin") {
    checkAdmin = i;
    break;
  }
}
userNameLink.textContent = users[checkAdmin].fullName;
avatarImage.src = users[checkAdmin].avatar;
//kết thúc phần hiện thị use đăng nhập

const productContainerAll = document.getElementById("product-container-toanbo");
// Tạo HTML cho mỗi sản phẩm và thêm vào trong productContainer
for (let i = products.length - 1; i >= 0; i--) {
  let product = products[i];
  const productHTML = `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="product-item">
        <div class="product-img">
          <a class="image" href=""><img class="img-fluid" src="${product.image}" alt=""></a>
          <div class="product-action">
            <button class="btn_view" data-toggle="modal" data-target="#modal-${product.product_id}">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button id="${product.product_id}" class="btn_delete">
            <i class="fa-solid fa-trash"></i>
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
    <!-- Modal -->
    <div class="modal fade" id="modal-${product.product_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-body">
        <form id="product-form-edit">
        <input name="productId" value="${product.product_id}" type="hidden">
          <div class="fisrt-input">
          <label >Ảnh sản phẩm</label>
          <input type="file" class="form-control-file" name="avatarFile" id="avatarFileInputEdit">
          </div>
          <div>
           <label >Tên sản phẩm:</label>
            <input type="text"  name="productName" value="${product.product_name}" required>
          </div>       
          <div>
            <label>Giá sản phẩm:</label>
            <input type="number"  name="productPrice" value="${product.unit_price}đ" required>
          </div>
          <div>
            <label>Thông tin sản phẩm:</label>
            <textarea  name="productDescription" rows="5" required>${product.description}</textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Lưu</button>
          </div>
      </form> 
      </div>
    </div>
  `;

  // Thêm sản phẩm vào trong productContainer
  productContainerAll.innerHTML += productHTML;
}

//thêm sản phẩm
let avatarProduct = "";
let avatarFileInput = document.getElementById("avatarFileInput"); // Lấy phần tử input cho tệp hình ảnh
avatarFileInput.addEventListener("change", function (event) {
  const input = event.target;
  avatarProduct = input.files[0].name; // Lấy tên của tệp hình ảnh và gán cho biến avatarProduct
});
let productForm = document.getElementById("product-form");
productForm.onsubmit = function (event) {
  event.preventDefault();
  let image = avatarProduct;
  let productName = productForm.productName.value.trim();
  let productPrice = productForm.productPrice.value.trim();
  let productDescription = productForm.productDescription.value.trim();
  let productCassify = productForm.productCassify.value.trim();
  let newProductId = products[products.length - 1].product_id + 1;
  products.push({
    product_id: newProductId,
    product_name: productName,
    description: productDescription,
    unit_price: productPrice,
    image: "./imgUpload/" + image,
  });
  localStorage.setItem("products", JSON.stringify(products));
  if (productCassify == 1) {
    catagory[0].products.push(newProductId);
    localStorage.setItem("catagory", JSON.stringify(catagory));
    Swal.fire("Thêm mới thành công", "Cảm ơn bạn", "success");
    setTimeout(" location.reload();", 500);
  } else {
    catagory[1].products.push(newProductId);
    localStorage.setItem("catagory", JSON.stringify(catagory));
    Swal.fire("Thêm mới thành công", "Cảm ơn bạn", "success");
    setTimeout(" location.reload();", 500);
  }
};

//sửa sản phẩm
let avatarProductEdit = "";
// Lặp qua từng phần tử có id là "avatarFileInputEdit" và gắn trình lắng nghe sự kiện cho mỗi phần tử
document
  .querySelectorAll("#avatarFileInputEdit")
  .forEach((avatarFileInputEdit) => {
    avatarFileInputEdit.addEventListener("change", function (event) {
      const input = event.target;
      avatarProductEdit = input.files[0].name;
    });
  });
document.querySelectorAll("#product-form-edit").forEach((productFormEdit) => {
  productFormEdit.addEventListener("submit", function (event) {
    event.preventDefault();
    let productId = parseInt(productFormEdit.productId.value.trim());
    let image = "";
    if (avatarProductEdit != "") {
      image = "./imgUpload/" + avatarProductEdit;
    }
    console.log(image);
    let productName = productFormEdit.productName.value.trim();
    let productPrice = productFormEdit.productPrice.value.trim();
    let productDescription = productFormEdit.productDescription.value.trim();
    let check = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_id == productId) {
        check = i;
        break;
      }
    }
    if (check != -1) {
      products[check] = {
        product_id: products[check].product_id,
        image: image == "" ? products[check].image : image,
        unit_price: productPrice,
        product_name: productName,
        description: productDescription,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn có chắc muốn cập nhật lại sản phẩm không?",
        showCancelButton: true,
        confirmButtonText: "Vâng, cập nhật nó đi!",
        cancelButtonText: "Không, hủy bỏ!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("products", JSON.stringify(products));
          Swal.fire(
            "Đã cập nhật!",
            "Sản phẩm của bạn đã cập nhật.",
            "thành công"
          );
          setTimeout(" location.reload();", 500);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Đã hủy", "error");
          setTimeout(" location.reload();", 500);
        }
      });
    }
  });
});

//xóa
document.querySelectorAll(".btn_delete").forEach((button) => {
  button.addEventListener("click", function (event) {
    const buttonClicked = event.currentTarget;
    const productId = buttonClicked.id;
    let check = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_id == productId) {
        check = i;
        break;
      }
    }

    if (check != -1) {
      Swal.fire({
        icon: "warning",
        title: "Bạn có chắc muốn xóa không?",
        text: "Bạn sẽ không thể khôi phục sản phẩm này!",
        showCancelButton: true,
        confirmButtonText: "Vâng, xóa nó đi!",
        cancelButtonText: "Không, hủy bỏ!",
      }).then((result) => {
        if (result.isConfirmed) {
          products.splice(check, 1);
          localStorage.setItem("products", JSON.stringify(products));
          Swal.fire("Đã xóa!", "Sản phẩm của bạn đã bị xóa.", "thành công");
          setTimeout(" location.reload();", 500);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Đã hủy", "error");
          setTimeout(" location.reload();", 500);
        }
      });
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
