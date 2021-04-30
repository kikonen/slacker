import React from 'react';

import autobind from "../autobind";

import { MessageComponent } from "./MessageComponent";

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
      <div className="m-1 border border-info sl-messages-container">
        <div className="sl-messages-content">
          {this.props.messages.map((msg) => (
            <div key={msg.key} className="m-1">
              <MessageComponent message={msg} users={this.props.users} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
