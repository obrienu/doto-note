import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/navbar.component";
import TodoList from "./components/todo.list/todo.list";
import { Container, Alert } from "reactstrap";
import FormModal from "./components/input.modal/input.modal.component";
import Loader from "./components/loading.wrapper/loading.wrapper.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isLoadingSelector } from "./redux/user/user.selector";
import { getUser, getNotes } from "./redux/user/user.action";
import { isAuthenticatedSelector } from "./redux/user/user.selector";

const TodoListWithSpinner = Loader(TodoList);

class App extends Component {
  componentDidMount() {
    const { getUser, getNotes } = this.props;
    getUser();
    getNotes();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          {this.props.isAuthenticated ? (
            <div>
              <FormModal />
              <TodoListWithSpinner {...this.props} />
            </div>
          ) : (
            <Alert className="text-center mt-4" color="danger">
              Please Login to view your notes
            </Alert>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: isLoadingSelector,
  isAuthenticated: isAuthenticatedSelector
});
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getNotes: () => dispatch(getNotes())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
