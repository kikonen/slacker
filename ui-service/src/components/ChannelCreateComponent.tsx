import React from 'react';

import autobind from "../autobind";
import Emitter from '../Emitter';

declare var $ :any;

interface Props {
  userInfo: any,
}

type State = {
};

export class ChannelCreateComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('channel.create.show', this.eventShow);
  }

  eventShow(e: any) {
    console.log("show create dialog...");

    let el: HTMLInputElement = document.querySelector("#channel_name");
    el.value = '';

    $('#channel_create_dialog').modal({});
  }

  async onCreateChannelSubmit(e: any) {
    e.preventDefault();

    let el: HTMLInputElement = document.querySelector("#channel_name");
    const name = el.value;

    const data = {
      name: name,
    };

    console.log("CREATE", data);

    const response = await fetch('/api/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      let rs = await response.json();
      console.log("CREATED", rs);
      $('#channel_create_dialog').modal('hide');
    }
  }

  render() {
    return (
      <div className="modal" id="channel_create_dialog" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create channel</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="create_channel_form" onSubmit={this.onCreateChannelSubmit}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="channel_name">Name</label>
                        <input id="channel_name" className="form-control"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button form="create_channel_form" className="btn btn-success">Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
