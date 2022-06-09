import React, { FC } from "react";

import { Navbar, Nav, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch } from "react-redux";
import { logout } from "../store";
import useAuth from "../hooks/useAuth";

import { FiUser, FiLogOut } from "react-icons/fi";

const Header: FC = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  return (
    <header
      className={`headerNav invert`}
      style={{
        position: "fixed",
        top: "0",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        background: "whitesmoke",
        width: "100%",
        zIndex: "100",
      }}
    >
      <Navbar id="navbar" expand="lg" collapseOnSelect className="invert">
        <Nav className="mr-auto invert" style={{ width: "100vw" }}>
          <Col md={9} className="invert">
            <Col md={3} className="invert">
              <LinkContainer
                to="/"
                style={{ position: "relative", left: "20px" }}
                className="invert"
              >
                <Nav.Link>Jackie Slanley</Nav.Link>
              </LinkContainer>
            </Col>
          </Col>
          <Col
            md={3}
            style={{ display: "flex", flexDirection: "row" }}
            className="invert"
          >
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="invert"
              style={{
                position: "absolute",
                right: "25px",
                top: "7px",
                color: "white",
              }}
            />
            <Navbar.Collapse id="basic-navbar-nav" className="invert">
              <Nav
                style={{
                  width: "100%",
                  justifyContent: "flex-end",
                }}
                className="invert"
              >
                <LinkContainer to="/about" className="invert">
                  <Nav.Link className="rightalign-nav-links">About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cv" className="invert">
                  <Nav.Link className="rightalign-nav-links">CV</Nav.Link>
                </LinkContainer>
                {auth ? (
                  <LinkContainer to="/add-work" className="invert">
                    <Nav.Link className="rightalign-nav-links">New</Nav.Link>
                  </LinkContainer>
                ) : (
                  ""
                )}
                {auth ? (
                  <LinkContainer to="/user" className="invert">
                    <Nav.Link className="rightalign-nav-links">
                      <FiUser />
                    </Nav.Link>
                  </LinkContainer>
                ) : (
                  ""
                )}
                {auth ? (
                  <Nav.Link
                    className="rightalign-nav-links invert"
                    onClick={() => dispatch(logout())}
                  >
                    <FiLogOut />
                  </Nav.Link>
                ) : (
                  ""
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
