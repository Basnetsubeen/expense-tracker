import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../../pages/userState/userAction";

export const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleOnLogout = () => {
    // localStorage.removeItem("user");
    dispatch(userLogoutAction());
    navigate("/");
  };

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="#home"> Expense Tracker</Navbar.Brand>
        Welcome {user.fName}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user._id ? (
              <Nav.Link onClick={handleOnLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
