import React, {
    Component,
    PropTypes
} from 'react';

export default class CommissionerTools extends Component {

    static propTypes = {
        isCommissioner: PropTypes.bool,
        isPaused: PropTypes.bool,
        updateDraftStatus: PropTypes.func
    };

    render() {

        const {
            isCommissioner,
            isPaused,
            updateDraftStatus
        } = this.props;

        if (!isCommissioner) {
            return null;
        }

        if (isPaused) {

            const onClickFunc = updateDraftStatus.bind(null, "open");
            return (
              <div className="row">
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <button className="btn btn-default" onClick={onClickFunc}>Unpause</button>
                  </div>
                  <div className="col-md-4" />
              </div>
            );
        }

        const onClickFunc = updateDraftStatus.bind(null, "paused");

        return (
            <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4">
                    <button className="btn btn-default" onClick={onClickFunc}>Pause</button>
                </div>
                <div className="col-md-4" />
            </div>
        );
    };
};
