import React, { Component } from 'react'
import styled,{css} from 'styled-components'
import DateUtilities from '../DateUtilities'

const WeekContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Day = styled.div`
    text-align: center;
    width: 3em;
    padding: 0.3em 0;

    color: ${p => p.otherMonth ? '#ddd' : '#333'};

    ${p=>p.today ? css`
        background-color: #ccc;
        color: #000;
    `:""}
`

export default class Week extends Component {
    buildDays = (start) => {
        const days = [DateUtilities.clone(start)]
        let clone = DateUtilities.clone(start);
        for (let i = 1; i <= 6; i++) {
            clone = DateUtilities.clone(clone);
            clone.setDate(clone.getDate() + 1);
            days.push(clone);
        }
        return days;
    }

    getDayClassName = (day) => ({
        today: DateUtilities.isSameDay(day, new Date()),
        otherMonth: (this.props.month !== day.getMonth()),
        selected: (this.props.selected && DateUtilities.isSameDay(day, this.props.selected)),
        disabled: this.isDisabled(day),
    })

    isDisabled = (day) => {
        const { minDate, maxDate } = this.props
        return (minDate && DateUtilities.isBefore(day, minDate)) || (maxDate && DateUtilities.isAfter(day, maxDate))
    }

    render() {
        const days = this.buildDays(this.props.start)
        return (
            <WeekContainer>
                {days.map((day, idx) => {
                    const dayProps = this.getDayClassName(day)
                    return (
                        <Day key={idx} {...dayProps}>
                            {DateUtilities.toDayOfMonthString(day)}
                        </Day>
                    )
                })}
            </WeekContainer>
        )
    }
}
