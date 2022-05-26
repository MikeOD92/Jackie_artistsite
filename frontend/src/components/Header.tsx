import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

const Header: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const validate = async () => {
      const data = await axios.post("http://localhost:8000/api/token/verify/", {
        token: token,
      });
      if (data.status === 200) {
        setAuth(true);
      }
    };
    if (localStorage.getItem("access_token")) {
      validate();
    }
  }, [token]);

  return (
    <header
      className="headerNav"
      style={{
        position: "fixed",
        top: "0",
        // boxShadow: "2px 2px 10px rgba(0,0,0,0.4)",
        width: "100%",
        background: "yellow",
        // background: "rgb(200,0,225)",
        // background: "white",
        zIndex: "100",
      }}
    >
      <Navbar id="navbar" expand="lg" collapseOnSelect>
        <Nav
          className="mr-auto"
          style={{ width: "100%", position: "relative", left: "20px" }}
        >
          <LinkContainer to="/">
            <Nav.Link className="pointer">
              <strong>Jackie Slanley</strong>
            </Nav.Link>
          </LinkContainer>

          <Navbar.Toggle
            className="pointer"
            aria-controls="basic-navbar-nav"
            style={{ position: "absolute", right: "25px" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link className="pointer">About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cv">
                <Nav.Link className="pointer">CV</Nav.Link>
              </LinkContainer>
              {auth ? (
                <LinkContainer to="/cv">
                  <Nav.Link className="pointer">Authorized</Nav.Link>
                </LinkContainer>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
