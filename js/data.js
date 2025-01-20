let users = [
  {
    user_id: 1,
    userName: "hieupham",
    email: "hieupham@gmail.com",
    fullName: "Pham Trung Hieu",
    status: "true",
    password: "hieupham",
    role: "user",
    avatar: "./img2/avatarhieupham.jpg",
    phone: "0368857275",
    adress: "Hà Nội",
    online: "flase",
  },
  {
    user_id: 2,
    userName: "thanhcong",
    email: "thanhcong@gmail.com",
    fullName: "Nguyễn Thành Công",
    status: "true",
    password: "thanhcong",
    role: "user",
    avatar: "./img2/avatarthanhcong.jpg",
    phone: "0375848486",
    adress: "HCM",
    online: "false",
  },
  {
    user_id: 3,
    userName: "admin",
    email: "admin@gmail.com",
    fullName: "admin",
    status: "true",
    password: "admin",
    role: "admin",
    avatar: "./img2/avataradmin.jpg",
    phone: "0923233467",
    adress: "Đà Nẵng",
    online: "false",
  },
];
// xét dữ liệu vào data user vào localStorage
localStorage.setItem("users", JSON.stringify(users));
let catagory = [
  // data catgory 1
  {
    catagory_id: 1,
    catagory_name: "bánh",
    description: "bánh",
    status: "true",
    products: [1, 2, 3, 4], // product_id của tất cả sản phẩm bánh
  },
  // data catgory 2
  {
    catagory_id: 2,
    catagory_name: "trà",
    description: "trà",
    status: "true",
    products: [5, 6, 7, 8], // product_id của tất cả sản phẩm trà
  },
];
localStorage.setItem("catagory", JSON.stringify(catagory));

let products = [
  {
    product_id: 1,
    product_name: "CAPUCCINO",
    description:
      "Bánh gato trắng lớp kem phô mai vị coffee, phủ cacao và decor hoa quả",
    unit_price: 150000,
    image: "./img2/b1.webp",
  },
  {
    product_id: 2,
    product_name: "COCONUT CAKE",
    description:
      "Bánh gato lớp kem tươi vị coffee, dừa tươi sấy khô và trang trí hoa quả",
    unit_price: 200000,
    image: "./img2/b4.webp",
  },
  {
    product_id: 3,
    product_name: "GREENTEA CAKE 3",
    description:
      "Bánh gato trắng lớp kem tươi trà xanh vị rượu rum, phủ bột trà xanh và trang trí hoa quả",
    unit_price: 230000,
    image: "./img2/b2.webp",
  },
  {
    product_id: 4,
    product_name: "FRUIT CAKE",
    description:
      "Bánh gato trắng lớp kem tươi vị rượu rum (nho), trang trí hoa quả và dừa khô.",
    unit_price: 300000,
    image: "./img2/b3.webp",
  },
  {
    product_id: 5,
    product_name: "TRÀ SỮA OLONG TRÂN CHÂU",
    description: "trà sữa Olong trân châu.",
    unit_price: 30000,
    image: "./img2/t1.png",
  },
  {
    product_id: 6,
    product_name: "TRÀ SỮA TRÂN CHÂU CHOCOLATE",
    description: "trà sữa trân châu chocolate.",
    unit_price: 25000,
    image: "./img2/t2.png",
  },
  {
    product_id: 7,
    product_name: "TRÀ ATISO ĐỎ HẠT BOBA",
    description: "trà atiso đỏ hạt boba.",
    unit_price: 24000,
    image: "./img2/t3.png",
  },
  {
    product_id: 8,
    product_name: "TRÀ VIỆT QUẤT HẠT BOBA",
    description: "trà việt quất boba.",
    unit_price: 28000,
    image: "./img2/t4.png",
  },
];
// xét dữ liệu vào data user vào localStorage
localStorage.setItem("products", JSON.stringify(products));

let orders = [];
// xét dữ liệu vào data user vào localStorage
localStorage.setItem("orders", JSON.stringify(orders));

let order_detail = [];
localStorage.setItem("order_detail", JSON.stringify(order_detail));
