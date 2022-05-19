import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header: FC = () => {
  return (
    <header>
      <Navbar id="navbar" expand="lg" collapseOnSelect variant="light">
        <Nav className="mr-auto" style={{ width: "100%" }}>
          <LinkContainer to="/">
            <Nav.Link>Jackie Slanley</Nav.Link>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ position: "absolute", right: "15px" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cv">
                <Nav.Link>CV</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
