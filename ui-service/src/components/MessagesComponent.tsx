import React from 'react';

import autobind from "../autobind";

interface Props {
  messages: Array<any>
}

export class MessagesComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
 }

  render() {
    return (
      <div className="m-2 border border-info">
        <div>
          {this.props.messages.map((msg) => (
            <div key={msg.key} className="alert alert-info">
              <b>{msg.user}</b>
              <span>{msg.content}</span>
              <span>{JSON.stringify(msg)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
