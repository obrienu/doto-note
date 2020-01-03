import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo.list.style.css";
import { connect } from "react-redux";
import { deleteTask } from "../../redux/task/task.actions";
import { createStructuredSelector } from "reselect";
import { selectTasks } from "../../redux/task/task.selector";

export class TodoList extends Component {
  render() {
    const { tasks, deleteTask } = this.props;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="todo-list">
            {tasks.map(({ _id, task }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    color="danger"
                    style={{ marginRight: "1rem" }}
                    onClick={() => deleteTask(_id)}
                  >
                    &times;
                  </Button>
                  {task}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks
});

const mapDispatchToProps = dispatch => ({
  deleteTask: id => dispatch(deleteTask(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
