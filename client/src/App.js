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
import { selectLoading, selectError } from "./redux/task/task.selector";
import { getTask } from "./redux/task/task.actions";
import { getUser } from "./redux/user/user.action";
import { isAuthenticatedSelector } from "./redux/user/user.selector";

const TodoListWithSpinner = Loader(TodoList);

class App extends Component {
  componentDidMount() {
    const { getTask, getUser } = this.props;
    getUser();
    getTask();
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
  isLoading: selectLoading,
  error: selectError,
  isAuthenticated: isAuthenticatedSelector
});
const mapDispatchToProps = dispatch => ({
  getTask: () => dispatch(getTask()),
  getUser: () => dispatch(getUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
