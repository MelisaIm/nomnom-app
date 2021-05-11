import React from 'react';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class SymptomsLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: [{name: 'cramps'}, {name: 'constipation'}, {name: 'headache'}, {name: 'Add new +'}],
            week: {
                sunday: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
            }
        }
    }

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
                <span>Choices:</span>
                <div className="footer">
                        {this.state.choices.map((food, index) => {
                            return <div key={index} className="choice">{food.name}</div>
                        })}
                </div>
            </div>
        )
    }
}