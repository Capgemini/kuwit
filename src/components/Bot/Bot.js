import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import styles from './bot.scss';
import request from 'superagent';
import uuid from 'uuid';

import 'bootstrap/dist/css/bootstrap.css';

const WIT_URL = 'webhook';

@cssModules(styles)
class Bot extends Component {
  constructor(props) {
    super(props);
    this.handleApiCall = this.handleApiCall.bind(this);
    this.handleChatBox = this.handleChatBox.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      input: '',
      visibility: true,
      clickText: 'Hide me!',
      chat: [],
      uuid: uuid.v1()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      input: nextProps.customInput
    });
  }

  componentDidUpdate() {
    const element = this.refs.botTextArea;
    element.scrollTop = element.scrollHeight;
  }

  handleApiCall(e) {
    e.preventDefault();
    if (this.state.input === '') return;

    const message = {};
    message.text = this.state.input;
    message.user = 'user';
    message.quickReplies = [];

    const chat = this.state.chat;
    chat.push(message);

    this.setState({ input: '' });

    request.post(WIT_URL)
    .set('Content-Type', 'application/json')
    .send({ 'message': message.text, 'userId': this.state.uuid })
    .end((err, res) => {
      if (err) {
        const data = {
          text: 'Ups! there was an error on the request, try again!',
          quickReplies: [],
          user: 'server'
        };
        chat.push(data);
      } else {
        const respon = JSON.parse(res.text);
        const data = {
          text: respon.text,
          quickReplies: respon.quickreplies || [],
          user: 'server'
        };
        chat.push(data);
      }
      this.setState({ chat: chat });
    });
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  handleChatBox() {
    const visibility = !(this.state.visibility);
    const clickTest = (visibility === true) ? 'Hide me!' : 'Click me to chat!';
    this.setState({ visibility: visibility });
    this.setState({ clickText: clickTest });
  }

  handleReply(e) {
    this.setState({ input: e.target.innerText });
  }

  render() {
    const { botName } = this.props;
    return (
      <div>
        <Button onClick={this.handleChatBox}>{this.state.clickText}</Button>
        <div className={(this.state.visibility === true) ? 'resizable' : 'hide resizable'}>
          <h1>{botName}</h1>
          <p>Ask me a question.</p>
          <div>
            <div ref="botTextArea" className="botTextArea">
              {this.state.chat.map((msg) => {
                return (
                  <div className="clearBoth">
                    <div className={(msg.user === 'server') ? 'bot chat-box' : 'user chat-box'}>
                      <span dangerouslySetInnerHTML={ { __html: msg.text } }></span><br />
                    </div>
                    {msg.quickReplies.map((reply) => {
                      return (
                        <div onClick={this.handleReply} className="quickReplies chat-box reply" >
                          <span>{reply}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <form onSubmit={this.handleApiCall}>
            <FormControl
              ref="messageField"
              value={this.state.input}
              type="text"
              placeholder="Ask me anything"
              onChange={this.handleInputChange}
            />
          </form>
          <Button onClick={this.handleApiCall}>Send</Button>
        </div>
      </div>
    );
  }
}

Bot.propTypes = {
  botName: React.PropTypes.string,
  customInput: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(Bot);
