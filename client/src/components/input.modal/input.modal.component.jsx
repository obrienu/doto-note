import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addTask } from "../../redux/task/task.actions";

export class InputModal extends Component {
  state = {
    modal: false,
    task: "",
    description: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { addTask } = this.props;
    const { task, description } = this.state;
    addTask({
      task,
      description
    });
    this.toggle();
    this.setState({
      task: "",
      description: ""
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem", marginTop: "2rem" }}
          onClick={this.toggle}
        >
          Add Note
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="task">Task</Label>
                <Input
                  id="task"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.task}
                  name="task"
                  placeholder="Enter Task"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.description}
                  name="description"
                  placeholder="Enter Description"
                  required
                />
              </FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Note
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task))
});

export default connect(null, mapDispatchToProps)(InputModal);
