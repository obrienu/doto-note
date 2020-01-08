import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { editNote } from "../../redux/user/user.action";

export class ViewNote extends Component {
  state = {
    modal: false,
    isView: true,
    task: "",
    description: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSwitch = () => {
    const { task, description } = this.props;
    this.setState({
      isView: false,
      task,
      description
    });
  };

  render() {
    const { task, description, createdAt, id, editNote } = this.props;
    const View = (
      <Fragment>
        <ModalHeader toggle={this.toggle}>
          <div>{task}</div>
          <span className="small">{createdAt.substring(0, 10)}</span>
        </ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button
            onClick={this.handleSwitch}
            color="dark"
            style={{ marginTop: "2rem" }}
          >
            Edit Note
          </Button>
        </ModalFooter>
      </Fragment>
    );

    const Edit = (
      <Fragment>
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
            <Button
              onClick={() => {
                editNote(id, {
                  task: this.state.task,
                  description: this.state.description
                });
                this.toggle();
              }}
              color="dark"
              style={{ marginTop: "2rem" }}
            >
              Edit Note
            </Button>
          </Form>
        </ModalBody>
      </Fragment>
    );

    return (
      <div>
        <Button color="dark" onClick={this.toggle}>
          View
        </Button>
        <Modal
          style={{ marginTop: "4rem" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          {this.state.isView ? View : Edit}
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editNote: (id, note) => dispatch(editNote(id, note))
});

export default connect(null, mapDispatchToProps)(ViewNote);
