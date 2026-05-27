// ===== DỮ LIỆU =====
let danhSachSach = [];
let idTiepTheo = 1; // đánh số thứ tự tự động

// ===== HÀM 1: Thêm sách =====
function themSach() {
  // Bước 1: Lấy giá trị từ các ô input
  let ten     = document.getElementById("inputTen").value.trim();
  let tacGia  = document.getElementById("inputTacGia").value.trim();
  let theLoai = document.getElementById("inputTheLoai").value.trim();
  let nam     = document.getElementById("inputNam").value.trim();

  // Bước 2: Kiểm tra ô trống (if/else)
  if (ten === "" || tacGia === "" || theLoai === "" || nam === "") {
    hienThongBao("Vui lòng điền đầy đủ thông tin!", "loi");
    return; // dừng hàm, không làm gì thêm
  }

  // Bước 3: Tạo object sách mới
  let sachMoi = {
    id: idTiepTheo,
    ten: ten,
    tacGia: tacGia,
    theLoai: theLoai,
    nam: nam
  };

  // Bước 4: Thêm vào mảng
  danhSachSach.push(sachMoi);
  idTiepTheo++;

  // Bước 5: Cập nhật giao diện
  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  xoaForm();
  hienThongBao("Thêm sách thành công!", "ok");
}

// ===== HÀM 2: Hiển thị danh sách ra bảng =====
function hienThiDanhSach(mangSach) {
  let bang = document.getElementById("bangSach");

  // Nếu không có sách nào
  if (mangSach.length === 0) {
    bang.innerHTML = `<tr><td colspan="6" class="empty">Chưa có sách nào!</td></tr>`;
    return;
  }

  // Dùng vòng lặp tạo từng hàng <tr>
  let html = "";
  for (let i = 0; i < mangSach.length; i++) {
    let s = mangSach[i];
    html += `
      <tr>
        <td style="color:#a89070">${i + 1}</td>
        <td style="font-weight:500">${s.ten}</td>
        <td>${s.tacGia}</td>
        <td><span class="badge">${s.theLoai}</span></td>
        <td>${s.nam}</td>
        <td>
          <button class="btn-xoa" onclick="xoaSach(${s.id})">🗑 Xóa</button>
        </td>
      </tr>
    `;
  }
  bang.innerHTML = html;
}

// ===== HÀM 3: Xóa form sau khi thêm =====
function xoaForm() {
  document.getElementById("inputTen").value    = "";
  document.getElementById("inputTacGia").value = "";
  document.getElementById("inputTheLoai").value = "";
  document.getElementById("inputNam").value    = "";
}

// ===== HÀM 4: Hiện thông báo =====
function hienThongBao(noiDung, loai) {
  let hop = document.getElementById("thongBao");
  hop.innerText = noiDung;
  hop.style.display = "block";
  hop.className = loai === "loi" ? "tb-loi" : "tb-ok";

  // Tự ẩn sau 3 giây
  setTimeout(() => { hop.style.display = "none"; }, 3000);
}

// ===== HÀM 5: Cập nhật thống kê =====
function capNhatThongKe() {
  document.getElementById("tongSach").innerText = danhSachSach.length;

  // Đếm số thể loại không trùng nhau
  let cacTheLoai = [];
  for (let i = 0; i < danhSachSach.length; i++) {
    if (!cacTheLoai.includes(danhSachSach[i].theLoai)) {
      cacTheLoai.push(danhSachSach[i].theLoai);
    }
  }
  document.getElementById("tongTheLoai").innerText = cacTheLoai.length;
}

// ===== GẮN SỰ KIỆN =====
document.getElementById("btnThem").addEventListener("click", themSach);
// ===========================
// DỮ LIỆU
// ===========================


// ===========================
// HÀM 1: Thêm sách
// ===========================
function themSach() {
  // Bước 1: Lấy giá trị từ input
  let ten     = document.getElementById("inputTen").value.trim();
  let tacGia  = document.getElementById("inputTacGia").value.trim();
  let theLoai = document.getElementById("inputTheLoai").value.trim();
  let nam     = document.getElementById("inputNam").value.trim();

  // Bước 2: Kiểm tra ô trống (if/else ✅)
  if (ten === "" || tacGia === "" || theLoai === "" || nam === "") {
    hienThongBao("Vui lòng điền đầy đủ thông tin!", "loi");
    return; // dừng hàm tại đây
  }

  // Bước 3: Tạo object sách mới
  let sachMoi = {
    id: idTiepTheo,
    ten: ten,
    tacGia: tacGia,
    theLoai: theLoai,
    nam: nam
  };

  // Bước 4: Thêm vào mảng + tăng id
  danhSachSach.push(sachMoi);
  idTiepTheo++;

  // Bước 5: Cập nhật giao diện
  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  xoaForm();
  hienThongBao("Thêm sách thành công! 🎉", "ok");
}


// ===========================
// HÀM 2: Hiển thị danh sách
// ===========================
function hienThiDanhSach(mangSach) {
  let bang = document.getElementById("bangSach");

  // Nếu mảng rỗng
  if (mangSach.length === 0) {
    bang.innerHTML = `
      <tr>
        <td colspan="6" class="empty">Chưa có sách nào. Hãy thêm sách mới!</td>
      </tr>`;
    return;
  }

  // Vòng lặp tạo từng hàng <tr> (vòng lặp ✅)
  let html = "";
  for (let i = 0; i < mangSach.length; i++) {
    let s = mangSach[i];
    html += `
      <tr>
        <td style="color:#a89070">${i + 1}</td>
        <td style="font-weight:500">${s.ten}</td>
        <td>${s.tacGia}</td>
        <td><span class="badge">${s.theLoai}</span></td>
        <td>${s.nam}</td>
        <td>
          <button class="btn-xoa" onclick="xoaSach(${s.id})">🗑 Xóa</button>
        </td>
      </tr>`;
  }
  bang.innerHTML = html;
}


// ===========================
// HÀM 3: Xóa sách
// ===========================
function xoaSach(id) {
  // filter giữ lại những sách KHÔNG có id này
  danhSachSach = danhSachSach.filter(function(sach) {
    return sach.id !== id;
  });

  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  hienThongBao("Đã xóa sách.", "ok");
}


// ===========================
// HÀM 4: Tìm kiếm
// ===========================
function timKiem() {
  let tuKhoa = document.getElementById("inputTimKiem").value.trim().toLowerCase();

  // Nếu ô tìm kiếm trống → hiện lại toàn bộ
  if (tuKhoa === "") {
    hienThiDanhSach(danhSachSach);
    return;
  }

  // Lọc những sách có tên hoặc tác giả chứa từ khoá
  let ketQua = [];
  for (let i = 0; i < danhSachSach.length; i++) {
    let ten    = danhSachSach[i].ten.toLowerCase();
    let tacGia = danhSachSach[i].tacGia.toLowerCase();

    if (ten.includes(tuKhoa) || tacGia.includes(tuKhoa)) {
      ketQua.push(danhSachSach[i]);
    }
  }

  hienThiDanhSach(ketQua);
}


// ===========================
// HÀM 5: Cập nhật thống kê
// ===========================
function capNhatThongKe() {
  // Tổng số sách
  document.getElementById("tongSach").innerText = danhSachSach.length;

  // Đếm thể loại không trùng (vòng lặp ✅)
  let cacTheLoai = [];
  for (let i = 0; i < danhSachSach.length; i++) {
    if (!cacTheLoai.includes(danhSachSach[i].theLoai)) {
      cacTheLoai.push(danhSachSach[i].theLoai);
    }
  }
  document.getElementById("tongTheLoai").innerText = cacTheLoai.length;
}


// ===========================
// HÀM 6: Xoá form sau khi thêm
// ===========================
function xoaForm() {
  document.getElementById("inputTen").value     = "";
  document.getElementById("inputTacGia").value  = "";
  document.getElementById("inputTheLoai").value = "";
  document.getElementById("inputNam").value     = "";
}


// ===========================
// HÀM 7: Hiện thông báo
// ===========================
function hienThongBao(noiDung, loai) {
  let hop = document.getElementById("thongBao");
  hop.innerText    = noiDung;
  hop.style.display = "block";
  hop.className    = (loai === "loi") ? "tb-loi" : "tb-ok";

  // Tự ẩn sau 3 giây
  setTimeout(function() {
    hop.style.display = "none";
  }, 3000);
}


// ===========================
// GẮN SỰ KIỆN
// ===========================
document.getElementById("btnThem").addEventListener("click", themSach);
document.getElementById("inputTimKiem").addEventListener("input", timKiem);