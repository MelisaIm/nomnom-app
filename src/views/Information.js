import React from 'react';
import axios from 'axios';

const topics =["elimination diet", "keto diet", "food allergy", "food intolerance", "ibs"];

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "nom": {title: "Nom Nom", summary: "Welcome to the Nom Nom app. The aim of Nom Nom is to assist you in tracking your dietary choices and to track symptoms you may encounter. This is especially helpful for people who may have food sensitivities they may not realize they have. Good luck and happy eating!"},
            "elimination diet": {title: "Elimination Diet", summary: "", content:{}, references: [], success: true, images: []},
            "keto diet": {title: "Ketogenic Diet", summary: "", content:{}, references: [], success: true, images: []},
            "food allergy": {title: "Food Allergy", summary: "", content:{}, references: [], success: true, images: []},
            "food intolerance": {title: "Food Intolerance", summary: "", content:{}, references: [], success: true, images: []},
            ibs: {title: "Food Allergy", summary: "", content:{}, references: [], success: true, images: []},
            selected: "nom"
        }
    }

    componentDidMount() {
        topics.forEach(topic => {
            axios.get(`http://47.4.104.14:8000/scrape?search="${topic}"`)
            .then((res) => {
                const data = res.data;
                this.setState({[topic]: {
                    summary: data.summary,
                    content: data["sub-sections"],
                    references: data.references,
                    images: data.images
                }})
            }).catch((err) => {
                this.setState((prevState) => ({[topic]: {...prevState[topic], success: false} }))
            });    
        });
    }
    
    render() {
        return (
            <div className="view home">
                <div className="top-container">
                    <div className="left-side">
                    <div className="filter-buttons">{topics.map((topic, index) => <button key={index}>{topic}</button>)}</div>
                        <div className="text-container">{this.state[this.state.selected].summary}</div>
                    </div>
                </div>
            </div>
        )
    }
}