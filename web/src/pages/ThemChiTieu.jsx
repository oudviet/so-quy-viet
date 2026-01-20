import { useState } from 'react';

const LOAI_KAKEIBO = [
  { id: 'NEED', ten: 'CẦN', mau: 'bg-green-500', icon: '🟢', mota: 'Ăn uống, nhà ở, đi lại, y tế' },
  { id: 'WANT', ten: 'MUỐN', mau: 'bg-yellow-500', icon: '🟡', mota: 'Cafe, shopping, giải trí' },
  { id: 'SHOULD', ten: 'NÊN', mau: 'bg-orange-500', icon: '🟠', mota: 'Sách, khóa học, quà tặng' },
  { id: 'CAN', ten: 'CÓ THỈ', mau: 'bg-blue-500', icon: '🔵', mota: 'Sửa chữa, hỏng hóc, cơ hội' },
];

function ThemChiTieu() {
  const [soTien, setSoTien] = useState('');
  const [loaiChon, setLoaiChon] = useState(null);
  const [moTa, setMoTa] = useState('');
  const [daLuu, setDaLuu] = useState(false);

  const xuLyLuu = async (e) => {
    e.preventDefault();

    if (!loaiChon) {
      alert('Vui lòng chọn loại chi tiêu!');
      return;
    }

    // TODO: Call API to save expense
    console.log('Luu expense:', { soTien, loai: loaiChon.id, moTa });

    setDaLuu(true);

    // Reset form
    setTimeout(() => {
      setSoTien('');
      setLoaiChon(null);
      setMoTa('');
      setDaLuu(false);
    }, 2000);
  };

  const formatTien = (giaTri) => {
    if (!giaTri) return '';
    return new Intl.NumberFormat('vi-VN').format(giaTri);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Thêm Chi Tiêu Mới</h2>
        <p className="text-gray-600 mt-1">Ghi chép chi tiêu của bạn theo phương pháp Kakeibo</p>
      </div>

      {daLuu && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <span className="text-green-800 font-medium">Đã lưu chi tiêu!</span>
        </div>
      )}

      <form onSubmit={xuLyLuu} className="space-y-6">
        {/* Số tiền */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số tiền <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={soTien}
              onChange={(e) => setSoTien(e.target.value.replace(/\D/g, ''))}
              placeholder="0"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">đ</span>
          </div>
          {soTien && (
            <p className="mt-1 text-sm text-gray-500">{formatTien(soTien)} đ</p>
          )}
        </div>

        {/* Loại Kakeibo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại chi tiêu <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {LOAI_KAKEIBO.map((loai) => (
              <button
                key={loai.id}
                type="button"
                onClick={() => setLoaiChon(loai)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all text-left
                  ${
                    loaiChon?.id === loai.id
                      ? 'border-current shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                  ${loai.mau.replace('bg-', 'border-')}
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{loai.icon}</span>
                  <span className="font-bold">{loai.ten}</span>
                </div>
                <p className="text-sm text-gray-600">{loai.mota}</p>
                {loaiChon?.id === loai.id && (
                  <span className="absolute top-2 right-2 text-green-600 text-xl">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả <span className="text-gray-400">(không bắt buộc)</span>
          </label>
          <input
            type="text"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
            placeholder="Ví dụ: Cafe sáng, Cơm trưa, Mua sách..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          disabled={!soTien || !loaiChon}
          className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Lưu Chi Tiêu
        </button>
      </form>

      {/* Giải thích 4 loại */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 4 Loại Kakeibo</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li><strong>CẦN</strong> - Chi phí sinh hoạt thiết yếu</li>
          <li><strong>MUỐN</strong> - Mong muốn, giải trí, thưởng bản thân</li>
          <li><strong>NÊN</strong> - Đầu tư cho bản thân, học hỏi</li>
          <li><strong>CÓ THỈ</strong> - Bất ngờ, cơ hội, khẩn cấp</li>
        </ul>
      </div>
    </div>
  );
}

export default ThemChiTieu;
