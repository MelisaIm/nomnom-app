import React from 'react';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class FoodDiary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: ['apple', 'rice', 'cheese'],
            week: {
                sunday: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
            },
            value: ''
        }
    }

    onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        const id = e.dataTransfer.getData('text/plain');
        const draggableEl = document.getElementById(id);
        const dropzone = e.target;
        const clone = draggableEl.cloneNode(true);
        dropzone.appendChild(clone);
        e.dataTransfer.clearData();
    }

    handleAddNew = (e) => {
        e.preventDefault();
        let choices = this.state.choices;
        const newChoice = this.state.value;
        const found = choices.find((val) => val === newChoice);

        if (found) return;
        choices.push(newChoice);

        this.setState({choices, value: ''});
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div className="view week food">
                <div className="top-container">
                    <div className="week-container">
                        <button>&#10094;</button>
                        {days.map(day =>
                            <div className="day" key={day}>
                                <span>{day}</span>
                                <div className="dragdrop-box" onDragOver={(e) => this.onDragOver(e)} onDrop={(e)=> this.onDrop(e)}></div>
                            </div> 
                        )}
                        <button>&#10095;</button>
                    </div>
                </div>
                <span>Choices:</span>
                <div className="footer">
                        {this.state.choices.map((food, index) => {
                            return <div draggable key={index} id={food} className="choice" onDragStart={(e) => this.onDragStart(e)}>{food}</div>
                        })}
                        <form className="addNewForm" onSubmit={(e) => this.handleAddNew(e)}>
                            <label>Food: </label>
                            <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            <input type="submit" value="Add new +"></input>
                        </form>
                </div>
            </div>
        )
    }
}