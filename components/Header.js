import Link from "next/link";
import React, { useContext, useState, useEffect, useRef } from "react";
import { FaSignInAlt, FaSignOutAlt, FaSearch } from "react-icons/fa";
// import BiSearchAlt2 from "react-icons/fa";
import styles from "../styles/Header.module.css";
import AuthContext from "@/context/AuthContext";
import Search from "./Search";

export default function Header() {
  const ref = useRef();
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const checkIfClikcedOutside = (e) => {
      if (search && ref.current && !ref.current.contains(e.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("mousedown", checkIfClikcedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClikcedOutside);
    };
  }, [search]);

  const searchClicked = () => {
    setSearch(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_search_logo}>
        <div className={styles.logo}>
          <Link href="/">
            <a>DJ Events</a>
          </Link>
        </div>
        <div className={styles.search_container}>
          {search ? (
            <Search ref={ref} />
          ) : (
            <FaSearch className={styles.search} onClick={searchClicked} />
          )}
        </div>
      </div>
      <nav>
        {user ? (
          <ul>
            {/* If logged in */}
            <div className={styles.items_container}>
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashbord">
                  <a>Dashbord</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </div>
          </ul>
        ) : (
          <ul className={styles.items_logout}>
            {/* If logged out */}
            <div className={styles.items_container}>
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </div>
          </ul>
        )}
      </nav>
    </header>
  );
}
