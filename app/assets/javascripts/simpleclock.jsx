class SimpleClock extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			date: moment().format('HH:mm:ss')
		};
	}
	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(), 1000
		);
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	tick(){
		this.setState({
			date: moment().format('HH:mm:ss')
		});
	}
    render(){
	  	return (
		    <div>
		      <h2>It is {this.state.date}.</h2>
		    </div>
		);
    }
}


var check = document.getElementById('simpleclock');

if (check){
	ReactDOM.render(
	    <SimpleClock />,
	    document.getElementById('simpleclock')
	);
};
