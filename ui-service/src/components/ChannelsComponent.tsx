import React from 'react';
import classNames from 'classnames';

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

  render() {
    return (
      <div className="m-1 border border-dark sl-channels-container">
        <div className="container-fluid sl-channels-content">
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
