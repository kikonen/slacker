import React from 'react';
import classNames from 'classnames';

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

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
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

  onSelect(e, channelId: string) {
    e.preventDefault();
    console.log("JOINED: " + channelId);
  }

  render() {
    return (
      <div className="modal" id="channel_selector" tabIndex="-1" role="dialog">
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
