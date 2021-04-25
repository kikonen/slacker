import React from 'react';

import Emitter from '../Emitter';

interface Props {
  userInfo: any,
}

export class NavbarComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.onJoinChannel = this.onJoinChannel.bind(this);
    this.onCreateChannel = this.onCreateChannel.bind(this);
 }

  onJoinChannel(e) {
    console.log("join...");
    Emitter.emit('channel.join.show');
  }

  onCreateChannel(e) {
    console.log("create...");
    Emitter.emit('channel.create.show');
  }

  render() {
    const { userInfo } = this.props;
    const loginBtn = userInfo.valid ?
      <a href="../auth/logout" className="btn btn-primary">Logout</a> :
      <a href="../auth/login" className="btn btn-primary">Login</a>;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="./"><b>Slacker</b>: Stop slacking become total slacker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Channels
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={this.onJoinChannel}>Join</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={this.onCreateChannel}>Create</a>
              </div>
            </li>
          </ul>
        </div>

        <span className="ml-auto">
          <span className="mr-1"><b>User: </b> {userInfo?.name || 'na'}</span>
          <span className="mr-1"><b>Email: </b>{userInfo?.email || 'na'}</span>

          {loginBtn}
        </span>
      </nav>
    );
  }
}
