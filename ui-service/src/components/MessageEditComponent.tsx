import React from 'react';

import autobind from "../autobind";
import Emitter from '../Emitter';

interface Props {
  channelId?: string,
  message?: any,
};

type State = {
  content: string,
};

export class MessageEditComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      content: this.props.message?.content || '',
    };

    autobind(this);
  }

  async onChange(e: any) {
    this.setState({
      content: e.target.value,
    });
  }

  async onKeyPress(e: any) {
    if (e.code !== 'Enter') return;
    if (e.shiftKey) return;

    this.onSend(e);
  }

  async onKeyDown(e: any) {
    if (!this.props.message) return;
    if (e.code !== 'Escape') return;
    Emitter.emit('message.edit.close', { id: this.props.message.id });
  }

  async onSend(e: any) {
    e.preventDefault();

    const text = this.state.content;

    console.log("SEND: " + text);

    let channelId = this.props.message?.channel || this.props.channelId;

    const data = {
      id: this.props.message?.id,
      channel_id: channelId,
      text: text,
    };

    const response = await fetch('/api/commands/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log(response);
    if (response.ok) {
      if (this.props.message) {
        Emitter.emit('message.edit.close', { id: this.props.message.id });
      } else {
        this.setState({
          content: '',
        });
      }
    }
  }

  render() {
    //let msg = this.props.message || { content: '' }

    return (
      <div className="m-1 border border-success sl-message-edit-container">
        <div>
          <form className="d-flex align-items-start">
            <label htmlFor="command" className="sr-only">Message</label>
            <textarea id="command" className="m-2 form-control"
              onKeyPress={this.onKeyPress}
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}
              value={this.state.content}>
            </textarea>

            <button type="button" className="mt-2 mr-2 mb-2 btn btn-success" onClick={this.onSend}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}
