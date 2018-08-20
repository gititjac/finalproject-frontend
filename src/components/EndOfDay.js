import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AlertDialogSlide from './PopUp';




class EndOfDayForm extends Component {
    constructor() {
        super();
        this.state = {
            daySavings: null,
<<<<<<< HEAD
            dayRollover: null,
            open: false,
=======
            dayRollover:null,
            open: false
>>>>>>> 09036eed1ec879240770dc6e1f41f0d9157b6c73
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSavings = this.handleSavings.bind(this)
        this.handleRollover = this.handleRollover.bind(this)

    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.setState({open: !this.state.open})
        let bod;
        if (this.props.todaysBudget > 0) {
            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: this.state.daySavings,
                rolloverAmount: this.state.dayRollover
            })}
    else {

            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: 0,
                rolloverAmount: this.props.todaysBudget
            })
}
        console.log(bod)
        fetch('/endOfDay', {
            method: 'POST',
            body: bod
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)
            let todaysBudget = parsed.todaysBudget
            let todaysVariable = parsed.todaysVariable
            this.props.sendInfoToApp(todaysBudget, todaysVariable)
            
        })
    }

    handleSavings(evt) {
        this.setState({ daySavings: evt.target.value })
    }
    handleRollover(evt) {
        this.setState({ dayRollover: evt.target.value })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/getSavingsStatus')
    };
 


    render() {
        let text;
        if (this.state.daySavings > this.props.dailySaveGoal){
            text = "You surpassed your daily save goal! Congratulations!"
        } else if (this.state.daySavings < this.props.dailySaveGoal) {
            text = "You didn't reach your goal, but you still managed to save something!"
        } else {
            text = "You hit your daily save goal for the day! Keep it up!"
        }
        return (
            
            <div>
            <AlertDialogSlide open={this.state.open} handleClose={this.handleClose} text={text}/>
                {(this.props.todaysBudget > 0) ?
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <h2>Done for the day?</h2>
                            Add to savings:
                <input placeholder={'$' + this.props.dailySaveGoal}
                                value={this.state.daySavings}
                                onChange={this.handleSavings} />
                            Rollover to tomorrow:
                <input placeholder={'Your Savings Goal is: $' + (this.props.todaysBudget - this.state.daySavings)}
                                value={this.state.dayRollover}
                                onChange={this.handleRollover} />
                            <div>Your savings goal for today: ${this.props.dailySaveGoal}</div>
                            <div>Budget remaining: ${this.props.todaysBudget}</div>
                            <input type="submit" />
                        </form>
                    </div> :


                    <div>
<<<<<<< HEAD
                        <form onSubmit={this.handleSubmit}>you over spent today
                        <input type='submit' value="go back"/>
=======
                        <form onSubmit={this.handleSubmit}>you over spent today, the balance has been deducted from tomorrow's budget
                <input type='submit' value="go back"/>
>>>>>>> 09036eed1ec879240770dc6e1f41f0d9157b6c73
                        </form>
                    </div>


                }


            </div>
        )


    }
}

let EndOfDay = withRouter(EndOfDayForm)
export default EndOfDay;

//jainal 16/8/2018