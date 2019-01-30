import React, { Component } from 'react'
import styled from 'styled-components'
import DisplayUtitilites from '../DisplayUtitlities'
import Weeks from './Weeks';
import MonthHeader from './MonthHeader';

const CalendarWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
`

const CalendarContainer = styled.div`
    background-color: #fff;
    border: 2px solid #ddd;
    border-spacing: 0;
`

const WeekHeader = styled.div`
    display: flex;
    span {
        width: 3em;
        text-align: center;
        padding: 0.3em 0;
        font-weight: normal;
        border-bottom: 1px solid #ddd;
    }
`

export default class Calendar extends Component {
    state = {
        visible: false
    }

    constructor(props) {
        super(props)
        this.calendarRef = React.createRef()
        this.monthHeaderRef = React.createRef()
        this.weeksRef = React.createRef()
    }

    componentDidMount() {
        this.show({ top: 0, left: 0 })
    }

    onMove = (view, isForward) => {
        this.weeksRef.current.moveTo(view, isForward)
    }

    onTransitionEnd = ()  => {
        this.monthHeaderRef.current.enable()
    }

    show = (position) => {
        const calendarZIndex = DisplayUtitilites.maxZIndex() + 10
        this.setState({
            visible: true,
            style: {
                top: position.top,
                left: position.left
            },
            calendarZIndex,
        })
    }


    hide = () => {
        if (this.state.visible) {
            this.setState({ visible: false })
        }
    }

    render() {
        const { calendarZIndex } = this.state
        return (
            <CalendarWrapper style={{ zIndex: calendarZIndex }} ref={this.calendarRef}>
                <CalendarContainer>
                    <MonthHeader ref={this.monthHeaderRef} view={this.props.view} onMove={this.onMove} />
                    <WeekHeader>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </WeekHeader>
                    <Weeks ref={this.weeksRef} view={this.props.view} selected={this.props.selected} onTransitionEnd={this.onTransitionEnd} onSelect={this.props.onSelect} minDate={this.props.minDate} maxDate={this.props.maxDate} />
                </CalendarContainer>
            </CalendarWrapper>
        )
    }
}
