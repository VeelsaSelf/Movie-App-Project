import SearchInput from "../search-input/SearchInput";
import logo from "/src/assets/images/logo.jpeg";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__nav-brand">
        <img src={logo} className="w-16" alt="" />
      </div>
      <SearchInput />
    </div>
  );
}
