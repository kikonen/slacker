import React from 'react';

import autobind from "../autobind";

interface Props {
  channelId: string,
}

export class MessageEditComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  async onKeyPress(e: any) {
    if (e.code !== 'Enter') return;
    if (e.shiftKey) return;

    this.onSend(e);
  }

  async onSend(e: any) {
    e.preventDefault();

    let el: HTMLInputElement = document.querySelector("#command");
    let text: string = el.value;

    console.log("SEND: " + text);

    const data = {
      channel_id: this.props.channelId,
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
      el.value = '';
    }
  }

  render() {
    return (
      <div className="m-1 border border-success sl-message-edit-container">
        <div>
          <form className="d-flex align-items-start">
            <label htmlFor="command" className="sr-only">Message</label>
            <textarea id="command" className="m-2 form-control" onKeyPress={this.onKeyPress}>
            </textarea>

            <button type="button" className="mt-2 mr-2 mb-2 btn btn-success" onClick={this.onSend}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}
