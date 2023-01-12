class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            break:5,
            session: 25,
            length:1500,
            running: false
        }
        this.handleReset=this.handleReset.bind(this)
        this.handleBreakDecrement=this.handleBreakDecrement.bind(this)
        this.handleBreakIncrement=this.handleBreakIncrement.bind(this)
        this.handleSessionDecrement=this.handleSessionDecrement.bind(this)
        this.handleSessionIncrement=this.handleSessionIncrement.bind(this)
        this.handleTimer=this.handleTimer.bind(this)
        this.countDown=this.countDown.bind(this)
    }
    handleReset(){
        this.setState({
            break:5,
            session: 25,
            length:1500
        })
    }
    handleSessionDecrement(){
        if(this.state.session - 1 > 0){
            this.setState({
                session:this.state.session-1,
                length:(this.state.session-1)*60
            })
        }
    }
    handleSessionIncrement(){
        if(this.state.session + 1 <= 60){
            this.setState({
                session:this.state.session+1,
                length:(this.state.session+1)*60
            })
        }
    }
    handleBreakDecrement(){
        if (this.state.break - 1 > 0){
            this.setState({
                break:this.state.break-1
            })
        }
    }
    handleBreakIncrement(){
        if(this.state.break + 1 <= 60){
            this.setState({
                break:this.state.break+1
            })
        }
    }
    // Now need to fix it so I can start and stop timer instead of just starting it
    countDown(){
        if(this.state.running === true){
            let seconds = this.state.length - 1;
            this.setState({
                length: seconds
            })
            if(this.state.length == 0){
                clearInterval(this.handleTimer)
            }
        }else{
            clearInterval(this.handleTimer)
        }
    }
    handleTimer(){
        this.setState({
            running: !this.state.running
        })
        return this.handleTimer = setInterval(this.countDown,1000)
    }
    
    render(){
        return(
            <>
                <div id="break-label">Break Length</div>
                <div id="break-length">{this.state.break}</div>
                <div id="session-label">Session Length</div>
                <div id="session-length">{this.state.session}</div>
                <div id="timer-label">Session</div>
                <div id="time-left">{Math.floor(this.state.length/60)}:{String(Math.floor(this.state.length%60)).padStart(2,'0')}</div>
                <button id="break-decrement" onClick={this.handleBreakDecrement}>⬇️</button>
                <button id="break-increment" onClick={this.handleBreakIncrement}>⬆️</button>
                <button id="session-decrement" onClick={this.handleSessionDecrement}>⬇️</button>
                <button id="session-increment" onClick={this.handleSessionIncrement}>⬆️</button>
                <button id="start_stop" onClick={()=>this.handleTimer()}>⏯️</button>
                <button id="reset" onClick={this.handleReset}>🔄</button>
            </>
        )
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);