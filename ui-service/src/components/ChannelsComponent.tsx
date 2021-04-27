import React from 'react';
import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";

interface Props {
  userInfo: any,
  channelId: string,
  onSelect: (channelId: string) => void,
}

export class ChannelsComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  onSelectChannel(e: any, channelId: string) {
    e.preventDefault();
    this.props.onSelect(channelId);
  }

  async onLeaveChannel(e: any, channelId: string) {
    e.preventDefault();

    const url = `/api/channels/${channelId}/actions/leave`;
    const response = await fetch(url, { method: 'post' });
    let rs = await response.json();
    console.log("LEAVED", rs);

    Emitter.emit('user.refresh.channels');
  }

  render() {
    return (
      <div className="m-2 border border-dark sl-channels-container">
        <div className="container-fluid sl-channels-content">
          <div className="row">
            {this.props.userInfo.channels.map((channel: any) => (
              <div key={channel.id} className="col-12">
                <div className="btn-group" role="group" aria-label="Channel">
                  <button className={ classNames('btn btn-sm mt-1 mb-1', {
                      'btn-primary': this.props.channelId === channel.id,
                      'btn-outline-primary': this.props.channelId !== channel.id,
                    })}
                    onClick={(e) => this.onSelectChannel(e, channel.id)}>
                    <b>{channel.name}</b>
                  </button>
                  <button className="btn btn-danger btn-sm mt-1 mb-1"
                    onClick={(e) => this.onLeaveChannel(e, channel.id)}>
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
