import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './header.scss';

@cssModules(styles)
class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div className="header__container" id="headerContainer">
            <div>
              <div className="site-header">
                <div className="header-left-container">
                  <span className="header-text">
                    <span name="userIdHeader" className="header-user"><a href="https://github.com/capgemini/kuwit">https://github.com/capgemini/kuwit</a></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Header.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};


export default connect()(Header);
