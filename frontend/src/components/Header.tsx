import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header style={{ background: "black", color: "white", textAlign: "left" }}>
      <h1>
        {" "}
        <Link to="/">Jackie Slanley</Link>{" "}
      </h1>
      <ul>
        <li>
          <Link to="/about"> About </Link>
        </li>
        <li>
          <Link to="/cv"> CV </Link>
        </li>
        <li>
          <Link to="/contact"> Contact </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
