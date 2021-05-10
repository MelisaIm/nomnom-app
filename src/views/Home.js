import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div className="view home">
                <div className="top-container">
                    <div className="left-side">Data analysis
                        <div className="text-container"/>
                    </div>
                    <div className="right-side">Metrics chart
                        <div className="chart-container"/>
                    </div>
                </div>
                <div className="footer">More info</div>
            </div>
        )
    }
}