import React from 'react';

import autobind from "../autobind";

import { MessageComponent } from "./MessageComponent";

interface Props {
  users: Map<String, any>,
  messageIds: Array<any>,
  messagesById: Map<String, any>,
}

export class MessagesComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
 }

  render() {
    const messagesById = this.props.messagesById;

    return (
      <div className="m-1 border border-info sl-messages-container">
        <div className="sl-messages-content">
          {this.props.messageIds.map((msgId) => {
            const msg = messagesById.get(msgId);

            return (
              <div key={msg.key} className="m-1">
                <MessageComponent message={msg} users={this.props.users} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
