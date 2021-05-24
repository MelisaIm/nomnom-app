import React from 'react';
import axios from 'axios';

const topics =["elimination diet", "keto diet", "food allergy", "food intolerance", "ibs", "probiotics"];

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "nom": {title: "Welcome to Nom Nom", summary: "Whether you have some health issues you don't know the cause of or are simply interested in changing up your diet, the aim of Nom Nom is to assist you in tracking your dietary choices and to track symptoms you may encounter. This is especially helpful for people who may have food sensitivities they may not realize they have. Good luck and happy eating!"},
            "elimination diet": {title: "Elimination Diet", summary: "", content:{}, references: [], success: true, images: []},
            "keto diet": {title: "Ketogenic Diet", summary: "", content:{}, references: [], success: true, images: []},
            "food allergy": {title: "Food Allergy", summary: "", content:{}, references: [], success: true, images: []},
            "food intolerance": {title: "Food Intolerance", summary: "", content:{}, references: [], success: true, images: []},
            ibs: {title: "Food Allergy", summary: "", content:{}, references: [], success: true, images: []},
            probiotics: {title: "Probiotics", summary: "", content:{}, references: [], success: true, images: []},
            selected: "nom",
            fetching: true,
        }
    }

    async componentDidMount() {
        let fetched = true; 
        const state = JSON.parse(window.localStorage.getItem('articles'));
        for (const prop in state) {
            if (prop !== "selected" && state[prop].summary === '') fetched = false;  
        }
        if (state !== null && !fetched) {
            topics.forEach(topic => {
                axios.get(`http://47.4.104.14:8000/scrape?search="${topic}"`)
                .then((res) => {
                    const data = res.data;
                    this.setState((prevState) => ({[topic]: {
                        ...prevState[topic],
                        title: data.title,
                        summary: data.summary,
                        content: data["sub-sections"],
                        references: data.references,
                        images: data.images
                    }}))
                }).catch((err) => {
                    this.setState((prevState) => ({[topic]: {...prevState[topic], success: false} }))
                });  
            });
            this.setState({fetching: false});
        } else {
            this.setState(state);
        }
    }
    
    handleClick(topic) {
        this.setState({selected: topic});
    }

    componentWillUnmount() {
        window.localStorage.setItem('articles', JSON.stringify(this.state));
    }

    render() {
        return (
            <div className="view home">
                <div className="top-container">
                    <div className="left-side">
                    <div className="filter-buttons"><button onClick={() => this.handleClick("nom")}>Nom Nom</button>{topics.map((topic, index) => <button onClick={() => this.handleClick(topic)}key={index}>{this.state.fetching ? <><i className="fa fa-spinner fa-spin"></i> Loading</> :topic}</button>)}</div>
                        <div className="text-container">
                        <h4>{this.state[this.state.selected].title}</h4>
                        <div className="image-container">{!this.state.fetching && this.state[this.state.selected].images && this.state[this.state.selected].images.map((image, index) => index < 2 && <img src={image}></img>)}</div>
                        {this.state[this.state.selected].summary}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}