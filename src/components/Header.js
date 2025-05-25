import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import {
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaUserShield,
  FaBell,
  FaSignInAlt,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reg.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <span style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>
            BB
          </span>
          <span style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
            DMS
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="mx-2 d-flex align-items-center">
              <FaHome className="me-1" />
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about" className="mx-2 d-flex align-items-center">
              <FaInfoCircle className="me-1" />
              About Us
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contactus" className="mx-2 d-flex align-items-center">
              <FaPhone className="me-1" />
              Contact Us
            </Nav.Link>

            <Nav.Link as={NavLink} to="/donorlist" className="mx-2 d-flex align-items-center">
              <FaUsers className="me-1" />
              Donor List
            </Nav.Link>

            <Nav.Link as={NavLink} to="/searchdonor" className="mx-2 d-flex align-items-center">
              <FaSearch className="me-1" />
              Search Donor
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <FaUser className="me-1" />
                    My Account
                  </span>
                }
                id="basic-nav-dropdown"
                className="mx-2"
                align="end"
              >
                <NavDropdown.Item as={NavLink} to="/profile" className="d-flex align-items-center">
                  <FaUser className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/forgetpassword" className="d-flex align-items-center">
                  <FaLock className="me-2" />
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/request-received" className="d-flex align-items-center">
                  <FaBell className="me-2" />
                  Request Received
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center text-danger">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/admin" className="mx-2 d-flex align-items-center">
                  <FaUserShield className="me-1" />
                  Admin
                </Nav.Link>

                <Button variant="danger" as={NavLink} to="/login" className="ms-2 d-flex align-items-center">
                  <FaSignInAlt className="me-1" />
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
