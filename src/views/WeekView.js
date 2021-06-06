import React from 'react';
import {getDay, format, startOfWeek, eachDayOfInterval, addDays} from 'date-fns';
import classnames from 'classnames';
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class WeekView extends React.Component {
    onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    };

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        const id = e.dataTransfer.getData('text/plain');
        const dropzone = e.target.id;
        const newWeek = {...this.state.week};
        const validDropzone = days.find((day) => day.toLowerCase() === dropzone);
        if (!validDropzone) return;
        const found = newWeek[dropzone].find((value) => value === id);
        if (found) return;
        newWeek[dropzone].push(id);
        e.dataTransfer.clearData();
        this.setState({week: newWeek});
    }

    handleAddNew = (e) => {
        e.preventDefault();
        let choices = this.state.choices;
        const newChoice = this.state.value;
        const found = choices.find((value) => value === newChoice);

        if (found) return;
        choices.push(newChoice);

        this.setState({choices, value: ''});
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    removeChoice(choice) {
        const choices = this.state.choices.filter((val) => val !== choice);
        this.setState({choices});
    }

    renderChoices() {
        return (<><span>Choices:</span>
            <div className="footer">
                    {this.state.choices.map((food, index) => {
                        return <div draggable 
                                    key={index} 
                                    id={food} 
                                    className="choice" 
                                    onDragStart={(e) => this.onDragStart(e)}
                                >
                                    {food}<button className="close" onClick={() => this.removeChoice(food)}>x</button>
                                </div>
                    })}
                    <form className="addNewForm" onSubmit={(e) => this.handleAddNew(e)}>
                        <label>Food: </label>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                        <input type="submit" value="Add new +"></input>
                    </form>
            </div></>)
    }

    render() {
        const today = getDay(new Date());
        const day = new Date();
        const fullWeek = addDays(day, 5);
        const weekStart = startOfWeek(new Date(), {weekStartsOn: 0});
        const thisWeek = eachDayOfInterval({start: weekStart, end: fullWeek})
        return (
            <div className="view week symptoms">
                <div className="top-container">
                    <div className="week-container">
                        {days.map((day, index) =>
                            <div className="day" key={day}>
                                <span className={classnames(index === today && 'highlightDay')}>{day}</span>
                                <div>{format(thisWeek[index], 'MM/dd')}</div>
                                <div id={day.toLocaleLowerCase()} className="dragdrop-box" onDragOver={(e) => this.onDragOver(e)} onDrop={(e)=> this.onDrop(e)}>
                                {this.state.week[day.toLocaleLowerCase()].map((symptom, index) => {
                                    return <button 
                                            key={index} 
                                            id={symptom} 
                                            className="choice" 
                                            onClick={(e) => this.deleteSymptom(e, day.toLocaleLowerCase())}
                                            >
                                                {symptom} x
                                            </button>
                                })}
                                </div>
                            </div> 
                        )}
                    </div>
                </div>
                {this.renderChoices()}
            </div>
        )
    }
}