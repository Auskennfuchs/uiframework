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
        this.triggerRef = React.createRef()
    }

    componentDidMount = () => {
        document.addEventListener("click", this.hideOnDocumentClick)
    }

    componentWillUnmount = () => {
        document.removeEventListener("click", this.hideOnDocumentClick)
    }

    onSelect = (day) => {
        this.setState({ selected: day })
        this.hide()

        if (this.props.onSelect) {
            this.props.onSelect(day)
        }
    }

    hideOnDocumentClick = (e) => {
        const triggerElem = ReactDOM.findDOMNode(this.triggerRef.current)
        const elem = ReactDOM.findDOMNode(this.calendarRef.current)
        if (triggerElem && !triggerElem.contains(e.target) &&
            elem && !elem.contains(e.target)) {
            this.hide()
        }
    }

    show = () => {
        const trigger = ReactDOM.findDOMNode(this.triggerRef.current),
            rect = trigger.getBoundingClientRect(),
            isTopHalf = rect.top > window.innerHeight / 2,
            calendarHeight = 203
        if (this.calendarRef.current) {
            this.calendarRef.current.show({
                top: isTopHalf ? (rect.top + window.scrollY - calendarHeight - 3) : (rect.top + trigger.clientHeight + window.scrollY + 3),
                left: rect.left
            })
        }
    }

    hide = () => {
        this.calendarRef.current.hide()
    }

    render() {
        return (
            <DatePickerWrapper>
                <DatePickerInputWrapper>
                    <DateInput ref={this.triggerRef} onClick={this.show} value={DateUtilities.toString(this.state.selected)} />
                    <DatePickerCalendarIcon icon="calendar-alt" />
                </DatePickerInputWrapper>
                <Calendar ref={this.calendarRef} id={this.state.id} view={this.state.view} selected={this.state.selected} onSelect={this.onSelect} minDate={this.state.minDate} maxDate={this.state.maxDate} />
            </DatePickerWrapper>
        )
    }
}
