import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import Header from '../Header';
import Bot from '../../components/Bot/Bot';
import styles from './chat.scss';

@cssModules(styles)
class Chat extends Component {
  constructor() {
    super();
    this.setInput = this.setInput.bind(this);
    this.state = {
      userChat: [],
      customInput: ''
    };
  }

  setInput(e) {
    this.setState({
      customInput: e.target.innerText
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="chat">
          <div className="welcomeBox">
            <h1>Welcome to KuWit!</h1>
            <p>This is KuWit, the AI bot who knows everything about <a href="http://kubernetes.io">Kubernetes</a>.</p>
            <p>He's built on the shoulders of <a href="https://wit.ai">wit.ai</a> and is becoming smarter every day by training and using Natural Language Processing.</p>
            <ul>
              <p>Say <span onClick={this.setInput} className="fake-chat-box">Hello</span>to KuWit to start to interact with him.</p>
              <p>You can ask him anything about Kubernetes but he will ususally suggest something useful you can ask.</p>
              <p>When chating with KuWit you can:</p>
              <li>
              <h2>Follow a Kubernetes tutorial for all ages:</h2>
              <p>Just say something like <span onClick={this.setInput} className="fake-chat-box">Hey KuWit, what is kubernetes?</span> and KuWit will guide you through a handy tutorial.</p>
              </li>
              <li>
              <h2>Interact with your Kubernetes cluster:</h2>
              <p>Just say something like <span onClick={this.setInput} className="fake-chat-box">Hey KuWit, tell me about my cluster</span> and KuWit will show you how to communicate and get feedback from your live cluster.</p>
              </li>
              <li>
              <h2>Follow the latest news about Kubernetes on Twitter or Github:</h2>
              <p>Just say something like <span onClick={this.setInput} className="fake-chat-box">What's Happening Now on Twitter?</span></p>
              </li>
            </ul>
            <p>These are just some examples but you can ask KuWit anything about Kubernetes at any point you need it. It's your always available resource to ask about Kubernetes.</p>
          </div>
        </div>
        <Bot botName="KuWit" customInput={this.state.customInput} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(Chat);
