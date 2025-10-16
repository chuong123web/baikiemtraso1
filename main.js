class HocSinh {
    constructor(maHS, hoTen, lopHoc, diemTB, hanhKiem) {
        this.maHS = String(maHS);
        this.hoTen = String(hoTen);
        this.lopHoc = String(lopHoc);
        this.diemTB = Number(diemTB); 
        this.hanhKiem = String(hanhKiem);
    }
}
class SchoolSystem {
    constructor() {
        this.danhSach = [];
        this.soLuongHocSinh = 0;
    }

    // 1 Khởi tạo dữ liệu ban đầu
    khoiTao(data = []) {
        this.danhSach = [...data];
        this.soLuongHocSinh = data.length;
    }

    // 2 Thêm học sinh mới
    themHocSinh(hocSinh) {
        const year = new Date().getFullYear();
        const maHS = `ma${year}${String(this.soLuongHocSinh + 1).padStart(3, "0")}`;
        const hsMoi = new HocSinh(maHS, hocSinh.hoTen, hocSinh.lopHoc, hocSinh.diemTB, hocSinh.hanhKiem);
        this.danhSach.push(hsMoi);
        this.soLuongHocSinh++;
        return maHS;
    }

    // 3 Tìm học sinh theo mã
    timHocSinh(maHS) {
        if (!/^ma\d{4}\d+$/.test(maHS)) return null;
        return this.danhSach.find(hs => hs.maHS === maHS) || null;
    }

    // 4 Cập nhật thông tin học sinh
    capNhatThongTin(maHS, duLieuMoi) {
        const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
        if (index === -1) return false;

        const { maHS: _, ...duLieuCapNhat } = duLieuMoi;
        this.danhSach[index] = { ...this.danhSach[index], ...duLieuCapNhat };
        return true;
    }

    // 5 Xóa học sinh
    xoaHocSinh(maHS) {
        const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
        if (index === -1) return false;

        this.danhSach.splice(index, 1);
        this.soLuongHocSinh--;
        return true;
    }

    // 6 Lấy danh sách theo lớp
    layDanhSachTheoLop(tenLop) {
        return this.danhSach.filter(hs => hs.lopHoc === tenLop);
    }

    // 7 Thống kê học lực
    thongKeHocLuc() {
        const thongKe = {
            "Xuất sắc": 0,
            "Giỏi": 0,
            "Khá": 0,
            "Trung bình": 0,
            "Kém": 0
        };

        this.danhSach.forEach(hs => {
            if (hs.diemTB >= 9.0) thongKe["Xuất sắc"]++;
            else if (hs.diemTB >= 8.0) thongKe["Giỏi"]++;
            else if (hs.diemTB >= 6.5) thongKe["Khá"]++;
            else if (hs.diemTB >= 5.0) thongKe["Trung bình"]++;
            else thongKe["Kém"]++;
        });

        return thongKe;
    }

    // 8️ Sắp xếp danh sách theo điểm
    sapXepTheoDiem(kieuSapXep = 'tang') {
        const dsMoi = [...this.danhSach];
        dsMoi.sort((a, b) => kieuSapXep === 'tang' ? a.diemTB - b.diemTB : b.diemTB - a.diemTB);
        return dsMoi;
    }
}
// --------------------- TEST DỮ LIỆU ----------------------

const duLieuBanDau = [
    new HocSinh("ma2025001", "Nguyễn Văn A", "10A1", 8.7, "Tốt"),
    new HocSinh("ma2025002", "Trần Thị B", "10A1", 9.2, "Tốt"),
    new HocSinh("ma2025003", "Lê Văn C", "10A2", 6.3, "Khá"),
    new HocSinh("ma2025004", "Phạm Thị D", "10A1", 7.1, "Khá"),
];
const truong = new SchoolSystem();
truong.khoiTao(duLieuBanDau);

// Thêm học sinh mới
truong.themHocSinh({ hoTen: "Ngô Văn E", lopHoc: "10A2", diemTB: 8.1, hanhKiem: "Tốt" });

// In ra thống kê
console.log("Thống kê học lực:", truong.thongKeHocLuc());

// In ra danh sách sắp xếp theo điểm giảm dần
console.log("Danh sách (giảm dần):", truong.sapXepTheoDiem("giam"));

// Tìm học sinh
console.log("Tìm học sinh:", truong.timHocSinh("ma2025002"));

// Cập nhật thông tin
truong.capNhatThongTin("ma2025002", { diemTB: 9.5 });
console.log("Sau cập nhật:", truong.timHocSinh("ma2025002"));

// Xóa học sinh
truong.xoaHocSinh("ma2025003");
console.log(" Sau khi xóa:", truong.danhSach);
