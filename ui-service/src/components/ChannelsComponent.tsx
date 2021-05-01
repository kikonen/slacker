import React from 'react';
//import classNames from 'classnames';

import Emitter from '../Emitter';
import autobind from "../autobind";

import { ChannelComponent } from "./ChannelComponent";

interface Props {
  userInfo: any,
  channelId: string,
}

export class ChannelsComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    autobind(this);
  }

  onJoinChannel(e: any) {
    Emitter.emit('channel.join.show');
  }

  onCreateChannel(e: any) {
    Emitter.emit('channel.create.show');
  }

  render() {
    return (
      <div className="m-1 border border-dark sl-channels-container">
        <div className="container-fluid sl-channels-content">
          <div className="row no-gutters">
            <div className="col-auto">
              <button className="btn btn-primary btn-sm mt-1 mb-1"
                onClick={this.onJoinChannel}>
                Join
              </button>
             </div>
            <div className="col-auto">
              <button className="btn btn-success btn-sm ml-1 mt-1 mb-1"
                onClick={this.onCreateChannel}>
                Add
              </button>
             </div>
          </div>
          <div className="row no-gutters">
            {this.props.userInfo.channels.map((channel: any) => (
              <div key={channel.id} className="col-12">
                <ChannelComponent channel={channel}
                  userInfo={this.props.userInfo}
                  channelId={this.props.channelId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
