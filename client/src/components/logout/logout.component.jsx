import React from "react";
import { NavLink } from "reactstrap";
import { userLogout } from "../../redux/user/user.action";
import { connect } from "react-redux";

const Logout = ({ userLogout }) => {
  return (
    <NavLink href="#" color="dark" onClick={() => userLogout()}>
      Logout
    </NavLink>
  );
};

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogout())
});

export default connect(null, mapDispatchToProps)(Logout);
