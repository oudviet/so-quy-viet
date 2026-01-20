import { useState, useEffect } from 'react';

const LOAI_KAKEIBO = {
  NEED: { ten: 'CẦN', mau: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50', icon: '🟢' },
  WANT: { ten: 'MUỐN', mau: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50', icon: '🟡' },
  SHOULD: { ten: 'NÊN', mau: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', icon: '🟠' },
  CAN: { ten: 'CÓ THỈ', mau: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', icon: '🔵' },
};

// Dữ liệu mẫu
const CHI_TIU_MAU = [
  { id: '1', ten: 'Boba tea', tien: 30000, loai: 'WANT', ngay: new Date('2026-01-20T15:02:00') },
  { id: '2', ten: 'Trà sữa', tien: 50000, loai: 'WANT', ngay: new Date('2026-01-20T01:47:00') },
  { id: '3', ten: 'Sách Psychology of Money', tien: 200000, loai: 'SHOULD', ngay: new Date('2026-01-20T01:47:00') },
  { id: '4', ten: 'Cơm trưa', tien: 70000, loai: 'NEED', ngay: new Date('2026-01-20T01:47:00') },
  { id: '5', ten: 'Cafe sáng', tien: 50000, loai: 'WANT', ngay: new Date('2026-01-20T01:47:00') },
];

function LichSu() {
  const [chiTieu, setChiTieu] = useState(CHI_TIU_MAU);
  const [dangTai, setDangTai] = useState(false);

  // TODO: Fetch data from API
  useEffect(() => {
    const taiDuLieu = async () => {
      setDangTai(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setDangTai(false);
    };

    taiDuLieu();
  }, []);

  const formatTien = (so) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(so);
  };

  const formatNgay = (ngay) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(ngay);
  };

  const tongTien = chiTieu.reduce((sum, item) => sum + item.tien, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Lịch Sử Chi Tiêu</h2>
        <p className="text-gray-600 mt-1">Xem tất cả các khoản chi tiêu của bạn</p>
      </div>

      {/* Tổng */}
      <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
        <span className="text-blue-900 font-medium">Tổng cộng:</span>
        <span className="text-xl font-bold text-blue-900">{formatTien(tongTien)}</span>
      </div>

      {/* Danh sách */}
      {dangTai ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {chiTieu.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Chưa có chi tiêu nào</p>
              <p className="text-gray-400 text-sm mt-1">Thêm chi tiêu đầu tiên của bạn!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {chiTieu.map((item) => {
                const loaiInfo = LOAI_KAKEIBO[item.loai];

                return (
                  <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Icon loại */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${loaiInfo.bg} flex items-center justify-center text-2xl`}>
                        {loaiInfo.icon}
                      </div>

                      {/* Nội dung */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{item.ten}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${loaiInfo.bg} ${loaiInfo.text}`}>
                            {loaiInfo.ten}
                          </span>
                          <span className="text-sm text-gray-500">{formatNgay(item.ngay)}</span>
                        </div>
                      </div>

                      {/* Số tiền */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg font-semibold text-gray-900">{formatTien(item.tien)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Export button */}
      {chiTieu.length > 0 && (
        <button className="w-full py-3 px-6 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <span>📤</span>
          <span>Xuất CSV</span>
        </button>
      )}
    </div>
  );
}

export default LichSu;
