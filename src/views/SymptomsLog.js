import React from 'react';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SymptomsLog extends React.Component {
    render() {
        return (
            <div className="view week symptoms">
                <div className="top-container">
                    <div className="week-container">
                        {days.map(day =>
                            <div className="day" key={day}>
                                <span>{day}</span>
                                <div className="dragdrop-box"></div>
                            </div> 
                        )}
                    </div>
                </div>
            </div>
        )
    }
}