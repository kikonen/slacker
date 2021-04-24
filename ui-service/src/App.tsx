import React from 'react';
import logo from './logo.svg';
import './App.css';

const channelId = 'b9335aed-5ecb-43b8-b026-014925752084';

function sendCommand() {
  let el: HTMLInputElement = document.querySelector("#command");
  let text: string = el.value;
  console.log("send: " + text);

  const params = new Map([
    ['channel', channelId],
    ['text', text],
  ]);

  let parts: string[] = [];
  params.forEach((v, k) => { parts.push(`${k}=${encodeURIComponent(v)}`) });

  const url = `/api/commands/send?${parts.join('&')}`;
  fetch(url, { method: 'POST' });
}

let source;

function startEvents() {
  const params = new Map([
    ['channel', channelId],
  ]);

  let parts: string[] = [];
  params.forEach((v, k) => { parts.push(`${k}=${encodeURIComponent(v)}`) });

  const url = `/api/events/latest?${parts.join('&')}`;

  source = new EventSource(url);
  source.addEventListener('message', function(e: any) {
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
          <label htmlFor="command">Message</label>
          <textarea id="command" className="form-control">
         </textarea>
        </div>

        <button type="button" className="btn btn-success" onClick={sendCommand}>Send</button>
      </form>

      <a href="../auth/login" className="btn btn-normal">Login</a>

      <div id="incoming">
        ....
      </div>
    </div>
  );
}

startEvents();

export default App;
