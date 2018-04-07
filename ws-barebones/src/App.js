import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {

    // The value of the UI text input field.
    newMessage: '',

    // All messages this component receives via the WebSocket connection.
    messages: [],

  };

  componentDidMount() {

    // Establish a WebSocket connection with the WebSocket server.
    this.ws = new WebSocket('ws://localhost:3001');

    // Whenever an `open` event occurs on the WebSocket connection, 
    // log a message to the console.
    //
    this.ws.addEventListener('open', event => {
      console.log('WS connection open', event);
    });

    // Whenever a `message` event occurs on the WebSocket connection, 
    // append the event's payload to the messages array.
    //
    this.ws.addEventListener('message', event => {
      this.setState({ messages: this.state.messages.concat([event.data]) });
    });
    
  }

  // Whenever the UI form is submitted, send the message stored in this
  // component's state, to the WebSocket server via the WebSocket connection.
  //
  handleSubmit = e => {
    e.preventDefault();
    this.ws.send(this.state.newMessage);
    this.setState({
      newMessage: '',
    });
  };

  // Whenever the UI text input field changes, store its contents in this
  // component's state.
  //
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
