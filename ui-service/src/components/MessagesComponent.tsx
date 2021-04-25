import React from 'react';

interface Props {
  messages: Array<any>
}

export class MessagesComponent extends React.Component<Props> {
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
