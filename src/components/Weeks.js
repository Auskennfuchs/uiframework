import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import DateUtilities from '../DateUtilities'
import Week from './Week';

const WeeksWrapper = styled.div`
    position: relative;
    overflow: hidden;
`

const WeeksContainer = styled.div`
    position: ${p => p.current ? 'relative' : 'absolute'};
    top: 0;
    left: 0;
    width: 100%;
    border-spacing: 0.2em;
    background-color: #fff;

    ${p => p.sliding ? css`
        transition: transform 100ms ease;
    `: ""}

    ${p => p.sliding==="left" ? css`
        transform: translate3d(-100%, 0, 0);
    `: ""}

    ${p => p.sliding==="right" ? css`
        transform: translate3d(100%, 0, 0);
    `: ""}

    ${p => p.other ? css`
        left: 100%;
    `:""}

    ${p => p.other && p.sliding==="right" ? css`
        left: -100%;
    `:""}

`

export default class Weeks extends Component {

    state = {
        view: DateUtilities.clone(this.props.view),
        other: DateUtilities.clone(this.props.view),
        sliding: null,
    }

    constructor(props) {
        super(props)
        this.currentRef = React.createRef()
        this.otherRef = React.createRef()
    }

    componentDidMount = () => {
        console.log(this.currentRef.current)
        this.currentRef.current.addEventListener("transitionend", this.onTransitionEnd)
    }

    onTransitionEnd = () => {
        this.setState({
            sliding: null,
            view: DateUtilities.clone(this.state.other)
        })
        this.props.onTransitionEnd()
    }

    getWeekStartDates = (view) => {
        let viewStart = view
        viewStart.setDate(1);
        viewStart = DateUtilities.moveToDayOfWeek(DateUtilities.clone(viewStart), 1);

        const current = DateUtilities.clone(viewStart);
        current.setDate(current.getDate() + 7);

        const starts = [viewStart],
            month = current.getMonth();

        while (current.getMonth() === month) {
            starts.push(DateUtilities.clone(current));
            current.setDate(current.getDate() + 7);
        }

        return starts;
    }

    moveTo = (view, isForward) => {
        this.setState({
            sliding: isForward ? "left" : "right",
            other: DateUtilities.clone(view)
        });
    }

    renderWeeks = (view) => {
        const starts = this.getWeekStartDates(view),
            month = starts[1].getMonth();

        return starts.map((s, i) => (
            <Week key={i} start={s} month={month} selected={this.props.selected} onSelect={this.props.onSelect} minDate={this.props.minDate} maxDate={this.props.maxDate} />
        ))
    }

    render() {
        const { view, other, sliding } = this.state
        return (
            <WeeksWrapper>
                <WeeksContainer ref={this.currentRef} current sliding={sliding}>
                    {this.renderWeeks(view)}
                </WeeksContainer>
                <WeeksContainer ref={this.otherRef} other sliding={sliding}>
                    {this.renderWeeks(other)}
                </WeeksContainer>
            </WeeksWrapper>
        )
    }
}
