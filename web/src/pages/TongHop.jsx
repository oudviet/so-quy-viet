import { useState, useEffect } from 'react';

const LOAI_KAKEIBO = {
  NEED: { ten: 'CẦN', mau: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50', icon: '🟢' },
  WANT: { ten: 'MUỐN', mau: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50', icon: '🟡' },
  SHOULD: { ten: 'NÊN', mau: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', icon: '🟠' },
  CAN: { ten: 'CÓ THỈ', mau: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', icon: '🔵' },
};

// Dữ liệu mẫu
const DU_LIEU_MAU = {
  tong: 400000,
  theoLoai: {
    NEED: { tong: 70000, soLuong: 1, chiTiet: [{ ten: 'Cơm trưa', tien: 70000 }] },
    WANT: { tong: 130000, soLuong: 3, chiTiet: [{ ten: 'Cafe sáng', tien: 50000 }, { ten: 'Trà sữa', tien: 50000 }, { ten: 'Boba tea', tien: 30000 }] },
    SHOULD: { tong: 200000, soLuong: 1, chiTiet: [{ ten: 'Sách Psychology of Money', tien: 200000 }] },
    CAN: { tong: 0, soLuong: 0, chiTiet: [] },
  },
};

function TongHop() {
  const [khoangThoiGian, setKhoangThoiGian] = useState('hom-nay');
  const [duLieu, setDuLieu] = useState(DU_LIEU_MAU);
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
  }, [khoangThoiGian]);

  const formatTien = (so) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(so);
  };

  const timMaxLoai = () => {
    let max = { loai: null, tien: 0 };
    Object.entries(duLieu.theoLoai).forEach(([loai, data]) => {
      if (data.tong > max.tien) {
        max = { loai, tien: data.tong };
      }
    });
    return max;
  };

  const maxLoai = timMaxLoai();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tổng Hợp Chi Tiêu</h2>
          <p className="text-gray-600 mt-1">Xem phân bổ chi tiêu theo 4 loại Kakeibo</p>
        </div>

        {/* Chọn khoảng thời gian */}
        <select
          value={khoangThoiGian}
          onChange={(e) => setKhoangThoiGian(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="hom-nay">Hôm nay</option>
          <option value="tuan-nay">Tuần này</option>
          <option value="thang-nay">Tháng này</option>
        </select>
      </div>

      {dangTai ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Tổng chi tiêu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-wide">Tổng chi tiêu</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatTien(duLieu.tong)}</p>
              <p className="text-sm text-gray-500 mt-1">{duLieu.theoLoai.NEED.soLuong + duLieu.theoLoai.WANT.soLuong + duLieu.theoLoai.SHOULD.soLuong + duLieu.theoLoai.CAN.soLuong} khoản</p>
            </div>
          </div>

          {/* 4 loại Kakeibo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(duLieu.theoLoai).map(([loai, data]) => {
              const loaiInfo = LOAI_KAKEIBO[loai];
              const phanTram = duLieu.tong > 0 ? ((data.tong / duLieu.tong) * 100).toFixed(0) : 0;

              return (
                <div
                  key={loai}
                  className={`bg-white rounded-xl shadow-sm border-2 p-5 ${
                    data.tong > 0 ? 'border-gray-200' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{loaiInfo.icon}</span>
                      <span className={`font-bold text-lg ${loaiInfo.text}`}>{loaiInfo.ten}</span>
                    </div>
                    {data.tong > 0 && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${loaiInfo.bg} ${loaiInfo.text}`}>
                        {phanTram}%
                      </span>
                    )}
                  </div>

                  <p className={`text-2xl font-bold mb-3 ${data.tong > 0 ? '' : 'text-gray-400'}`}>
                    {formatTien(data.tong)}
                  </p>

                  <p className="text-sm text-gray-500 mb-2">{data.soLuong} khoản</p>

                  {data.chiTiet.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase">Chi tiết:</p>
                      {data.chiTiet.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.ten}</span>
                          <span className="font-medium">{formatTien(item.tien)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Góc nhìn */}
          {duLieu.tong > 0 && maxLoai.loai && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>Góc Nhìn</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-gray-700">
                    <span className={LOAI_KAKEIBO[maxLoai.loai].text}>
                      <strong>{LOAI_KAKEIBO[maxLoai.loai].ten}</strong>
                    </span>
                    <span> chiếm tỷ lệ cao nhất: </span>
                    <span className="font-bold">{((maxLoai.tien / duLieu.tong) * 100).toFixed(0)}%</span>
                    <span> ({formatTien(maxLoai.tien)})</span>
                  </p>
                  {maxLoai.loai === 'WANT' && (
                    <p className="text-sm text-gray-600 mt-1">
                      → Nếu giảm 50%: Tiết kiệm {formatTien(maxLoai.tien * 0.5)}/tháng
                    </p>
                  )}
                </div>

                {duLieu.theoLoai.NEED.tong > 0 && (() => {
                  const needPhanTram = (duLieu.theoLoai.NEED.tong / duLieu.tong) * 100;
                  return (
                    <div className={needPhanTram < 50 ? 'text-green-700' : 'text-yellow-700'}>
                      {needPhanTram < 50 ? (
                        <p>✨ CẦN dưới 50% - Tốt! Vẫn còn room cho MUỐN/NÊN</p>
                      ) : (
                        <p>⚠️ CẦN chiếm {needPhanTram.toFixed(0)}% - Cân nhắc giảm chi phí sinh hoạt</p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TongHop;
