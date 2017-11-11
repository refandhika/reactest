class FormTest extends React.Component {
  render(){
    return(
      <form className="dateTimePickerForm">
        <DateTimePicker name="Start"/>
        <DateTimePicker name="End"/>
        <p>
          <input 
            type="submit" 
            value="Submit" />
        </p>
      </form>
    );
  }
}

class DateTimePicker extends React.Component {
  render(){
    return(
      <div className="dateTimeContainer">
        <p>
          <label>{this.props.name}</label>
        </p>
        <DatePicker />
        <TimePicker />
      </div>
    );
  }
}

class DatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      format: 'DD/MM/YYYY',
      date: '',
      isDatePickerOpen: false
    }
  }
  openDatePicker(){
    this.setState({
      isDatePickerOpen: true
    });
  }
  closeDatePicker(){
    this.setState({
      isDatePickerOpen: false
    });
  }
  insertDate(date){
    this.setState({
      date: date 
    });
  }
  render(){
    let format = null;
    if(this.props.format){
      format = this.props.format;
    }
    else{
      format = this.state.format;
    };

    return(
      <div className="datePicker">
        <p>
          <label htmlFor="datepicker">
          Date Picker
          </label>
        </p>
        <p>
          <input 
            type="text"
            name="datepicker"
            placeholder={format} 
            onFocus={() => this.openDatePicker()}
            value={this.state.date} />
        </p>
        <Calendar 
          isOpen={this.state.isDatePickerOpen}
          onClose={() => this.closeDatePicker()}
          getDate={this.insertDate.bind(this)} />
      </div>
    );
  }
}

class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      monthNowHead: moment().format('MMMM'),
      yearNow: moment().year(),
      monthNowData: moment().format('MM'),
      monthChange: moment().month(),
      monthMoveValue: 0,
      yearMoveValue: 0,
      monthStart: moment().subtract(moment().date(),'d').format('d'),
      dayNowOnly: moment().format('Do').replace(/[a-zA-Z]+/g, ""),
      dayNowSpan: moment().format('Do').replace(/[0-9]+/g, ""),
      mainView: 'days'
    }
  }
  changeMainView(type,date){
    let month = null;
    let year = null;
    let valueM = this.state.monthMoveValue;
    let valueY = this.state.yearMoveValue;

    if(type == 'days' && date != null){
      let a = date.split('/');
      month = a[0];
      year = a[1];
      let date1 = a[1]+'-'+a[0];
      let date2 = moment().format('YYYY')+'-'+moment().format('MM')
      let ms = moment(date1,'YYYY-MM').diff(moment(date2,'YYYY-MM'));
      let d = moment.duration(ms);
      valueM = Math.round(d.asMonths());
      valueY = -(parseInt(moment().format('YYYY'))-parseInt(a[1]));
    }
    else if(type == 'months' && date != null){
      valueY = -(parseInt(moment().format('YYYY'))-date);
    };

    this.setState({
      monthNowHead: moment().add(valueM, 'M').format('MMMM'),
      monthNowData: moment().add(valueM, 'M').format('MM'),
      monthChange: moment().add(valueM, 'M').month(),
      monthStart: moment().subtract(moment().date(),'d').add(valueM,'M').format('d'),
      yearNow: moment().add(valueY, 'y').year(),
      monthMoveValue: valueM,
      yearMoveValue: valueY,
      mainView: type
    });
  }
  changeDayHover(day){
    let dayNowOnly = day;
    let dayNowSpan = '';
    if(day == 1 || day == 21 || day == 31){
      dayNowSpan = 'st';
    }
    else if(day == 2 || day == 22){
      dayNowSpan = 'nd';
    }
    else if(day == 3 || day == 23){
      dayNowSpan = 'rd';
    }
    else{
      dayNowSpan = 'th';
    };

    this.setState({
      dayNowOnly: dayNowOnly,
      dayNowSpan: dayNowSpan
    })
  }
  changeMonthHover(month){
    let monthNow = month - 1;

    this.setState({
      monthNowHead: moment().month(monthNow).format('MMMM')
    });
  }
  changeYearHover(year){
    let yearNow = year - 1;

    this.setState({
      yearNow: moment().year(year).format('YYYY')
    });
  }
  changeMonth(type){
    let valueM = this.state.monthMoveValue;
    let valueY = this.state.yearMoveValue;

    if(type == 'sub'){
      valueM = valueM - 1;
      if(moment().add(valueM, 'M').month() == 11){
        valueY = valueY - 1;
      };
    }
    else if(type == 'add'){
      valueM = valueM + 1;
      if(moment().add(valueM, 'M').month() == 0){
        valueY = valueY + 1;
      };
    };

    this.setState({
      monthNowHead: moment().add(valueM, 'M').format('MMMM'),
      monthNowData: moment().add(valueM, 'M').format('MM'),
      monthChange: moment().add(valueM, 'M').month(),
      monthStart: moment().subtract(moment().date(),'d').add(valueM,'M').format('d'),
      monthMoveValue: valueM,
      yearMoveValue: valueY,
      yearNow: moment().add(valueY, 'y').year()
    });
  }
  changeYear(type){
    let valueY = this.state.yearMoveValue;

    if(type == 'sub'){
      valueY = valueY - 1;
    }
    else if(type == 'add'){
      valueY = valueY + 1;
    };
    this.setState({
      yearMoveValue: valueY,
      yearNow: moment().add(valueY, 'y').year()
    });
  }
  changeYears(type){
    let valueYear = parseInt(this.state.yearNow);
    let valueY = this.state.yearMoveValue;

    if(type == 'sub'){
      valueY = -(16);
      valueYear = valueYear + valueY;
    }
    else if(type == 'add'){
      valueY = 16
      valueYear = valueYear + valueY;
    };

    this.setState({
      yearMoveValue: valueY,
      yearNow: valueYear
    });
  }
  resetAll(){
    this.setState({
      monthNowHead: moment().format('MMMM'),
      yearNow: moment().year(),
      monthNowData: moment().format('MM'),
      monthChange: moment().month(),
      monthMoveValue: 0,
      yearMoveValue: 0,
      monthStart: moment().subtract(moment().date(),'d').format('d'),
      dayNowOnly: moment().format('Do').replace(/[a-zA-Z]+/g, ""),
      dayNowSpan: moment().format('Do').replace(/[0-9]+/g, ""),
      mainView: 'days'
    });
  }
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
  distDate(value){
    if(this.props.getDate){
      this.props.getDate(value);
    }
  }
  render(){
    if(this.props.isOpen === false){
      return null;
    }
    else {
      if(this.state.mainView == 'days'){
        var viewBody = (
          <CalendarDayView 
            changeDayHover={this.changeDayHover.bind(this)}
            startMonth={this.state.monthStart}
            monthNow={this.state.monthChange}
            monthData={this.state.monthNowData} 
            yearData={this.state.yearNow}
            close={() => this.onClose()}
            distribute={this.distDate.bind(this)} />
        );
        var buttonNav = (
          <div className="buttonNav">
            <div className="buttonDP buttonPrevDP" onClick={() => this.changeMonth('sub')}>Prev</div>
            <div className="buttonDP buttonNextDP" onClick={() => this.changeMonth('add')}>Next</div>
          </div>
        );
      }
      else if(this.state.mainView == 'months'){
        var viewBody = (
          <CalendarMonthView 
            changeViewToDays={this.changeMainView.bind(this)}
            changeMonthHover={this.changeMonthHover.bind(this)}
            yearData={this.state.yearNow} />
        );
        var buttonNav = (
          <div className="buttonNav">
            <div className="buttonDP buttonPrevDP" onClick={() => this.changeYear('sub')}>Prev</div>
            <div className="buttonDP buttonNextDP" onClick={() => this.changeYear('add')}>Next</div>
          </div>
        );
      }
      else if(this.state.mainView == 'years'){
        var viewBody = (
          <CalendarYearView 
            changeViewToMonth={this.changeMainView.bind(this)}
            changeYearHover={this.changeYearHover.bind(this)}
            yearData={this.state.yearNow} />
        );
        var buttonNav = (
          <div className="buttonNav">
            <div className="buttonDP buttonPrevDP" onClick={() => this.changeYears('sub')}>Prev</div>
            <div className="buttonDP buttonNextDP" onClick={() => this.changeYears('add')}>Next</div>
          </div>
        );
      };

      return(
        <div className="calendarMask">
          <div className="calendarWrapper">
            <div className="calendarContainer">
              <div className="calendarHeader">
                <div className="buttonDP buttonBackDP" onClick={() => this.onClose()}>Close</div>
                <div className="monthNow" onClick={() => this.changeMainView('months', null)}>
                  {this.state.monthNowHead}
                </div>
                <div className="dayNow" onClick={() => this.resetAll()}>
                  {this.state.dayNowOnly} 
                  <span>{this.state.dayNowSpan}</span>
                </div>
                <div className="yearNow" onClick={() => this.changeMainView('years', null)}>
                  {this.state.yearNow}
                </div>
                {buttonNav}
              </div>
              {viewBody}
            </div>
          </div>
        </div>
      );
    };
  }
}

class CalendarDayView extends React.Component {
  getMonthDays(month,year){
    if(month == 0){
      return 31;
    }
    else if(month == 1){
      if(year%4 == 0){
        return 29;
      }
      else{
        return 28;
      };
    }
    else if(month == 2){
      return 31;
    }
    else if(month == 3){
      return 30;
    }
    else if(month == 4){
      return 31;
    }
    else if(month == 5){
      return 30;
    }
    else if(month == 6){
      return 31;
    }
    else if(month == 7){
      return 31;
    }
    else if(month == 8){
      return 30;
    }
    else if(month == 9){
      return 31;
    }
    else if(month == 10){
      return 30;
    }
    else if(month == 11){
      return 31;
    };
  }
  getDateValue(value){
    if(this.props.close){
      if(this.props.distribute){
        this.props.distribute(value);
      };
      this.props.close();
    };
  }
  changeDayHover(day){
    if(this.props.changeDayHover){
      this.props.changeDayHover(day);
    };
  }
  render(){
    let monthDays = this.getMonthDays(this.props.monthNow,moment().year());

    let rows = [];
    let count = 1;
    let start = false;
    for(let i=0;i<6;i++){
      let cells = [];
      for(let j=0;j<7;j++){
        if(!start){
          if(j == this.props.startMonth && i == 0){
            let dateValue = moment().date(count).format('DD') + '/' + this.props.monthData + '/' + this.props.yearData;
            let dayValue = count;
            cells.push(
              <td 
                key={j} 
                onClick={() => {this.getDateValue(dateValue)}} 
                onMouseEnter={() => this.changeDayHover(dayValue)}>{count}</td>
            );
            start = true;
            count++;
          }
          else{
            cells.push(
              <td 
                key={j} 
                className="fadedCell" />
            );
          };
        }
        else{
          if(count == moment().date() && parseInt(this.props.monthData) - 1 == moment().month() && this.props.yearData == moment().year()){
            let dateValue = moment().date(count).format('DD') + '/' + this.props.monthData + '/' + this.props.yearData;
            let dayValue = count;
            cells.push(
              <td 
                key={j} 
                onClick={() => {this.getDateValue(dateValue)}} 
                onMouseEnter={() => this.changeDayHover(dayValue)}
                className="selectedCell">{count}</td>
            );
          }
          else{
            let dateValue = moment().date(count).format('DD') + '/' + this.props.monthData + '/' + this.props.yearData;
            let dayValue = count;
            cells.push(
              <td 
                key={j} 
                onClick={() => {this.getDateValue(dateValue)}}
                onMouseEnter={() => this.changeDayHover(dayValue)}>{count}</td>
            );
          };
          count++;
          if(count > monthDays){
            count = 1;
            start = false;
          };
        };
      };
      rows.push(<tr key={i}>{cells}</tr>); 
    };

    return (
      <div className="calendarMainDays">
        <table>
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class CalendarMonthView extends React.Component {
  changeToDayView(type,month){
    if(this.props.changeViewToDays){
      this.props.changeViewToDays(type,month);
    }
  }
  changeMonthHover(month){
    if(this.props.changeMonthHover){
      this.props.changeMonthHover(month);
    };
  }
  render(){
    let rows = [];
    let count = 1;
    for(let i=0;i<3;i++){
      let cells = [];
      for(let j=0;j<4;j++){
        if(count == moment().month() + 1 && this.props.yearData == moment().year()){
          let dateValue = moment().month(count-1).format('MM') + '/' + this.props.yearData;
          let monthValue = count;
          let month = moment().month(count-1).format('MMM');
          cells.push(
            <td 
              key={j} 
              onClick={() => {this.changeToDayView('days',dateValue)}} 
              onMouseEnter={() => this.changeMonthHover(monthValue)}
              className="selectedCell">{month}</td>
          );
        }
        else{
          let dateValue = moment().month(count-1).format('MM') + '/' + this.props.yearData;
          let monthValue = count;
          let month = moment().month(count-1).format('MMM');
          cells.push(
            <td 
              key={j} 
              onClick={() => {this.changeToDayView('days',dateValue)}}
              onMouseEnter={() => this.changeMonthHover(monthValue)}>{month}</td>
          );
        };
        count++;
        if(count > 12){
          count = 1;
          start = false;
        };
      };
      rows.push(<tr key={i}>{cells}</tr>); 
    };

    return (
      <div className="calendarMainMonth">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class CalendarYearView extends React.Component {
  changeYearHover(year){
    if(this.props.changeYearHover){
      this.props.changeYearHover(year);
    }
  }
  changeToMonthView(type,year){
    if(this.props.changeViewToMonth){
      this.props.changeViewToMonth(type,year);
    }
  }
  render(){
    let yearStart = this.props.yearData % 16;

    if(yearStart == 1){
      yearStart = this.props.yearData;
    }
    else if(yearStart > 1){
      yearStart = this.props.yearData - yearStart + 1;
    }
    else if(yearStart == 0){
      yearStart = this.props.yearData - 15;
    };

    let rows = [];
    for(let i=0;i<4;i++){
      let cells = [];
      for(let j=0;j<4;j++){
        if(yearStart == moment().year()){
          let yearValue = yearStart;
          cells.push(
            <td 
              key={j} 
              onClick={() => {this.changeToMonthView('months',yearValue)}} 
              onMouseEnter={() => this.changeYearHover(yearValue)}
              className="selectedCell">{yearValue}</td>
          );
        }
        else{
          let yearValue = yearStart;
          cells.push(
            <td 
              key={j} 
              onClick={() => {this.changeToMonthView('months',yearValue)}}
              onMouseEnter={() => this.changeYearHover(yearValue)}>{yearValue}</td>
          );
        };
        yearStart++;
      };
      rows.push(<tr key={i}>{cells}</tr>); 
    };

    return (
      <div className="calendarMainYear">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class TimePicker extends React.Component {
  constructor(){
    super();
    this.state = ({
      time: '',
      isTimePickerOpen: false
    });
  }
  openTimePicker(){
    this.setState({
      isTimePickerOpen: true
    });
  }
  closeTimePicker(){
    this.setState({
      isTimePickerOpen: false
    });
  }
  insertTime(time){
    this.setState({
      time: time 
    });
  }
  render(){
    return(
      <div className="timePicker">
        <p>
          <label htmlFor="timepicker">
          Time Picker
          </label>
        </p>
        <p>
          <input 
            type="text"
            name="timepicker"
            placeholder="HH:MM" 
            onFocus={() => this.openTimePicker()}
            value={this.state.time} />
        </p>
        <Clock 
          isOpen={this.state.isTimePickerOpen}
          onClose={() => this.closeTimePicker()}
          getTime={this.insertTime.bind(this)} />
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(){
    super();
    this.state=({
      hourNow: moment().format('HH'),
      minuteNow: moment().format('mm'),
      mainView: 'hour'
    });
  }
  changeHourHover(hour){
    this.setState({
      hourNow: moment().hour(hour).format('HH')
    });
  }
  changeToMinuteView(type,value){
    this.setState({
      hourNow: moment().hour(value).format('HH'),
      mainView: 'minute'
    });
  }
  changeMinuteHover(minute){
    this.setState({
      minuteNow: moment().minute(minute).format('mm')
    });
  }
  getValue(value){
    let hour = this.state.hourNow;
    let minute = moment().minute(value).format('mm');
    let time = hour + ':' + minute;

    if(this.props.getTime){
      this.props.getTime(time);
    };
  }
  close(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
  render(){
    if(this.props.isOpen === false){
      return null;
    }
    else{
      if(this.state.mainView == 'hour'){
        var clockBody = (
          <ClockHour 
          getHour = {this.changeToMinuteView.bind(this)}
          hoverHour = {this.changeHourHover.bind(this)} />
        );
        var clockHeader = (
          <div className="clockHeader">
            <span>{this.state.hourNow}</span> : {this.state.minuteNow}
          </div>
        );
      }
      else if(this.state.mainView == 'minute'){
        var clockBody = (
          <ClockMinute 
          getMinute = {this.getValue.bind(this)}
          hoverMinute = {this.changeMinuteHover.bind(this)}
          close = {() => this.close()} />
        );
        var clockHeader = (
          <div className="clockHeader">
            {this.state.hourNow} : <span>{this.state.minuteNow}</span>
          </div>
        );
      }

      return (
        <div className="clockMask">
          <div className="clockWrapper">
            <div className="clockContainer">
              {clockHeader}
              {clockBody}
            </div>
          </div>
        </div>
      );
    };
  }
}

class ClockHour extends React.Component {
  getHour(type,value){
    if(this.props.getHour){
      this.props.getHour(type,value);
    }
  }
  hoverHour(value){
    if(this.props.hoverHour){
      this.props.hoverHour(value);
    }
  }
  render(){
    let t = -60;
    let ticks = [];
    let hours = 13;
    let r = 96;
    let key = 0;
    for (let j=0;j<2;j++){
      for(let i=0;i<12;i++){
        let hourValue = hours;
        var x = Math.round(106 + r * Math.cos(t*(Math.PI/180)));
        var y = Math.round(106 + r * Math.sin(t*(Math.PI/180)));
        t = t + 30;
        ticks.push(
          <div 
            key={key}
            className="clockTick"
            onClick={() => {this.getHour('minute',hourValue)}} 
            onMouseEnter={() => this.hoverHour(hourValue)}
            style={{left: x, top: y}}>{moment().hour(hours).format('HH')}</div>
        );
        hours = hours + 1;
        key++;
      };
      r = r - 30;
      hours = 1;
    };

    return (
      <div className="clockMainHour">
        <div className="clockCircle">
          {ticks}
        </div>
      </div>
    );
  }
}

class ClockMinute extends React.Component {
  getMinute(value){
    if(this.props.close){
      if(this.props.getMinute){
        this.props.getMinute(value);
      }
      this.props.close();
    }
  }
  hoverMinute(value){
    if(this.props.hoverMinute){
      this.props.hoverMinute(value);
    }
  }
  render(){
    let t = -60;
    let ticks = [];
    let minute = 5;
    let r = 96;
    let key = 0;
    for(let i=0;i<12;i++){
      let minuteValue = minute;
      var x = Math.round(106 + r * Math.cos(t*(Math.PI/180)));
      var y = Math.round(106 + r * Math.sin(t*(Math.PI/180)));
      t = t + 30;
      ticks.push(
        <div 
          key={key}
          className="clockTick"
          onClick={() => {this.getMinute(minuteValue)}} 
          onMouseEnter={() => this.hoverMinute(minuteValue)}
          style={{left: x, top: y}}>{moment().minute(minute).format('mm')}</div>
      );
      minute = minute + 5;
      key++;
    };

    return (
      <div className="clockMainMinute">
        <div className="clockCircle">
          {ticks}
        </div>
      </div>
    );
  }
}

var check = document.getElementById('datetime')

if (check){
  console.log();
  ReactDOM.render(
    <FormTest />,
    document.getElementById('datetime')
  );
}