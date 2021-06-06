import WeekView from './WeekView';

export default class SymptomsLog extends WeekView {
    constructor(props) {
        super(props);

        this.state = {
            choices: ['cramps', 'constipation', 'headache'],
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

    deleteSymptom = (e, day) => {
        const id = e.target.id;
        const week = this.state.week;
        let newday = this.state.week[day].filter((val) => val !== id); 
        week[day] = newday;
        this.setState({week});
    }

    componentDidMount() {
        const data = JSON.parse(window.localStorage.getItem('symptomsDiary'));
        data && this.setState({...data})
    }

    componentWillUnmount() {
        window.localStorage.setItem('symptomsDiary', JSON.stringify(this.state));
    }

}