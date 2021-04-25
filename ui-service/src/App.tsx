import React from 'react';
import logo from './logo.svg';
import './App.css';

import { NavbarComponent } from './components/NavbarComponent';
import { ChannelsComponent } from './components/ChannelsComponent';
import { MessagesComponent } from './components/MessagesComponent';
import { MessageEditComponent } from './components/MessageEditComponent';

type AppState = {
  userInfo: any,
  channel_id: string,
  channels: Array<any>,
  messages: Array<any>,
  source: EventSource,
};

const TEST_CHANNEL = 'b9335aed-5ecb-43b8-b026-014925752084';

class App extends React.Component<{}, AppState>
{
  constructor(props: any) {
    super(props);

    this.state = {
      userInfo: { name: 'na', email: 'na', valid: false },
      messages: [],
      source: null,
      channel_id: TEST_CHANNEL,
      channels: [],
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.startEvents();
  }

  async startEvents() {
    const self = this;

    const params = new Map([
      ['channel', this.state.channel_id],
    ]);

    let parts: string[] = [];
    params.forEach((v, k) => { parts.push(`${k}=${encodeURIComponent(v)}`) });

    const url = `/api/events/latest?${parts.join('&')}`;

    let source = new EventSource(url);

    this.setState((state, props) => ({ source: source }));

    source.addEventListener('message', async function(e: any) {
      const ev: any = JSON.parse(e.data)
      console.log(ev);
      self.setState((state, props) => (
        {
          messages: [...state.messages, ev]
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
    return (
      <div className="App">
        <NavbarComponent userInfo={this.state.userInfo} />
        <ChannelsComponent channels={this.state.channels} />
        <MessagesComponent messages={this.state.messages} />
        <MessageEditComponent channel_id={this.state.channel_id} />
     </div>
    );
  }
}

export default App;
