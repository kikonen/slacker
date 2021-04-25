import React from 'react';

interface Props {
  userInfo: any,
}

export class NavbarComponent extends React.Component<Props> {
  render() {
    const { userInfo } = this.props;
    const loginBtn = userInfo.valid ?
      <a href="../auth/logout" className="btn btn-primary">Logout</a> :
      <a href="../auth/login" className="btn btn-primary">Login</a>;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="mr-auto">
          <b>Slacker</b>: Stop slacking become total slacker
        </span>
        <span className="ml-auto">
          <span className="mr-1"><b>User: </b> {userInfo?.name || 'na'}</span>
          <span className="mr-1"><b>Email: </b>{userInfo?.email || 'na'}</span>

          {loginBtn}
        </span>
      </nav>
    );
  }
}
