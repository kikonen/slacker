import React from 'react';

import autobind from "../autobind";

interface Props {
  users: Map<String, any>,
  messages: Array<any>
}

export class MessagesComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
 }

  render() {
    const users = this.props.users;

    return (
      <div className="m-2 border border-info sl-messages-container">
        <div className="sl-messages-content">
          {this.props.messages.map((msg) => (
            <div key={msg.key} className="alert alert-info">
              <b>{users.get(msg.user)?.name || msg.user}</b>
              <span className="ml-1">{msg.content}</span>
              <span className="ml-2">- DBG: {JSON.stringify(msg)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
