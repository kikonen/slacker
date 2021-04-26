import React from 'react';
import classNames from 'classnames';

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

  onLeaveChannel(e: any, channelId: string) {
    e.preventDefault();
    console.log("leave channel...");
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
