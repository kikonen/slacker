import React from 'react';

interface Props {
  messages: Array<any>
}

export class MessagesComponent extends React.Component<Props> {
  render() {
    return (
      <div className="m-2 border border-info">
        <div>
          {this.props.messages.map((event) => (
            <div key={event.key} className="alert alert-info">
              <b>{event.user}</b>
              <p>{event.content}</p>
              {JSON.stringify(event)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
