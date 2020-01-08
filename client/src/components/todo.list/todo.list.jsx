import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo.list.style.css";
import { connect } from "react-redux";
import { deleteNotes } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { notesSelector } from "../../redux/user/user.selector";
import ViewNote from "../view.note/view.note.component";

export class TodoList extends Component {
  render() {
    const { notes, deleteNotes } = this.props;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="todo-list">
            {notes.map(({ _id, task, createdAt, description }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem className="todoContainer">
                  <Button
                    color="danger"
                    style={{ marginRight: "1rem" }}
                    onClick={() => deleteNotes(_id)}
                  >
                    &times;
                  </Button>
                  <div
                    style={{
                      width: "100%"
                    }}
                    className="todoContent"
                  >
                    <h5>{task}</h5>
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "space-between"
                      }}
                    >
                      <span className="small">
                        {createdAt.substring(0, 10)}
                      </span>
                      <ViewNote
                        id={_id}
                        task={task}
                        description={description}
                        createdAt={createdAt}
                      />
                    </div>
                  </div>
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
  notes: notesSelector
});

const mapDispatchToProps = dispatch => ({
  deleteNotes: id => dispatch(deleteNotes(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
