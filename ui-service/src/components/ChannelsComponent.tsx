import React from 'react';
import classNames from 'classnames';

interface Props {
  userInfo: any,
  channelId: string,
  onSelect: (channelId: string) => void,
}

export class ChannelsComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e, channelId: string) {
    e.preventDefault();
    this.props.onSelect(channelId);
  }

  render() {
    return (
      <div className="m-2 border border-dark">
        <div className="container-fluid">
          <div className="row">
            {this.props.userInfo.channels.map((channel) => (
              <div key={channel.id} className="col-12">
                <button className={ classNames('btn btn-sm mt-1', {
                    'btn-primary': this.props.channelId === channel.id,
                    'btn-outline-primary': this.props.channelId !== channel.id,
                  })}
                  onClick={(e) => this.onSelect(e, channel.id)}>
                  <b>{channel.name}</b>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
