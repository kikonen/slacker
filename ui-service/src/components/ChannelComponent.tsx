import React from 'react';
import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";

interface Props {
  userInfo: any,
  channel: any,
  channelId: string,
}

export class ChannelComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  onSelectChannel(e: any, channelId: string) {
    e.preventDefault();
    Emitter.emit('channel.select', { channelId: channelId } );
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
    const channel = this.props.channel;

    return (
      <div className="btn-group sl-w-100" role="group" aria-label="Channel">
        <button className={ classNames('btn btn-sm mt-1 mb-1 sl-w-100', {
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
    );
  }
}
