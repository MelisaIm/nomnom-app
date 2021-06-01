import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            symptoms: []
        }
    }
    
    componentDidMount() {
        const foods = JSON.parse(window.localStorage.getItem('foodDiary')) || {};
        const foodList = [];
        if (foods.week) {
            for (const day in foods.week) {
                foodList.push(...foods.week[day]);
            }
        }
        const symptoms = JSON.parse(window.localStorage.getItem('symptomsDiary')) || {};
        const symptomsList = [];
        if (symptoms.week) {
            for (const day in symptoms.week) {
                symptomsList.push(...symptoms.week[day]);
            }
        }
        this.setState({foods: foodList, symptoms: symptomsList});
    }

    render() {
        const food = this.state.foods;
        const symptoms = this.state.symptoms;
        return (
            <div className="view home">
                <div className="top-container">
                    <div className="left-side">Overview of food this week:
                        <div className="text-container">{food.map((food) => <div>{food}</div>)}</div>
                    <div>Overview of symptoms this week:
                        <div className="text-container">{symptoms.map((symptom) => <div>{symptom}</div>)}</div>
                    </div>
                    </div>
                    
                </div>
                <div className="footer">More info</div>
            </div>
        )
    }
}