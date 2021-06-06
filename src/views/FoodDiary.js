import WeekView from './WeekView';

export default class FoodDiary extends WeekView {
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

    deleteFood = (e, day) => {
        const id = e.target.id;
        const week = this.state.week;
        let newday = this.state.week[day].filter((val) => val !== id); 
        week[day] = newday;
        this.setState({week});
    }

    componentDidMount() {
        const data = JSON.parse(window.localStorage.getItem('foodDiary'));
        data && this.setState({...data})
    }

    componentWillUnmount() {
        window.localStorage.setItem('foodDiary', JSON.stringify(this.state));
    }

}