import React, { Component } from 'react';
import '../App.css'
import { RadialChart } from 'react-vis';
import {  withRouter } from "react-router-dom";

var moment = require('moment');

class DailyBudgetBasic extends Component {
    constructor() {
        super()
        this.state = {
            budget: 0,
            spent: 0
        }
        this.handleClickOtherDayBreakdown = this.handleClickOtherDayBreakdown.bind(this)

    }
    componentDidMount() {
        fetch('/getRecord', {
            method: "POST",
            body: JSON.stringify({
                userID: this.props.userID,
                date: this.props.day
            })
        }).then(response => response.text())
            .then(response => {
                let startOfDayBudget;
                let spent;
                console.log(response)
                let parsedResponse = JSON.parse(response)
                if (parsedResponse.startOfDayBudget) {
                    startOfDayBudget = parsedResponse.startOfDayBudget
                }
                else {
                    startOfDayBudget = 0;
                }

                if (parsedResponse.leftoverFromDay) {
                    spent = startOfDayBudget - parsedResponse.leftoverFromDay
                } else {
                    spent = 0
                }

                this.setState({ budget: startOfDayBudget, spent: spent })
            })
    }
    handleClickOtherDayBreakdown(){
        this.props.sendDate(this.props.day + " 2018")
        this.props.history.push('/analytics')
    }

    render() {
        let date = this.props.day
        let momentDate = moment(date, "DD MM YYYY")
        
        let numbersOnly = parseInt(date.replace(/[^0-9]/g, ""))
        let today = new Date()
        let isAfter = momentDate.isAfter(today)
        console.log(momentDate + " " + isAfter)
        let todaysDate = today.getDate()
        return (
            <div className="day-budget">
                <div>
                    {(this.props.day)}
                    <br/>
                </div>


                {
                    (todaysDate === numbersOnly) ?

                        <div className="day-budget-item">
                           
                           
                                Budget: ${this.props.todaysBudget + this.props.todaysVariable + " "}
                                Spent: ${this.props.todaysVariable}

                                <div className="today-chart"><RadialChart 
                                                data={[{angle:this.props.todaysVariable, className:"exp-spent"}, {angle:this.props.todaysBudget, className:"exp-budget"}]}
                                                height={55}
                                                width={55}
                                                radius={20}
                                                innerRadius={10}
                                                   />
                                </div>
                            
                        </div> :
                        <div className="day-budget-item">
                            
                                Budget: ${this.state.budget + " "}
                                Spent: ${this.state.spent}

                               {
                                   (isAfter) ?
                                   null:
                        <div className="chart-button">
                                    <div className="exp-inactive"><RadialChart 
                                                data={[{angle:this.state.spent, className:"past-spent"}, {angle:this.state.budget - this.state.spent, className:"past-budget"}]}
                                                height={55}
                                                width={55}
                                                radius={20}
                                                innerRadius={10}
                                                   />
                                    </div>
                                    <button onClick={this.handleClickOtherDayBreakdown} className="analytics">
                                        <i className="far fa-arrow-alt-circle-right"></i>
                                    </button>
                        </div>

                               }
                           

            </div>
                }
            </div>
            
        )
    }
}

let DailyBudget = withRouter(DailyBudgetBasic)
export default DailyBudget;