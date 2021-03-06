import React, { Component } from 'react';
import DailyBudget from './DailyBudget.js';
import '../App.css'
var moment = require('moment');


class WeekContainer extends Component {
    constructor() {
        super();
        this.state = {
            currentDate: ''
        }

    }


    render() {

        return (
            <div className="daily-container">
                <div className="weekof-container">
                    Week of: {moment().startOf('week').format('ddd D MMM')} to {moment().startOf('week').add(6, 'days').format('ddd D MMM')}
                </div>
                
                <div className="weekcontainer">
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(1, 'days').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(2, 'days').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(3, 'days').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(4, 'days').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(5, 'days').format('ddd D MMM')} />
                    <DailyBudget sendDate={this.props.sendDate} userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(6, 'days').format('ddd D MMM')} />
                </div>
            </div>
        )
    }
}

export default WeekContainer;


