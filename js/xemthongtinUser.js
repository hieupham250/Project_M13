let users = JSON.parse(localStorage.getItem("users"));
let useronline = JSON.parse(localStorage.getItem("useronline"));
let formContainer = document.getElementById("formContainer");
formContainer.innerHTML = `
 <div class="mb-3">
 <img src="${users[useronline].avatar}" class="img-fluid" alt="Avatar">
   </div>
   <div class="mb-3">
       <label for="userName" class="form-label">Username:</label>
       <input type="text" class="form-control"  name="userName" value="${users[useronline].userName}" readonly>
   </div>
   <div class="mb-3">
       <label for="email" class="form-label">Email:</label>
       <input type="email" class="form-control" name="email" value="${users[useronline].email}" readonly>
   </div>
   <div class="mb-3">
       <label for="fullName" class="form-label">Full Name:</label>
       <input type="text" class="form-control" name="fullName" value="${users[useronline].fullName}" readonly>
   </div>
   <div class="mb-3">
       <label for="phone" class="form-label">Phone:</label>
       <input type="tel" class="form-control" name="phone" value="${users[useronline].phone}" readonly>
   </div>
   <div class="mb-3">
       <label for="address" class="form-label">Address:</label>
       <input type="text" class="form-control" name="address" value="${users[useronline].adress}" readonly>
   </div>
   <button type="button" id="edit" class="btn btn-primary">Chỉnh sửa</button>
 `;
let fileName = "";
let btnEdit = document.getElementById("edit");
btnEdit.onclick = function () {
  formContainer.innerHTML = `
 
    <div class="mb-3">
    <label for="avatar" class="form-label">avatar:</label>
    <input type="file" class="form-control-file" name="avatarFile" id="avatarFileInput">
      </div>
      <div class="mb-3">
          <label for="userName" class="form-label">Username:</label>
          <input type="text" class="form-control"  name="userName" value="${users[useronline].userName}" >
      </div>
      <div class="mb-3">
          <label for="password" class="form-label">password:</label>
          <input type="text" class="form-control"  name="password" value="${users[useronline].password}" >
      </div>
      <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" name="email" value="${users[useronline].email}" >
      </div>
      <div class="mb-3">
          <label for="fullName" class="form-label">Full Name:</label>
          <input type="text" class="form-control" name="fullName" value="${users[useronline].fullName}" >
      </div>
      <div class="mb-3">
          <label for="phone" class="form-label">Phone:</label>
          <input type="tel" class="form-control" name="phone" value="${users[useronline].phone}" >
      </div>
      <div class="mb-3">
          <label for="address" class="form-label">Address:</label>
          <input type="text" class="form-control" name="address" value="${users[useronline].adress}" >
      </div>
      <button type="submit" id="edit" class="btn btn-primary">lưu</button>
      <button type="button" id="cancel" class="btn btn-danger">hủy</button>
    `;

  // chỉnh sửa thông tin
  let avatarFileInput = document.getElementById("avatarFileInput");
  avatarFileInput.addEventListener("change", function (event) {
    const input = event.target;
    fileName = input.files[0].name;
    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();
      let avatar = users[useronline].avatar;
      if (fileName != "") {
        avatar = "./imgUpload/" + fileName; // up load ảnh mới
      }

      let userName = event.target.userName.value;
      let email = event.target.email.value;
      let fullName = event.target.fullName.value;
      let phone = event.target.phone.value;
      let address = event.target.address.value;
      let password = event.target.password.value;
      users[useronline] = {
        user_id: users[useronline].user_id,
        userName: userName,
        email: email,
        fullName: fullName,
        status: users[useronline].status,
        password: password,
        role: users[useronline].role,
        avatar: avatar,
        phone: phone,
        adress: address,
        online: users[useronline].online,
      };
      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    });
  });

  // nếu ấn hủy
  let cancel = document.getElementById("cancel");
cancel.addEventListener("click", function(){
  location.reload();
})
};

