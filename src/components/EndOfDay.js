import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class EndOfDayForm extends Component {
    constructor() {
        super();
        this.state ={
            daySavings: null,
            dayRollover:null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSavings = this.handleSavings.bind(this)
        this.handleRollover = this.handleRollover.bind(this)
        
    }

    handleSubmit(evt){
        evt.preventDefault();
        let bod = JSON.stringify({
            userID: this.props.userID,
            savedAmount: this.state.daySavings,
            rolloverAmount: this.state.dayRollover
        });
        console.log(bod)
        fetch('/endOfDay', {
            method:'POST',
            body: bod
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)
            this.props.history.push('/getSavingsStatus')
        })
    }

    handleSavings(evt) {
        this.setState({daySavings: evt.target.value})
    }
    handleRollover(evt) {
        this.setState({dayRollover: evt.target.value})
    }
 

    render(){
        return (
        <div>
            <form onSubmit = {this.handleSubmit}>
                <h2>Done for the day?</h2>
                <input placeholder="Savings"
                       value = {this.state.daySavings}
                       onChange = {this.handleSavings}/>
                <input placeholder="Rollover"
                       value ={this.state.dayRollover}
                       onChange={this.handleRollover}/>
                <div>Savings Goal: /* {this.state.dailySaveGoal} */</div>
                <div>Budget remaining: /*{this.state.todaysBudget}*/</div>
                <input type="submit"/>
            </form>                   
        </div>
        )
    }
}

let EndOfDay = withRouter(EndOfDayForm)
export default EndOfDay;