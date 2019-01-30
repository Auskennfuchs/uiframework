import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateUtilities from '../DateUtilities'
import Calendar from './Calendar'

const DatePickerWrapper = styled.div`
    display: inline-block;
    position: relative;
    border: 1px solid #ddd;
`

const DatePickerInputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.3em;
`

const DateInput = styled.input`
    border: 0 none;
    font-weight: normal;
    font-family: inherit;
    font-size: 1em;
    line-height: 1.25em;

    &:focus {
        outline: 0 none;
    }
`

const DatePickerCalendarIcon = styled(FontAwesomeIcon)`
    margin-left: 0.5em;
    color: ${p => p.hover ? "#333" : "#ccc"};
`

export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        const def = props.selected || new Date()
        this.state = {
            view: DateUtilities.clone(def),
            selected: DateUtilities.clone(def),
            minDate: null,
            maxDate: null,
            visible: false,
        }
        this.calendarRef = React.createRef()
    }

    componentDidMount = () => {
        document.addEventListener("click", this.hideOnDocumentClick)
    }

    componentWillUnmount = () => {
        document.removeEventListener("click", this.hideOnDocumentClick)
    }

    hideOnDocumentClick = (e) => {
        const elem = ReactDOM.findDOMNode(this.calendarRef.current)
        if (!elem.contains(e.target)) {
            this.hide()
        }
    }

    hide = () => {
        this.calendarRef.current.hide()
    }

    render() {
        return (
            <DatePickerWrapper>
                <DatePickerInputWrapper>
                    <DateInput />
                    <DatePickerCalendarIcon icon="calendar-alt" />
                </DatePickerInputWrapper>
                <Calendar ref={this.calendarRef} id={this.state.id} view={this.state.view} selected={this.state.selected} onSelect={this.onSelect} minDate={this.state.minDate} maxDate={this.state.maxDate}/>
            </DatePickerWrapper>
        )
    }
}
