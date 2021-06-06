import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            selected: ''
        }
    }
    
    componentDidMount() {
        const foods = JSON.parse(window.localStorage.getItem('foodDiary')) || {};
        const foodList = [];
        if (foods.week) {
            for (const day in foods.week) {
                foods.week[day].forEach((food) => {
                    if (foodList.indexOf(food) === -1) {
                        foodList.push(food);
                    }
                });
            }
        }
        this.setState({foods: foodList});
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

    capitalizeFirstLetter(word) {
        return word.replace(/^./, word[0].toUpperCase());
    }

    displayFoodData() {
        const food = this.state.selected;
        if (food) {
            const storedData = window.localStorage.getItem(`${food}`); 
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData).data || {};
                const image = parsedData.image;
                const name = parsedData.name;
                const {percentProtein, percentFat, percentCarbs} = parsedData.nutrition.caloricBreakdown || {}
                const { amount, unit} = parsedData.nutrition.weightPerServing || {};
                return <div className={"foodNutrition"}>
                        <div>{this.capitalizeFirstLetter(name)}</div>
                        <img alt="" src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}></img>
                        <div>Percent of carbs: {percentCarbs}</div>
                        <div>Percent of protein: {percentProtein}</div>
                        <div>Percent of fat: {percentFat}</div>
                        <div>Serving size: {amount}{unit}</div>
                    </div>
            } else {
                this.generateData([this.state.selected]);
            }
        }
    }

    render() {
        const food = this.state.foods;
        return (
            <div className="view home">
                <div className="top-container">
                    <span>Data of food consumed this week</span>
                        <div className="text-container">{food.map((food, index) => <button key={index} onClick={() => this.setState({selected: food})}>{food}</button>)}</div>
                    <div className ="footer">{this.state.selected ? null : <span>Click for nutritional info</span>}
                        {this.displayFoodData()}
                    </div>
                </div>
            </div>
        )
    }
}