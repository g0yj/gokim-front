import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="w-full h-16 bg-blue-600 flex items-center justify-between px-6 text-white">
      {/* 왼쪽 정렬 */}
      <div className="flex items-end space-x-5">
        <h1 className="text-2xl font-bold">TaskFlow</h1>
        <nav className="flex">
          <ul className="space-x-4">
            <Link to="/" className="hover:underline text-sm">
              내작업
            </Link>
            <Link to="/board" className="hover:underline text-sm">
              프로젝트
            </Link>
            <span className="hover:underline text-sm">연진</span>
          </ul>
        </nav>
      </div>

      {/* 오른쪽 정렬 */}
      <div className="flex items-end space-x-4">
        <div className="flex border rounded px-2 py-1 h-8 bg-white text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-search-icon lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input className="px-2" placeholder="검색" />
        </div>
        {/* 알람 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-bell-icon lucide-bel"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>


         <div className="flex items-end space-x-4 relative">
        {/* 프로필 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>

        {isProfileOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white w-24 h-auto shadow-md rounded z-50 border border-r-4">
            <button
              onClick={handleLogout}
              className="w-full text-black hover:bg-gray-100 px-2 py-1"
            >
              로그아웃
            </button>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
