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
    Emitter.on('channel.create.show', this.eventCreateChannel);
  }

  eventCreateChannel(e: any) {
    console.log("show create dialog...");

    $('#channel_create').modal({});
  }

  onCreate(e: any, channelId: string) {
    e.preventDefault();
    console.log("CREATED: " + channelId);
  }

  render() {
    return (
      <div className="modal" id="channel_create" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create channel</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
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
              <button type="button" className="btn btn-success" data-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}