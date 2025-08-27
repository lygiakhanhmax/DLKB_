// BIẾN TOÀN CỤC
let dangNhapTrangThai = false;
let danhSachLichDat = [];
let danhSachHoaDon = [];
let nguoiDungHienTai = null;
let lichDangChinhSua = null;
let hoaDonDangThanhToan = null;

// BẢNG GIÁ DỊCH VỤ THEO CHUYÊN KHOA
const bangGiaDichVu = {
    "Nội khoa": {
        gia: 350000,
        moTa: "Khám tổng quát nội khoa, tư vấn điều trị"
    },
    "Ngoại khoa": {
        gia: 450000,
        moTa: "Khám ngoại khoa, tư vấn phẫu thuật"
    },
    "Sản phụ khoa": {
        gia: 400000,
        moTa: "Khám sản khoa, phụ khoa, tư vấn thai sản"
    },
    "Nhi khoa": {
        gia: 300000,
        moTa: "Khám bệnh cho trẻ em dưới 16 tuổi"
    },
    "Mắt": {
        gia: 250000,
        moTa: "Khám mắt, đo thị lực, tư vấn điều trị"
    },
    "Tai mũi họng": {
        gia: 280000,
        moTa: "Khám tai mũi họng, nội soi TMH"
    },
    "Da liễu": {
        gia: 320000,
        moTa: "Khám da liễu, tư vấn điều trị da"
    },
    "Răng hàm mặt": {
        gia: 200000,
        moTa: "Khám răng miệng, tư vấn nha khoa"
    }
};

// DANH SÁCH BÁC SĨ THEO CHUYÊN KHOA
const danhSachBacSi = {
    "Nội khoa": [
        "BS. Nguyễn Văn Hùng - Chuyên khoa Tim mạch",
        "BS. Trần Thị Lan - Chuyên khoa Tiêu hóa", 
        "BS. Lê Minh Tâm - Chuyên khoa Hô hấp",
        "BS. Phạm Thị Mai - Chuyên khoa Thận - Tiết niệu"
    ],
    "Ngoại khoa": [
        "BS. Hoàng Văn Dũng - Phẫu thuật Tổng quát",
        "BS. Nguyễn Thị Hoa - Phẫu thuật Tim mạch",
        "BS. Trần Văn Nam - Phẫu thuật Thần kinh",
        "BS. Lê Thị Bích - Phẫu thuật Tạo hình"
    ],
    "Sản phụ khoa": [
        "BS. Phạm Thị Hương - Sản khoa",
        "BS. Nguyễn Văn Minh - Phụ khoa",
        "BS. Trần Thị Linh - Thai sản",
        "BS. Lê Văn Đức - Hiếm muộn"
    ],
    "Nhi khoa": [
        "BS. Võ Thị An - Nhi tổng quát",
        "BS. Nguyễn Văn Bình - Nhi hô hấp",
        "BS. Trần Thị Cẩm - Nhi tiêu hóa",
        "BS. Lê Văn Dương - Nhi tim mạch"
    ],
    "Mắt": [
        "BS. Phạm Văn Hải - Khúc xạ mắt",
        "BS. Nguyễn Thị Kiều - Võng mạc",
        "BS. Trần Văn Long - Glaucoma",
        "BS. Lê Thị Nga - Phẫu thuật mắt"
    ],
    "Tai mũi họng": [
        "BS. Hoàng Thị Oanh - TMH tổng quát",
        "BS. Nguyễn Văn Phong - Phẫu thuật TMH",
        "BS. Trần Thị Quỳnh - Thính học",
        "BS. Lê Văn Sơn - Nội soi TMH"
    ],
    "Da liễu": [
        "BS. Phạm Thị Tâm - Da liễu tổng quát",
        "BS. Nguyễn Văn Uy - Da liễu thẩm mỹ",
        "BS. Trần Thị Vân - Điều trị mụn",
        "BS. Lê Văn Xuân - Laser da liễu"
    ],
    "Răng hàm mặt": [
        "BS. Võ Văn Yên - Nha khoa tổng quát",
        "BS. Nguyễn Thị Zoe - Chỉnh nha",
        "BS. Trần Văn An - Phục hình răng",
        "BS. Lê Thị Bình - Phẫu thuật hàm mặt"
    ]
};

// DỮ LIỆU MẪU
let danhSachNguoiDung = [
    {
        id: 1,
        ten: "Nguyễn Văn A",
        email: "admin@test.com",
        sdt: "0123456789",
        matKhau: "123456",
        diaChi: "123 Đường ABC, Quận XYZ, TP.HCM"
    }
];

// KHỞI TẠO KHI TRANG TẢI
document.addEventListener('DOMContentLoaded', function() {
    // Ẩn dashboard ban đầu
    document.getElementById('dashboard').style.display = 'none';
    
    // Thiết lập ngày tối thiểu cho input date
    const ngayKham = document.getElementById('ngay-kham');
    const ngayHomNay = new Date();
    ngayHomNay.setDate(ngayHomNay.getDate() + 1); // Chỉ cho phép đặt từ ngày mai
    ngayKham.min = ngayHomNay.toISOString().split('T')[0];
    
    // Tạo dữ liệu mẫu
    taoLichMau();
    taoHoaDonMau();
    
    // Hiển thị thông tin ban đầu
    capNhatGiaKham();
});

// CHỨC NĂNG CHUYỂN TAB
function chuyenTab(tab) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const formDangNhap = document.getElementById('form-dangnhap');
    const formDangKy = document.getElementById('form-dangky');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'dangnhap') {
        document.querySelector('[onclick="chuyenTab(\'dangnhap\')"]').classList.add('active');
        formDangNhap.style.display = 'block';
        formDangKy.style.display = 'none';
    } else {
        document.querySelector('[onclick="chuyenTab(\'dangky\')"]').classList.add('active');
        formDangNhap.style.display = 'none';
        formDangKy.style.display = 'block';
    }
}

// CHỨC NĂNG ĐĂNG KÝ
function dangKy(event) {
    event.preventDefault();
    
    const ten = document.getElementById('reg-name').value.trim();
    const sdt = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const matKhau = document.getElementById('reg-password').value;
    const xacNhan = document.getElementById('reg-confirm').value;
    
    // Kiểm tra validation
    if (!ten || !sdt || !email || !matKhau) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    if (matKhau !== xacNhan) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    // Kiểm tra email đã tồn tại
    if (danhSachNguoiDung.find(user => user.email === email)) {
        alert('Email này đã được đăng ký!');
        return;
    }
    
    // Tạo user mới
    const nguoiDungMoi = {
        id: Date.now(),
        ten: ten,
        email: email,
        sdt: sdt,
        matKhau: matKhau,
        diaChi: ""
    };
    
    danhSachNguoiDung.push(nguoiDungMoi);
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    
    // Reset form và chuyển về tab đăng nhập
    document.getElementById('form-dangky').reset();
    chuyenTab('dangnhap');
}

// CHỨC NĂNG ĐĂNG NHẬP
function dangNhap(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const matKhau = document.getElementById('login-password').value;
    
    if (!email || !matKhau) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    // Kiểm tra thông tin đăng nhập
    const nguoiDung = danhSachNguoiDung.find(user => 
        user.email === email && user.matKhau === matKhau
    );
    
    if (!nguoiDung) {
        alert('Email hoặc mật khẩu không đúng!');
        return;
    }
    
    // Đăng nhập thành công
    dangNhapTrangThai = true;
    nguoiDungHienTai = nguoiDung;
    
    // Ẩn form auth và hiển thị dashboard
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'grid';
    
    // Cập nhật thông tin cá nhân
    capNhatThongTinCaNhan();
    
    // Hiển thị lịch đã đặt và hóa đơn
    hienThiDanhSachLich();
    hienThiDanhSachHoaDon();
    
    alert('Đăng nhập thành công!');
}

// CHỨC NĂNG ĐĂNG XUẤT
function dangXuat() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        dangNhapTrangThai = false;
        nguoiDungHienTai = null;
        
        // Reset forms
        document.getElementById('form-dangnhap').reset();
        document.getElementById('form-dangky').reset();
        
        // Hiển thị lại form auth
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
        
        // Reset active menu
        const menuItems = document.querySelectorAll('.sidebar a');
        menuItems.forEach(item => item.classList.remove('active'));
        document.querySelector('[onclick="hienThiNoiDung(\'dat-lich\')"]').classList.add('active');
        
        // Hiển thị lại tab đăng nhập
        chuyenTab('dangnhap');
    }
}

// CHỨC NĂNG CẬP NHẬT DANH SÁCH BÁC SĨ
function capNhatDanhSachBacSi() {
    const chuyenKhoa = document.getElementById('chuyen-khoa').value;
    const selectBacSi = document.getElementById('bac-si');
    
    // Reset danh sách bác sĩ
    selectBacSi.innerHTML = '<option value="">-- Chọn bác sĩ --</option>';
    
    if (chuyenKhoa && danhSachBacSi[chuyenKhoa]) {
        selectBacSi.disabled = false;
        selectBacSi.style.opacity = '1';
        
        danhSachBacSi[chuyenKhoa].forEach(bacSi => {
            const option = document.createElement('option');
            option.value = bacSi;
            option.textContent = bacSi;
            selectBacSi.appendChild(option);
        });
    } else {
        selectBacSi.disabled = true;
        selectBacSi.style.opacity = '0.5';
    }
    
    // Cập nhật giá khám
    capNhatGiaKham();
}

// CHỨC NĂNG CẬP NHẬT GIÁ KHÁM
function capNhatGiaKham() {
    const chuyenKhoa = document.getElementById('chuyen-khoa').value;
    const giaKhamInfo = document.getElementById('gia-kham-info');
    
    if (chuyenKhoa && bangGiaDichVu[chuyenKhoa]) {
        const thongTinGia = bangGiaDichVu[chuyenKhoa];
        giaKhamInfo.innerHTML = `
            <div class="price-breakdown">
                <p><strong>Dịch vụ:</strong> ${thongTinGia.moTa}</p>
                <p><strong>Chi phí khám:</strong> <span class="price">${thongTinGia.gia.toLocaleString('vi-VN')} VND</span></p>
                <p style="font-size: 0.9em; color: #6b7280; margin-top: 0.5rem;">
                    <em>* Chưa bao gồm chi phí xét nghiệm, thuốc (nếu có)</em>
                </p>
            </div>
        `;
    } else {
        giaKhamInfo.innerHTML = '<p>Vui lòng chọn chuyên khoa để xem giá</p>';
    }
}

// CHỨC NĂNG ĐẶT LỊCH KHÁM
function datLichKham(event) {
    event.preventDefault();
    
    const chuyenKhoa = document.getElementById('chuyen-khoa').value;
    const bacSi = document.getElementById('bac-si').value;
    const ngayKham = document.getElementById('ngay-kham').value;
    const gioKham = document.getElementById('gio-kham').value;
    const ghiChu = document.getElementById('ghi-chu').value.trim();
    
    // Validation
    if (!chuyenKhoa || !bacSi || !ngayKham || !gioKham) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Kiểm tra ngày khám (phải từ ngày mai)
    const ngayDat = new Date(ngayKham);
    const ngayHomNay = new Date();
    ngayHomNay.setHours(0, 0, 0, 0);
    ngayDat.setHours(0, 0, 0, 0);
    
    if (ngayDat <= ngayHomNay) {
        alert('Vui lòng chọn ngày khám từ ngày mai trở đi!');
        return;
    }
    
    // Kiểm tra trùng lịch
    const lichTrung = danhSachLichDat.find(lich => 
        lich.nguoiDungId === nguoiDungHienTai.id &&
        lich.bacSi === bacSi &&
        lich.ngayKham === ngayKham &&
        lich.gioKham === gioKham &&
        lich.trangThai !== 'Đã hủy'
    );
    
    if (lichTrung) {
        alert('Bạn đã có lịch khám với bác sĩ này vào thời gian này!');
        return;
    }
    
    // Tạo lịch khám mới
    const lichKhamMoi = {
        id: Date.now(),
        nguoiDungId: nguoiDungHienTai.id,
        chuyenKhoa: chuyenKhoa,
        bacSi: bacSi,
        ngayKham: ngayKham,
        gioKham: gioKham,
        ghiChu: ghiChu || 'Không có',
        chiPhi: bangGiaDichVu[chuyenKhoa].gia,
        trangThai: 'Đã xác nhận',
        ngayDat: new Date().toISOString().split('T')[0]
    };
    
    danhSachLichDat.push(lichKhamMoi);
    
    // Tạo hóa đơn
    const hoaDonMoi = {
        id: Date.now(),
        lichKhamId: lichKhamMoi.id,
        nguoiDungId: nguoiDungHienTai.id,
        chuyenKhoa: chuyenKhoa,
        bacSi: bacSi,
        ngayKham: ngayKham,
        gioKham: gioKham,
        chiPhi: lichKhamMoi.chiPhi,
        trangThaiThanhToan: 'Chưa thanh toán',
        ngayTao: new Date().toISOString().split('T')[0]
    };
    
    danhSachHoaDon.push(hoaDonMoi);
    
    alert('Đặt lịch khám thành công! Vui lòng thanh toán để hoàn tất.');
    
    // Reset form
    document.getElementById('form-dat-lich').reset();
    capNhatGiaKham();
    
    // Cập nhật hiển thị
    hienThiDanhSachLich();
    hienThiDanhSachHoaDon();
}

// CHỨC NĂNG HIỂN THỊ NỘI DUNG
function hienThiNoiDung(section) {
    // Ẩn tất cả content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.add('hidden'));
    
    // Hiển thị section được chọn
    document.getElementById(section).classList.remove('hidden');
    
    // Cập nhật active menu
    const menuItems = document.querySelectorAll('.sidebar a');
    menuItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    
    // Cập nhật dữ liệu theo section
    if (section === 'lich-da-dat') {
        hienThiDanhSachLich();
    } else if (section === 'thanh-toan') {
        hienThiDanhSachHoaDon();
    } else if (section === 'thong-tin-ca-nhan') {
        capNhatThongTinCaNhan();
    }
}

// CHỨC NĂNG HIỂN THỊ DANH SÁCH LỊCH
function hienThiDanhSachLich() {
    const container = document.getElementById('danh-sach-lich');
    const lichCuaNguoiDung = danhSachLichDat.filter(lich => 
        lich.nguoiDungId === nguoiDungHienTai.id
    );
    
    if (lichCuaNguoiDung.length === 0) {
        container.innerHTML = `
            <div class="appointment-card" style="text-align: center; color: #6b7280;">
                <p>Bạn chưa có lịch khám nào.</p>
                <button class="button" onclick="hienThiNoiDung('dat-lich')" style="width: auto; margin-top: 1rem;">
                    📅 Đặt Lịch Ngay
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    lichCuaNguoiDung.forEach(lich => {
        const cardClass = lich.trangThai === 'Đã hủy' ? 'appointment-card cancelled' : 'appointment-card';
        const ngayKhamFormatted = new Date(lich.ngayKham).toLocaleDateString('vi-VN');
        
        const card = document.createElement('div');
        card.className = cardClass;
        card.innerHTML = `
            <h4>🏥 ${lich.chuyenKhoa} - ${lich.bacSi}</h4>
            <p><strong>📅 Ngày:</strong> ${ngayKhamFormatted}</p>
            <p><strong>🕘 Giờ:</strong> ${lich.gioKham} - ${getEndTime(lich.gioKham)}</p>
            <p><strong>📊 Trạng thái:</strong> <span class="status-${getStatusClass(lich.trangThai)}">${lich.trangThai}</span></p>
            <p><strong>💰 Chi phí:</strong> <span class="price">${lich.chiPhi.toLocaleString('vi-VN')} VND</span></p>
            <p><strong>📝 Ghi chú:</strong> ${lich.ghiChu}</p>
            ${lich.trangThai !== 'Đã hủy' ? `
                <div class="appointment-actions">
                    <button class="button-edit" onclick="moModalDoiLich(${lich.id})">
                        🔄 Đổi Lịch
                    </button>
                    <button class="button-cancel" onclick="moModalHuyLich(${lich.id})">
                        ❌ Hủy Lịch
                    </button>
                </div>
            ` : ''}
        `;
        container.appendChild(card);
    });
}

// CHỨC NĂNG HIỂN THỊ DANH SÁCH HÓA ĐƠN
function hienThiDanhSachHoaDon() {
    const container = document.getElementById('danh-sach-hoa-don');
    const hoaDonCuaNguoiDung = danhSachHoaDon.filter(hoaDon => 
        hoaDon.nguoiDungId === nguoiDungHienTai.id && 
        hoaDon.trangThaiThanhToan === 'Chưa thanh toán'
    );
    
    if (hoaDonCuaNguoiDung.length === 0) {
        container.innerHTML = `
            <div class="invoice-card" style="text-align: center; color: #6b7280;">
                <p>Không có hóa đơn cần thanh toán.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    hoaDonCuaNguoiDung.forEach(hoaDon => {
        const ngayKhamFormatted = new Date(hoaDon.ngayKham).toLocaleDateString('vi-VN');
        
        const card = document.createElement('div');
        card.className = 'invoice-card';
        card.innerHTML = `
            <div class="invoice-header">
                <h4>🏥 ${hoaDon.chuyenKhoa} - ${hoaDon.bacSi}</h4>
                <span class="invoice-status unpaid">Chưa thanh toán</span>
            </div>
            <div class="invoice-details">
                <p><strong>📅 Ngày khám:</strong> ${ngayKhamFormatted}</p>
                <p><strong>🕘 Giờ:</strong> ${hoaDon.gioKham} - ${getEndTime(hoaDon.gioKham)}</p>
                <p><strong>💰 Chi phí:</strong> <span class="price">${hoaDon.chiPhi.toLocaleString('vi-VN')} VND</span></p>
            </div>
            <div class="invoice-actions">
                <button class="button-payment" onclick="thanhToanHoaDon(${hoaDon.id})">
                    💳 Thanh Toán Ngay
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// CHỨC NĂNG THANH TOÁN HÓA ĐƠN
function thanhToanHoaDon(hoaDonId) {
    const hoaDon = danhSachHoaDon.find(hd => hd.id === hoaDonId);
    if (!hoaDon) {
        alert('Không tìm thấy hóa đơn!');
        return;
    }
    
    hoaDonDangThanhToan = hoaDon;
    
    // Hiển thị modal thanh toán
    const modal = document.getElementById('modal-thanh-toan');
    const invoiceDetails = document.getElementById('invoice-details');
    
    const ngayKhamFormatted = new Date(hoaDon.ngayKham).toLocaleDateString('vi-VN');
    
    invoiceDetails.innerHTML = `
        <div class="payment-info">
            <p><strong>Chuyên khoa:</strong> ${hoaDon.chuyenKhoa}</p>
            <p><strong>Bác sĩ:</strong> ${hoaDon.bacSi}</p>
            <p><strong>Ngày khám:</strong> ${ngayKhamFormatted}</p>
            <p><strong>Giờ khám:</strong> ${hoaDon.gioKham} - ${getEndTime(hoaDon.gioKham)}</p>
            <p class="price-total">Tổng chi phí: ${hoaDon.chiPhi.toLocaleString('vi-VN')} VND</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// CHỨC NĂNG XỬ LÝ THANH TOÁN
function xuLyThanhToan() {
    if (!hoaDonDangThanhToan) {
        alert('Có lỗi xảy ra!');
        return;
    }
    
    const phuongThuc = document.querySelector('input[name="payment-modal"]:checked').value;
    let tenPhuongThuc;
    
    switch(phuongThuc) {
        case 'banking':
            tenPhuongThuc = 'Chuyển khoản ngân hàng';
            break;
        case 'momo':
            tenPhuongThuc = 'Ví MoMo';
            break;
        case 'vnpay':
            tenPhuongThuc = 'VNPay';
            break;
        default:
            tenPhuongThuc = 'Không xác định';
    }
    
    // Giả lập quá trình thanh toán
    if (confirm(`Bạn có chắc muốn thanh toán ${hoaDonDangThanhToan.chiPhi.toLocaleString('vi-VN')} VND bằng ${tenPhuongThuc}?`)) {
        // Cập nhật trạng thái hóa đơn
        hoaDonDangThanhToan.trangThaiThanhToan = 'Đã thanh toán';
        hoaDonDangThanhToan.phuongThucThanhToan = tenPhuongThuc;
        hoaDonDangThanhToan.ngayThanhToan = new Date().toISOString().split('T')[0];
        
        // Đóng modal
        dongModal('modal-thanh-toan');
        hoaDonDangThanhToan = null;
        
        // Cập nhật hiển thị
        hienThiDanhSachHoaDon();
        
        alert('Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ.');
    }
}

// CHỨC NĂNG MỞ MODAL ĐỔI LỊCH
function moModalDoiLich(lichId) {
    lichDangChinhSua = danhSachLichDat.find(lich => lich.id === lichId);
    if (!lichDangChinhSua) {
        alert('Không tìm thấy lịch khám!');
        return;
    }
    
    // Thiết lập ngày tối thiểu
    const doiNgayKham = document.getElementById('doi-ngay-kham');
    const ngayHomNay = new Date();
    ngayHomNay.setDate(ngayHomNay.getDate() + 1);
    doiNgayKham.min = ngayHomNay.toISOString().split('T')[0];
    
    document.getElementById('modal-doi-lich').style.display = 'block';
}

// CHỨC NĂNG XÁC NHẬN ĐỔI LỊCH
function xacNhanDoiLich(event) {
    event.preventDefault();
    
    const ngayMoi = document.getElementById('doi-ngay-kham').value;
    const gioMoi = document.getElementById('doi-gio-kham').value;
    const lyDo = document.getElementById('doi-ly-do').value.trim();
    
    if (!ngayMoi || !gioMoi) {
        alert('Vui lòng chọn ngày và giờ khám mới!');
        return;
    }
    
    // Kiểm tra ngày đổi (phải từ ngày mai)
    const ngayDoi = new Date(ngayMoi);
    const ngayHomNay = new Date();
    ngayHomNay.setHours(0, 0, 0, 0);
    ngayDoi.setHours(0, 0, 0, 0);
    
    if (ngayDoi <= ngayHomNay) {
        alert('Vui lòng chọn ngày khám từ ngày mai trở đi!');
        return;
    }
    
    // Kiểm tra trùng lịch mới
    const lichTrung = danhSachLichDat.find(lich => 
        lich.nguoiDungId === nguoiDungHienTai.id &&
        lich.bacSi === lichDangChinhSua.bacSi &&
        lich.ngayKham === ngayMoi &&
        lich.gioKham === gioMoi &&
        lich.id !== lichDangChinhSua.id &&
        lich.trangThai !== 'Đã hủy'
    );
    
    if (lichTrung) {
        alert('Bạn đã có lịch khám với bác sĩ này vào thời gian mới!');
        return;
    }
    
    // Cập nhật lịch khám
    lichDangChinhSua.ngayKham = ngayMoi;
    lichDangChinhSua.gioKham = gioMoi;
    lichDangChinhSua.lyDoDoiLich = lyDo || 'Không có lý do';
    lichDangChinhSua.daDoiLich = true;
    
    // Cập nhật hóa đơn tương ứng
    const hoaDonTuongUng = danhSachHoaDon.find(hd => hd.lichKhamId === lichDangChinhSua.id);
    if (hoaDonTuongUng) {
        hoaDonTuongUng.ngayKham = ngayMoi;
        hoaDonTuongUng.gioKham = gioMoi;
    }
    
    // Đóng modal và reset form
    dongModal('modal-doi-lich');
    document.getElementById('form-doi-lich').reset();
    lichDangChinhSua = null;
    
    // Cập nhật hiển thị
    hienThiDanhSachLich();
    hienThiDanhSachHoaDon();
    
    alert('Đổi lịch khám thành công!');
}

// CHỨC NĂNG MỞ MODAL HỦY LỊCH
function moModalHuyLich(lichId) {
    lichDangChinhSua = danhSachLichDat.find(lich => lich.id === lichId);
    if (!lichDangChinhSua) {
        alert('Không tìm thấy lịch khám!');
        return;
    }
    
    document.getElementById('modal-huy-lich').style.display = 'block';
}

// CHỨC NĂNG XÁC NHẬN HỦY LỊCH
function xacNhanHuyLich(event) {
    event.preventDefault();
    
    const lyDo = document.getElementById('huy-ly-do').value.trim();
    
    if (!lyDo) {
        alert('Vui lòng nhập lý do hủy lịch!');
        return;
    }
    
    // Cập nhật lịch khám
    lichDangChinhSua.trangThai = 'Đã hủy';
    lichDangChinhSua.lyDoHuy = lyDo;
    lichDangChinhSua.ngayHuy = new Date().toISOString().split('T')[0];
    
    // Hủy hóa đơn tương ứng
    const hoaDonTuongUng = danhSachHoaDon.find(hd => 
        hd.lichKhamId === lichDangChinhSua.id && 
        hd.trangThaiThanhToan === 'Chưa thanh toán'
    );
    if (hoaDonTuongUng) {
        hoaDonTuongUng.trangThaiThanhToan = 'Đã hủy';
    }
    
    // Đóng modal và reset form
    dongModal('modal-huy-lich');
    document.getElementById('form-huy-lich').reset();
    lichDangChinhSua = null;
    
    // Cập nhật hiển thị
    hienThiDanhSachLich();
    hienThiDanhSachHoaDon();
    
    alert('Hủy lịch khám thành công!');
}

// CHỨC NĂNG ĐÓNG MODAL
function dongModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// CHỨC NĂNG CẬP NHẬT THÔNG TIN CÁ NHÂN
function capNhatThongTinCaNhan() {
    if (!nguoiDungHienTai) return;
    
    document.getElementById('profile-name').value = nguoiDungHienTai.ten;
    document.getElementById('profile-phone').value = nguoiDungHienTai.sdt;
    document.getElementById('profile-email').value = nguoiDungHienTai.email;
    document.getElementById('profile-address').value = nguoiDungHienTai.diaChi || '';
}

// CHỨC NĂNG LƯU THÔNG TIN CÁ NHÂN
document.getElementById('form-thong-tin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const ten = document.getElementById('profile-name').value.trim();
    const sdt = document.getElementById('profile-phone').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const diaChi = document.getElementById('profile-address').value.trim();
    
    if (!ten || !sdt || !email) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    // Kiểm tra email trùng (trừ email của chính mình)
    const emailTrung = danhSachNguoiDung.find(user => 
        user.email === email && user.id !== nguoiDungHienTai.id
    );
    
    if (emailTrung) {
        alert('Email này đã được sử dụng bởi tài khoản khác!');
        return;
    }
    
    // Cập nhật thông tin
    nguoiDungHienTai.ten = ten;
    nguoiDungHienTai.sdt = sdt;
    nguoiDungHienTai.email = email;
    nguoiDungHienTai.diaChi = diaChi;
    
    // Cập nhật trong danh sách
    const index = danhSachNguoiDung.findIndex(user => user.id === nguoiDungHienTai.id);
    if (index !== -1) {
        danhSachNguoiDung[index] = nguoiDungHienTai;
    }
    
    alert('Cập nhật thông tin thành công!');
});

// CHỨC NĂNG GỬI TIN NHẮN LIÊN HỆ
function guiTinNhan(event) {
    event.preventDefault();
    
    const chuDe = document.getElementById('contact-subject').value;
    const tinNhan = document.getElementById('contact-message').value.trim();
    
    if (!chuDe || !tinNhan) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Giả lập gửi tin nhắn
    const tinNhanMoi = {
        id: Date.now(),
        nguoiDungId: nguoiDungHienTai.id,
        chuDe: chuDe,
        tinNhan: tinNhan,
        ngayGui: new Date().toISOString().split('T')[0],
        trangThai: 'Đã gửi'
    };
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    alert('Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
}

// CÁC CHỨC NĂNG PHỤ TRỢ
function getEndTime(startTime) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours;
    const endMinutes = minutes + 30;
    
    if (endMinutes >= 60) {
        return `${String(endHours + 1).padStart(2, '0')}:${String(endMinutes - 60).padStart(2, '0')}`;
    } else {
        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'Đã xác nhận': return 'confirmed';
        case 'Chờ xác nhận': return 'pending';
        case 'Đã hủy': return 'cancelled';
        default: return 'pending';
    }
}

// CHỨC NĂNG TẠO DỮ LIỆU MẪU
function taoLichMau() {
    const lichMau = [
        {
            id: 1,
            nguoiDungId: 1,
            chuyenKhoa: 'Nội khoa',
            bacSi: 'BS. Nguyễn Văn Hùng - Chuyên khoa Tim mạch',
            ngayKham: '2025-08-30',
            gioKham: '09:00',
            ghiChu: 'Đau bụng, khó tiêu',
            chiPhi: 350000,
            trangThai: 'Đã xác nhận',
            ngayDat: '2025-08-26'
        }
    ];
    
    danhSachLichDat.push(...lichMau);
}

function taoHoaDonMau() {
    const hoaDonMau = [
        {
            id: 1,
            lichKhamId: 1,
            nguoiDungId: 1,
            chuyenKhoa: 'Nội khoa',
            bacSi: 'BS. Nguyễn Văn Hùng - Chuyên khoa Tim mạch',
            ngayKham: '2025-08-30',
            gioKham: '09:00',
            chiPhi: 350000,
            trangThaiThanhToan: 'Chưa thanh toán',
            ngayTao: '2025-08-26'
        }
    ];
    
    danhSachHoaDon.push(...hoaDonMau);
}

// XỬ LÝ SỰ KIỆN CLICK NGOÀI MODAL
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}