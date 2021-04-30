import React from 'react';

import autobind from "../autobind";

interface Props {
  users: Map<String, any>,
  message: any
}

export class MessageComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
 }

  render() {
    const users = this.props.users;
    const msg = this.props.message;

    // <span className="ml-2">- DBG: {JSON.stringify(msg)}</span>
    return (
      <div className="card">
        <div className="card-body m-1 p-1">
          <b>{users.get(msg.user)?.name || msg.user}</b>
           <span className="ml-1">{msg.content}</span>
        </div>
      </div>
    );
  }
}
