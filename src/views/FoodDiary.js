import React from 'react';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class FoodDiary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: [{name: 'apple'}, {name: 'rice'}, {name: 'cheese'}, {name: 'Add new +'}],
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

    allowDrop = (e) => {
        e.preventDefault();
        console.log(e);
    }

    render() {
        return (
            <div className="view week food">
                <div className="top-container">
                    <div className="week-container">
                        {days.map(day =>
                            <div className="day" key={day}>
                                <span>{day}</span>
                                <div className="dragdrop-box" onDragOver={(event) => this.allowDrop(event)}></div>
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