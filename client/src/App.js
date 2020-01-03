import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/navbar.component";
import TodoList from "./components/todo.list/todo.list";
import { Container } from "reactstrap";
import FormModal from "./components/input.modal/input.modal.component";
import Loader from "./components/loading.wrapper/loading.wrapper.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLoading, selectError } from "./redux/task/task.selector";
import { getTask } from "./redux/task/task.actions";

const TodoListWithSpinner = Loader(TodoList);

class App extends Component {
  componentDidMount() {
    const { getTask } = this.props;
    getTask();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <FormModal />
          <TodoListWithSpinner {...this.props} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  error: selectError
});
const mapDispatchToProps = dispatch => ({
  getTask: () => dispatch(getTask())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
