import React from "react";
import { Form, Button, Select } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalAddChatForm extends React.Component {
  state = {
    usernames: [],
    error: null
  };

  handleChange = value => {
    this.setState({
      usernames: value
    });
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    const { usernames } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const combined = [...usernames, this.props.username];
        console.log(combined);
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        axios
          .post("http://127.0.0.1:8000/chat/create/", {
            messages: [],
            participants: combined
          })
          .then(res => {
            this.props.history.push(`/${res.data.id}`);
            this.props.closeAddChatPopup();
            this.props.getUserChats(this.props.username, this.props.token);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              error: err
            });
          });
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {this.state.error ? `${this.state.error}` : null}
        <FormItem
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message:
                  "Please input the username of the person you want to chat with"
              }
            ]
          })(
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              onChange={this.handleChange}
            >
              {[]}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Start a chat
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const AddChatForm = Form.create()(HorizontalAddChatForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddChatForm)
);
