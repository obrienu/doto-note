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
import { addNote } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { userDataSelector } from "../../redux/user/user.selector";

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
    const { addNote, user } = this.props;
    const { task, description } = this.state;
    const body = {
      task,
      description
    };
    addNote(body, user.id);
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

        <Modal
          style={{ marginTop: "4rem" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add New Note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="task">Note</Label>
                <Input
                  id="task"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.task}
                  name="task"
                  placeholder="Enter Note"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="textarea"
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

const mapStateToProps = createStructuredSelector({
  user: userDataSelector
});

const mapDispatchToProps = dispatch => ({
  addNote: task => dispatch(addNote(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(InputModal);
