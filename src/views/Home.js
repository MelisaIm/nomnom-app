import React from 'react';
import axios from 'axios';

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
        this.generateData(foodList);
    }

    async generateData(foodList) {
        foodList.forEach(async(food) => {
            if (window.localStorage.getItem(`${food}`) === null ) {
                const result = await axios.get(`https://pure-journey-77953.herokuapp.com/food/${food}`);
                window.localStorage.setItem(`${food}`, JSON.stringify(result));
            }
        });
    }

    render() {
        const food = this.state.foods;
        const symptoms = this.state.symptoms;
        return (
            <div className="view home">
                <div className="top-container">
                    <div className="left-side">Overview of food this week:
                        <div className="text-container">{food.map((food, index) => <div key={index}>{food}</div>)}</div>
                    <div>Overview of symptoms this week:
                        <div className="text-container">{symptoms.map((symptom, index) => <div key={index}>{symptom}</div>)}</div>
                    </div>
                    </div>

                </div>
                <div className="footer">More info</div>
            </div>
        )
    }
}