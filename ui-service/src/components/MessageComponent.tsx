import React from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

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
    const formatted = marked(msg.content) + `<button onclick="alert('foo')">Foo</button>`;
    const sanitized = DOMPurify.sanitize(formatted);

    const dtStr = msg.updated_at || msg.created_at;
    let formattedTime = null;
    if (dtStr) {
      formattedTime = new Date(dtStr).toLocaleString();
    }

    const dbg= <span className="ml-2">- DBG: {JSON.stringify(msg)}</span>
    return (
      <div className="card">
        <div className="card-body m-1 p-1">
          <b>{users.get(msg.user)?.name || msg.user}</b> {formattedTime}
           <div className="ml-1" dangerouslySetInnerHTML={{ __html: sanitized }}></div>
        </div>
      </div>
    );
  }
}
