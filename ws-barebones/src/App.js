import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    newMessage: '',
    messages: [],
  };

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.addEventListener('open', event => {
      console.log('WS connection open', event);
    });

    this.ws.addEventListener('message', event => {
      this.setState({ messages: this.state.messages.concat([event.data]) });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.ws.send(this.state.newMessage);
    this.setState({
      newMessage: '',
    });
  };

  handleText = e => {
    this.setState({
      newMessage: e.target.value,
    });
  };

  render() {
    const { messages, newMessage } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the React WebSockets Demo</h1>
        </header>
        <main className="App-main">
          <p>Messages:</p>
          <ul>{messages.map((m, index) => <li key={index}>{m}</li>)}</ul>
          <form onSubmit={this.handleSubmit}>
            <input
              size={70}
              placeholder="Enter a message"
              value={newMessage}
              onChange={this.handleText}
            />
          </form>
        </main>
      </div>
    );
  }
}

export default App;
