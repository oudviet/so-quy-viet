function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📊</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sổ Quỹ Việt</h1>
            <p className="text-sm text-gray-500">Quản lý tiền theo phương pháp Kakeibo</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
