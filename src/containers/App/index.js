import React, { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <div className="background">
        <div className="">
          <div className="">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object.isRequired,
};
