import React, {Component} from 'react';
import './DatePicker.css';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        let today = new Date();

        let maxYear = props.maxYear;
        if (!maxYear)
            maxYear = 50;


        this.state = {
            id: props.id,
            startYear: today.getFullYear(),
            endYear: today.getFullYear() - maxYear + 1,
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
            yearArr: [],
            monthArr: [],
            dayArr: [],
            onChange: props.onChange,
            validityCheck: props.validityCheck,
            onMount: props.onMount
        };

        this.setState(this.state);
    }

    componentDidMount() {
        this.changeDateValue(this.state.year, this.state.month);
        if (this.state.onMount)
            this.state.onMount(this.state.year, this.state.month, this.state.day);
    }

    changeDateValue(year, month) {


        let yearArr = [];
        for (let i = this.state.startYear; i >= this.state.endYear; i--) {
            yearArr.push(i);
        }

        let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        let dayArr = [];
        let daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++)
            dayArr.push(i);

        this.setState({
            yearArr: yearArr,
            monthArr: monthArr,
            dayArr: dayArr
        });
    }

    setDate(date) {
        this.setState({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        })
    }

    getDate() {
        return new Date(this.state.year, this.state.month - 1, this.state.day);
    }

    setYear(year) {
        this.state.year = year;
        this.setState({year: year});
        this.changeDateValue(this.state.year, this.state.month);
        if (this.state.onChange)
            this.state.onChange(Number(this.state.year), Number(this.state.month), Number(this.state.day));
    }

    setMonth(month) {
        this.state.month = month;
        this.setState({month: month});
        this.changeDateValue(this.state.year, this.state.month);
        if (this.state.onChange)
            this.state.onChange(Number(this.state.year), Number(this.state.month), Number(this.state.day));
    }

    setDay(day) {
        this.state.day = day;
        this.setState({day: day});
        if (this.state.onChange)
            this.state.onChange(Number(this.state.year), Number(this.state.month), Number(this.state.day));
    }

    getYear() {
        return this.state.year;
    }

    getMonth() {
        return this.state.month;
    }

    getDay() {
        return this.state.day;
    }

    render() {

        return (
            <div className='DatePicker' id={this.state.id}>
                <select className="year" value={this.state.year} onChange={(event) => {
                    if (this.state.validityCheck) {
                        if (!this.state.validityCheck(event.target.value, this.state.month, this.state.day))
                            return;
                    }
                    this.setYear(event.target.value);
                }}>
                    {this.state.yearArr.map((year) => {
                        return (
                            <option value={year}>{year}</option>
                        )
                    })}
                </select> 년
                <select className="month" value={this.state.month} onChange={(event) => {
                    if (this.state.validityCheck) {
                        if (!this.state.validityCheck(this.state.year, event.target.value, this.state.day))
                            return;
                    }
                    this.setMonth(event.target.value);
                }}>
                    {this.state.monthArr.map((month) => {
                        return (
                            <option value={month}>{month}</option>
                        )
                    })}
                </select> 월
                <select className="day" value={this.state.day} onChange={(event) => {
                    if (this.state.validityCheck) {
                        if (!this.state.validityCheck(this.state.year, this.state.month, event.target.value))
                            return;
                    }
                    this.setDay(event.target.value)
                }}>
                    {this.state.dayArr.map((day) => {
                        return (
                            <option value={day}>{day}</option>
                        )
                    })}
                </select> 일
            </div>
        )
    }
}

export default DatePicker;