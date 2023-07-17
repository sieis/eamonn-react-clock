class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            break:5,
            session: 25,
            length:1500,
            running: false,
            timerLabel: 'Session'
        }
        this.handleReset=this.handleReset.bind(this)
        this.handleBreakDecrement=this.handleBreakDecrement.bind(this)
        this.handleBreakIncrement=this.handleBreakIncrement.bind(this)
        this.handleSessionDecrement=this.handleSessionDecrement.bind(this)
        this.handleSessionIncrement=this.handleSessionIncrement.bind(this)
        this.handleTimer=this.handleTimer.bind(this)
        this.countDown=this.countDown.bind(this)
    }

    // from chatGPT...fixed to clearInterval as well
    handleReset(){
        clearInterval(this.timerInterval);
        this.setState({
            running: false,
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
    //   this from Chat GPT to handle the switch between break and session
    countDown() {
        if (this.state.running === true) {
          let seconds = this.state.length - 1;
          if (seconds < 0) {
            seconds = 0;
            if (this.state.break === 0) {
              // If break length is zero, reset the session to its initial length
              this.setState((prevState) => ({
                length: prevState.session * 60
              }));
            } else {
              // Switch to break and set the break length
              this.setState((prevState) => ({
                length: prevState.break * 60
              }));
            }
          } else {
            this.setState({
              length: seconds
            });
          }
      
          if (seconds === 0) {
            clearInterval(this.timerInterval);
            const alarmSound = new Audio('/alarm.wav'); // Replace with the path to your alarm sound file
            alarmSound.id='beep';
            alarmSound.play();
            if(this.state.timerLabel === 'Session'){
                this.setState({
                    timerLabel: 'Break'
                });
            } else{
                this.setState({
                    timerLabel: 'Session'
                });
            }
            this.timerInterval = setInterval(this.countDown, 1000); // Start the interval for the next session or break
          }
        } else {
          clearInterval(this.timerInterval);
        }
      }
      
    handleTimer() {
        if (this.state.running) {
          clearInterval(this.timerInterval); // Clear the interval when the timer is already running
        } else {
          this.timerInterval = setInterval(this.countDown, 1000); // Start the interval for countdown
        }
        this.setState((prevState) => ({
          running: !prevState.running
        }));
      }
      
    
    render(){
        return(
            <>
                <div id="break-label">Break Length</div>
                <div id="break-length">{this.state.break}</div>
                <div id="session-label">Session Length</div>
                <div id="session-length">{this.state.session}</div>
                <div id="timer-label">{this.state.timerLabel}</div>
                <div id="time-left">{Math.floor(this.state.length/60)}:{String(Math.floor(this.state.length%60)).padStart(2,'0')}</div>
                <button id="break-decrement" onClick={this.handleBreakDecrement}>⬇️</button>
                <button id="break-increment" onClick={this.handleBreakIncrement}>⬆️</button>
                <button id="session-decrement" onClick={this.handleSessionDecrement}>⬇️</button>
                <button id="session-increment" onClick={this.handleSessionIncrement}>⬆️</button>
                <button id="start_stop" onClick={()=>this.handleTimer()}>⏯️</button>
                <button id="reset" onClick={this.handleReset}>🔄</button>
                <audio id="beep" src="/alarm.wav"></audio>
                
            </>
        )
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);