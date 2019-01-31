import React, { Component } from 'react'
import styled from 'styled-components'
import DateUtilities from '../DateUtilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MonthContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.4em;
    user-select: none;
`

const MonthText = styled.span`
    flex: 1 auto;
    text-align: center;
`

const PageButtonIcon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 50%;
    top: 50%;
    line-height: 1em;
    transform: translateX(-50%) translateY(-50%);
    font-size: 0.8em;
`

const PageButton = styled.div`
    background-color: #333;
    color: #fff;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    position: relative;
    cursor: pointer;

    &:first-of-type ${PageButtonIcon} {
        margin-left: -0.1em;
    }

    &:last-of-type ${PageButtonIcon} {
        margin-left: 0.1em;
    }
`

export default class MonthHeader extends Component {

    state = {
        view: DateUtilities.clone(this.props.view),
        enabled: true,
    }

    moveBackward = () => {
        const view = DateUtilities.clone(this.state.view)
        view.setMonth(view.getMonth() - 1)
        this.move(view, false)
    }

    moveForward = () => {
        const view = DateUtilities.clone(this.state.view)
        view.setDate(1)
        view.setMonth(view.getMonth() + 1)

        this.move(view, true)
    }

    move = (view, isForward) => {
        if (!this.state.enabled) {
            return
        }

        this.setState({
            view: view,
            enabled: false
        })

        this.props.onMove(view, isForward)
    }

    enable = () => {
        this.setState({ enabled: true })
    }

    render() {
        const { enabled } = this.state
        return (
            <MonthContainer>
                <PageButton onClick={this.moveBackward} enabled={enabled}>
                    <PageButtonIcon icon="chevron-left" />
                </PageButton>
                <MonthText>{DateUtilities.toMonthAndYearString(this.state.view)}</MonthText>
                <PageButton onClick={this.moveForward}>
                    <PageButtonIcon icon="chevron-right" />
                </PageButton>
            </MonthContainer>
        )
    }
}


