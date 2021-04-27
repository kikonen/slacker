import React from 'react';
//import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";

declare var $ :any;

interface Props {
  userInfo: any,
}

type State = {
  channels: Array<any>,
};

export class ChannelSelectorComponent extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      channels: [],
    };

    autobind(this);
  }

  componentDidMount() {
    Emitter.on('channel.join.show', this.eventShow);
  }

  eventShow(e: any) {
    console.log("show join dialog...");

    $('#channel_selector').modal({});
    this.fetchChannels();
  }

  async fetchChannels() {
    const response = await fetch('/api/channels');
    let rs = await response.json();
    console.log("CHANNELS", rs);

    this.setState((state, props) => ({
      channels: rs.data || []
    }));
  }

  async onSelect(e: any, channelId: string) {
    e.preventDefault();

    const url = `/api/channels/${channelId}/actions/join`;
    const response = await fetch(url, { method: 'post' });
    let rs = await response.json();
    console.log("JOINED", rs);
  }

  render() {
    return (
      <div className="modal" id="channel_selector" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Join channel</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="m-2 border border-dark">
                <div className="container-fluid">
                  <div className="row">
                    {this.state.channels.map((channel) => (
                      <div key={channel.id} className="col-12">
                        <button className='btn-outline-primary'
                          onClick={(e) => this.onSelect(e, channel.id)}>
                          <b>{channel.name}</b>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
