import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./search-input.css";
import { gsap } from "gsap";
import { useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleInput, setToggleInput] = useState(
    searchParams.get("query") ? true : false
  );
  const searchInput = useRef();

  useEffect(() => {
    gsap.from(searchInput.current, { width: 0, duration: 0.3, ease: "linear" });
    searchInput.current.focus();
  }, [toggleInput]);

  const handleButtonClick = () => {
    setToggleInput(true);
  };

  const handleInputBlur = (e) => {
    const query = e.target.value;
    if (query.length > 0) return;
    setToggleInput(false);
  };

  const handleSearchInput = (e) => {
    if (e.target.value)
      setSearchParams({
        query: e.target.value,
      });
    else setSearchParams();
  };

  return (
    <div className="search">
      <div
        className={`search__search-wrapper ${toggleInput ? "" : "md:hidden"}`}
      >
        <BsSearch size="24" className="min-w-min hidden md:block" />
        <input
          className="search__search-input"
          type="text"
          placeholder="Cari Film Kesayangan"
          value={searchParams.get("query") ?? ""}
          onInput={handleSearchInput}
          ref={searchInput}
          onBlur={handleInputBlur}
        />
      </div>
      <button
        className={`search__button ${toggleInput ? "hidden" : ""}`}
        onClick={handleButtonClick}
      >
        <BsSearch size="24" />
      </button>
    </div>
  );
}
