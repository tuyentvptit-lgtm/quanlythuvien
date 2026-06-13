//DỮ LIỆU
let danhSachSach = [];
let idTiepTheo = 1;
let idDangMuon = null;

//HÀM 1 Thêm sách
function themSach() {
  let ten     = document.getElementById("inputTen").value.trim();
  let tacGia  = document.getElementById("inputTacGia").value.trim();
  let theLoai = document.getElementById("inputTheLoai").value.trim();
  let nam     = document.getElementById("inputNam").value.trim();

  if (ten === "" || tacGia === "" || theLoai === "" || nam === "") {
    hienThongBao("Vui lòng điền đầy đủ thông tin!", "loi");
    return;
  }

  let sachMoi = {
    id: idTiepTheo,
    ten: ten,
    tacGia: tacGia,
    theLoai: theLoai,
    nam: nam,
    trangThai: "san-sang",
    nguoiMuon: "",
    ngayMuon: ""
  };

  danhSachSach.push(sachMoi);
  idTiepTheo++;

  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  xoaForm();
  hienThongBao("Thêm sách thành công! 🎉", "ok");
}

//HÀM 2 Hiển thị danh sách
function hienThiDanhSach(mangSach) {
  let bang = document.getElementById("bangSach");

  if (mangSach.length === 0) {
    bang.innerHTML = `
      <tr>
        <td colspan="7" class="empty">Chưa có sách nào. Hãy thêm sách mới!</td>
      </tr>`;
    return;
  }

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
          ${s.trangThai === "san-sang"
            ? `<span class="badge-san-sang">✅ Sẵn sàng</span>`
            : `<span class="badge-dang-muon">📖 Đang mượn<br>
               <small style="font-size:10px; color:#a89070">
                 ${s.nguoiMuon} · ${s.ngayMuon}
               </small></span>`
          }
        </td>
        <td style="display:flex; gap:6px; align-items:center;">
          ${s.trangThai === "san-sang"
            ? `<button class="btn-xoa" style="color:#2e7d32;"
                       onclick="moModalMuon(${s.id})">📖 Mượn</button>`
            : `<button class="btn-xoa" style="color:#1565c0;"
                       onclick="traSach(${s.id})">↩ Trả</button>`
          }
          <button class="btn-xoa" onclick="xoaSach(${s.id})">🗑 Xóa</button>
        </td>
      </tr>`;
  }
  bang.innerHTML = html;
}

// HÀM 3 Xóa sách
function xoaSach(id) {
  danhSachSach = danhSachSach.filter(function(sach) {
    return sach.id !== id;
  });
  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  hienThongBao("Đã xóa sách.", "ok");
}

//HÀM 4 Tìm kiếm
function timKiem() {
  let tuKhoa = document.getElementById("inputTimKiem").value.trim().toLowerCase();

  if (tuKhoa === "") {
    hienThiDanhSach(danhSachSach);
    return;
  }

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

//HÀM 5 Cập nhật thống kê
function capNhatThongKe() {
  document.getElementById("tongSach").innerText = danhSachSach.length;

  let cacTheLoai = [];
  for (let i = 0; i < danhSachSach.length; i++) {
    if (!cacTheLoai.includes(danhSachSach[i].theLoai)) {
      cacTheLoai.push(danhSachSach[i].theLoai);
    }
  }
  document.getElementById("tongTheLoai").innerText = cacTheLoai.length;
}

// HÀM 6 Xoá form
function xoaForm() {
  document.getElementById("inputTen").value     = "";
  document.getElementById("inputTacGia").value  = "";
  document.getElementById("inputTheLoai").value = "";
  document.getElementById("inputNam").value     = "";
}

//HÀM 7 Hiện thông báo
function hienThongBao(noiDung, loai) {
  let hop = document.getElementById("thongBao");
  hop.innerText     = noiDung;
  hop.style.display = "block";
  hop.className     = (loai === "loi") ? "tb-loi" : "tb-ok";
  setTimeout(function() {
    hop.style.display = "none";
  }, 3000);
}

//HÀM 8 Mở modal mượn
function moModalMuon(id) {
  idDangMuon = id;
  let homNay = new Date().toISOString().split("T")[0];
  document.getElementById("inputNgayMuon").value  = homNay;
  document.getElementById("inputNguoiMuon").value = "";
  document.getElementById("modalMuon").style.display = "flex";
}

//HÀM 9 Xác nhận mượn
function xacNhanMuon() {
  let nguoiMuon = document.getElementById("inputNguoiMuon").value.trim();
  let ngayMuon  = document.getElementById("inputNgayMuon").value;

  if (nguoiMuon === "" || ngayMuon === "") {
    alert("Vui lòng điền tên người mượn và ngày mượn!");
    return;
  }

  for (let i = 0; i < danhSachSach.length; i++) {
    if (danhSachSach[i].id === idDangMuon) {
      danhSachSach[i].trangThai = "dang-muon";
      danhSachSach[i].nguoiMuon = nguoiMuon;
      danhSachSach[i].ngayMuon  = ngayMuon;
      break;
    }
  }

  dongModal();
  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  hienThongBao(`Đã ghi nhận "${nguoiMuon}" mượn sách!`, "ok");
}

//HÀM 10 Trả sách
function traSach(id) {
  for (let i = 0; i < danhSachSach.length; i++) {
    if (danhSachSach[i].id === id) {
      danhSachSach[i].trangThai = "san-sang";
      danhSachSach[i].nguoiMuon = "";
      danhSachSach[i].ngayMuon  = "";
      break;
    }
  }
  hienThiDanhSach(danhSachSach);
  capNhatThongKe();
  hienThongBao("Đã trả sách thành công!", "ok");
}

//HÀM 11 Đóng modal
function dongModal() {
  document.getElementById("modalMuon").style.display = "none";
  idDangMuon = null;
}

//GẮN SỰ KIỆN
document.getElementById("btnThem").addEventListener("click", themSach);
document.getElementById("inputTimKiem").addEventListener("input", timKiem);
