import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div
        className="mx-5 bg-dark text-light d-flex justify-content-center p-2 my-4 shadow"
        style={{ borderRadius: "50px" }}
      >
        <Link style={{ textDecoration: "none" }} className="text-light" to="/">
          <h3>Sequelizer Rest APIs</h3>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
