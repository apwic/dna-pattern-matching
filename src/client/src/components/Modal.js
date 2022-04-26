import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

class Modal extends Component {
  constructor() {
    super();
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    const { isModal } = this.props;

    if (isModal) {
      disableBodyScroll(this.modalRef.current);
    }
  }

  componentWillUnmount() {
    enableBodyScroll(this.modalRef.current);
  }

  render() {

    if (this.props.isModal) {
      return (
        <div
          ref={this.modalRef}
          className="modal-wrapper"
          onClick={() => this.props.history.goBack()}
        >
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h1>Modal Title</h1>
            <p>
              Tes aja
            </p>
          </div>
        </div>
      );
    } 
  }
}

export default withRouter(Modal);
