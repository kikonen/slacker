import React from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

import autobind from "../autobind";

import Emitter from '../Emitter';
import { MessageEditComponent } from './MessageEditComponent';

interface Props {
  users: Map<String, any>,
  message: any
}

type State = {
  edit: boolean,
}

export class MessageComponent extends React.Component<Props, State> {
  state = {
    edit: false,
  }

  constructor(props: any) {
    super(props);

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('message.edit.close', this.eventEditClose);
  }

  eventEditClose(e: any) {
    this.setState({
      edit: false,
    });
  }

  onEdit(e: any) {
    this.setState({
      edit: true,
    });
  }

  render() {
    const users = this.props.users;
    const msg = this.props.message;
    const formatted = marked(msg.content);// + `<button onclick="alert('foo')">Foo</button>`;
    const sanitized = DOMPurify.sanitize(formatted);

    const dtStr = msg.updated_at || msg.created_at;
    let formattedTime = null;
    if (dtStr) {
      formattedTime = new Date(dtStr).toLocaleString();
    }

    //const dbg = <span className="ml-2">- DBG: {JSON.stringify(msg)}</span>
    return (
      <div className="card">
        <div className="card-body m-1 p-0">
          <b>{users.get(msg.user)?.name || msg.user}</b> {formattedTime} { msg.updated_at? '(Edited)' : null}
          <div className="ml-0" dangerouslySetInnerHTML={{ __html: sanitized }}></div>
          { this.state.edit ? null : <button onClick={this.onEdit}>Edit</button> }
        </div>
        { this.state.edit ? <MessageEditComponent message={msg} /> : null }
      </div>
    );
  }
}
