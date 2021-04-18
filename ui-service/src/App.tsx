import React from 'react';
import logo from './logo.svg';
import './App.css';

function sendMessage() {
  let el: HTMLInputElement = document.querySelector("#message");
  let text: string = el.value;
  console.log("send: " + text);

  fetch("/api/send?message=" + text);
}

let source;

function startEvents() {
  source = new EventSource('/api/events');
  source.addEventListener('message', function(e) {
    console.log(e.data);

    let inboxEl: HTMLInputElement = document.querySelector("#incoming");
    let msgEl = document.createElement('div');
    msgEl.className = 'alert alert-primary';
    msgEl.innerText = e.data;

    inboxEl.appendChild(msgEl);
  }, false);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <b>So be it</b>
        <b>So say we all, so say we all</b>
        <b>So say we all, so say we all</b>
      </header>

      <form>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" className="form-control">
         </textarea>
        </div>

        <button type="button" className="btn btn-success" onClick={sendMessage}>Send</button>
      </form>

      <div id="incoming">
        ....
      </div>
    </div>
  );
}

startEvents();

export default App;
