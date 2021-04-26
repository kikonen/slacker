import React from 'react';
//import logo from './logo.svg';
import './App.css';

import autobind from './autobind'

import { NavbarComponent } from './components/NavbarComponent';
import { ChannelsComponent } from './components/ChannelsComponent';
import { MessagesComponent } from './components/MessagesComponent';
import { MessageEditComponent } from './components/MessageEditComponent';
import { ChannelSelectorComponent } from './components/ChannelSelectorComponent';
import { ChannelCreateComponent } from './components/ChannelCreateComponent';

type AppState = {
  userInfo: any,
  channelId: string,
  messages: Array<any>,
  source: EventSource,
};

class App extends React.Component<{}, AppState>
{
  constructor(props: any) {
    super(props);

    this.state = {
      userInfo: { name: 'na', email: 'na', channels: [], valid: false },
      messages: [],
      source: null,
      channelId: null,
    };

    autobind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  async stopEvents() {
    if (this.state.source) {
      this.state.source.close();
      this.setState((state, props) => ({ source: null }));
    }
  }

  async startEvents() {
    this.stopEvents();

    const self = this;

    const params = new Map([
      ['channel', this.state.channelId],
    ]);

    let parts: string[] = [];
    params.forEach((v, k) => { parts.push(`${k}=${encodeURIComponent(v)}`) });

    const url = `/api/events/latest?${parts.join('&')}`;

    console.log("START_EVENTS: " + url);

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
      userInfo = { name: 'Not logged in', email: '', channels: [], valid: false };
    } else {
      userInfo.valid = true;
    }
    userInfo.channels = userInfo.channels || [];
    let channelId = userInfo.channels.length ? userInfo.channels[0].id : null;

    this.setState((state, props) => ({
      userInfo: userInfo,
      channelId: channelId,
    }));

    this.startEvents();
  }

  onSelectChannel(channelId: string) {
    console.log("SELECT: " + channelId);
    this.setState((state, props) => ({
      channelId: channelId,
      messages: [],
    }),
    () => this.startEvents() );
  }

  render() {
    return (
      <div className="sl-app">
        <NavbarComponent userInfo={this.state.userInfo} />
        <div className="container-fluid sl-content">
          <div className="row no-gutters">
            <div className="col-2">
              <ChannelsComponent
                userInfo={this.state.userInfo}
                channelId={this.state.channelId}
                onSelect={this.onSelectChannel} />
            </div>
            <div className="col-10">
              <MessagesComponent messages={this.state.messages} />
              <MessageEditComponent channelId={this.state.channelId} />
            </div>
          </div>
        </div>

        <ChannelSelectorComponent userInfo={this.state.userInfo} />
        <ChannelCreateComponent userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default App;
