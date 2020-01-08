import React, { useState, Fragment } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from "reactstrap";

import RegisterModal from "../register.modal/register.modal.component";
import LoginModal from "../login.modal/login.modal.component";
import Logout from "../logout/logout.component";
import { connect } from "react-redux";
import { userDataSelector } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const NavigationBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand href="/">DoTO</NavbarBrand>
          {props.userData ? (
            <Nav className="ml-auto" navbar>
              <NavbarText className="ml-auto">
                Welcome: {props.userData.name.split(" ")[0].toUpperCase()}
              </NavbarText>
            </Nav>
          ) : null}
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {props.userData ? (
                <Fragment>
                  <NavItem>
                    <Logout />
                  </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem>
                    <RegisterModal />
                  </NavItem>
                  <NavItem>
                    <LoginModal />
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userData: userDataSelector
});

export default connect(mapStateToProps)(NavigationBar);
