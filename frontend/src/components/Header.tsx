import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header: FC = () => {
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
      <Navbar id="navbar" expand="lg" collapseOnSelect variant="light">
        <Nav
          className="mr-auto"
          style={{ width: "100%", position: "relative", left: "20px" }}
        >
          <LinkContainer to="/">
            <Nav.Link>
              <strong>Jackie Slanley</strong>
            </Nav.Link>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ position: "absolute", right: "25px" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cv">
                <Nav.Link>CV</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
