import React from 'react';
import logo from './logo.svg';
import './App.css';

import { NavbarComponent } from './components/NavbarComponent';

type AppState = {
  userInfo: any,
  events: Array<any>,
  source: EventSource,
};

const channelId = 'b9335aed-5ecb-43b8-b026-014925752084';

function sendCommand() {
  let el: HTMLInputElement = document.querySelector("#command");
  let text: string = el.value;
  console.log("send: " + text);

  const data = {
    channel_id: channelId,
    text: text,
  };

  fetch('/api/commands/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

class App extends React.Component<{}, AppState>
{
  constructor(props: any) {
    super(props);

    this.state = {
      userInfo: { name: 'na', email: 'na', valid: false },
      events: [],
      source: null,
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.startEvents();
  }

  async startEvents() {
    const self = this;

    const params = new Map([
      ['channel', channelId],
    ]);

    let parts: string[] = [];
    params.forEach((v, k) => { parts.push(`${k}=${encodeURIComponent(v)}`) });

    const url = `/api/events/latest?${parts.join('&')}`;

    let source = new EventSource(url);

    this.setState((state, props) => ({ source: source }));

    source.addEventListener('message', async function(e: any) {
      const ev: any = JSON.parse(e.data)
      ev.value = JSON.parse(ev.value);
      console.log(ev);
      self.setState((state, props) => (
        {
          events: [...state.events, ev]
        }
      ));
    }, false);
  }

  async fetchUserInfo() {
    const response = await fetch('/api/session/me');
    let rs = await response.json();
    console.log(rs);
    let userInfo = rs.data;
    if (!userInfo) {
      userInfo = { name: 'Not logged in', email: '', valid: false };
    } else {
      userInfo.valid = true;
    }
    this.setState((state, props) => ({
      userInfo: userInfo
    }));
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div className="App">
        <NavbarComponent userInfo={userInfo} />

        <div className="m-2 border border-success">
          <form>
            <div className="form-group">
              <label htmlFor="command">Message</label>
             <textarea id="command" className="m-2 form-control">
               </textarea>
            </div>

            <button type="button" className="btn btn-success" onClick={sendCommand}>Send</button>
          </form>
        </div>

        <div className="m-2 border border-info">
          <div>
            {this.state.events.map((event) => (
              <div key={event.key} className="alert alert-info">
                <b>{event.value.user}</b>
                <p>{event.value.content}</p>
                {JSON.stringify(event)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
