function Navigation({ trangHienTai, setTrang }) {
  const cacTrang = [
    { id: 'tong-hop', ten: 'Tổng Hợp', icon: '📊' },
    { id: 'them-chi-tieu', ten: 'Thêm Chi Tiêu', icon: '➕' },
    { id: 'lich-su', ten: 'Lịch Sử', icon: '📝' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-1">
          {cacTrang.map((trang) => (
            <button
              key={trang.id}
              onClick={() => setTrang(trang.id)}
              className={`
                px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${
                  trangHienTai === trang.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-1">{trang.icon}</span>
              {trang.ten}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
