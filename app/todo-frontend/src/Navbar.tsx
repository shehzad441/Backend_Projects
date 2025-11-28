import { Link } from "react-router-dom";

export default function Navbar() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-slate-200 transition-colors">
          ✓ Todo
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-lg font-medium text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
