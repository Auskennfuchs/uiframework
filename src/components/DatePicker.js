import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DateUtilities from '../DateUtilities'
import DisplayUtitilites from '../DisplayUtitlities'

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

const CalendarWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
`

const CalendarContainer = styled.table`
    background-color: #fff;
    border: 2px solid #ddd;
    border-spacing: 0;
`

const WeekHeader = styled.tr`
    th {
        padding: 0.3em 0.5em;
        font-weight: normal;
        border-bottom: 1px solid #ddd;
    }
`

export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        var def = props.selected || new Date()
        this.state = {
            view: DateUtilities.clone(def),
            selected: DateUtilities.clone(def),
            minDate: null,
            maxDate: null,
            visible: false,
        }
    }

    render() {
        const calendarZIndex = DisplayUtitilites.maxZIndex() + 10
        return (
            <DatePickerWrapper>
                <DatePickerInputWrapper>
                    <DateInput />
                    <DatePickerCalendarIcon icon="calendar-alt" />
                </DatePickerInputWrapper>
                <CalendarWrapper style={{ zIndex: calendarZIndex }}>
                    <CalendarContainer>
                        <WeekHeader>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </WeekHeader>
                        <tr>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                            <td>01</td>
                        </tr>
                    </CalendarContainer>
                </CalendarWrapper>
            </DatePickerWrapper>
        )
    }
}
