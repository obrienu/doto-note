import React, { Component, Fragment } from "react";
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
import { userLogin } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import {
  errorMessageSelector,
  errorIdSelector
} from "../../redux/errors/error.selector";
import "./login.modal.style.css";
import { isAuthenticatedSelector } from "../../redux/user/user.selector";

export class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.userLogin({ email, password });
    this.setState({
      email: "",
      password: ""
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
      if (errorId === "Login Failed") {
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
    return (
      <Fragment>
        <NavLink href="#" onClick={this.toggle}>
          Login
        </NavLink>

        <Modal
          style={{ marginTop: "4rem" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.handleSubmit}>
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

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: errorMessageSelector,
  errorId: errorIdSelector,
  isAuthenticated: isAuthenticatedSelector
});

const mapDispatchToProps = dispatch => ({
  userLogin: task => dispatch(userLogin(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
