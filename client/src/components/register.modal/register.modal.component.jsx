import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { registerUser } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import {
  errorMessageSelector,
  errorIdSelector
} from "../../redux/errors/error.selector";
import { isAuthenticatedSelector } from "../../redux/user/user.selector";
import { clearError } from "../../redux/errors/error.action";

export class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    cpassword: "",
    msg: null
  };

  toggle = () => {
    this.props.clearError();
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { registerUser } = this.props;
    const { name, email, password, cpassword } = this.state;
    registerUser({
      name,
      email,
      password,
      cpassword
    });
    this.setState({
      name: "",
      email: "",
      password: "",
      cpassword: ""
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps) {
    const { errorId, error } = this.props;
    if (error !== prevProps.error) {
      if (errorId === "Registration Failed") {
        this.setState({
          msg: error
        });
      } else {
        this.setState({
          msg: null
        });
      }
    }

    if (this.state.modal && this.props.isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    const { msg } = this.state;
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>

        <Modal
          style={{ marginTop: "4rem" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                  name="name"
                  placeholder="Enter Full Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                  placeholder="Enter Email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  placeholder="Enter Password"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.cpassword}
                  name="cpassword"
                  placeholder="Confirm Password"
                  required
                />
              </FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: errorMessageSelector,
  errorId: errorIdSelector,
  isAuthenticated: isAuthenticatedSelector
});

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
