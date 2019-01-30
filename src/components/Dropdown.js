import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import DropdownElement from './DropdownElement'
import DisplayUtitilites from '../DisplayUtitlities';

export default class Dropdown extends Component {

    static propTypes = {
        onChange: PropTypes.func,
    }

    static defaultProps = {
        placeholder: "",
        value: undefined,
        items: [],
        onChange: () => { },
        as: DropdownElement,
    }

    constructor(props) {
        super(props)

        this.state = {
            value: props.value,
            placeholder: props.placeholder,
            showDropdown: false,
            optionZIndex: 0,
            hover: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.value !== nextProps.value) {
            return {
                value: nextProps.value
            }
        }
        return null
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickWindow)
    }

    findSelectedItem = (value) => this.props.items.find(item => item.id === value)

    onClickDropdown = () => {
        const { showDropdown } = this.state
        let optionZIndex = 0
        if (!showDropdown) {
            document.addEventListener("mousedown", this.onClickWindow)
            optionZIndex = DisplayUtitilites.maxZIndex() + 10
        } else {
            document.removeEventListener("mousedown", this.onClickWindow)
            optionZIndex = 0
        }
        this.setState({ showDropdown: !showDropdown, optionZIndex })
    }

    onClickItem = (id) => {
        const selectedItem = this.findSelectedItem(id)
        this.setState({ showDropdown: false }, () => {
            this.props.onChange({
                value: selectedItem.id,
                label: selectedItem.label,
            })
        })
    }

    onClickWindow = (e) => {
        const elem = ReactDOM.findDOMNode(this)
        if (!elem.contains(e.target)) {
            document.removeEventListener("mousedown", this.onClickWindow)
            this.setState({ showDropdown: false })
        }
    }

    onMouseOver = (hover) => {
        this.setState({ hover })
    }

    render() {
        const { value, placeholder, showDropdown, optionZIndex, hover } = this.state
        const { items, style } = this.props
        const selectedItem = this.findSelectedItem(value)
        const ElemenType = this.props.as
        return (
            <React.Fragment>
                <ElemenType style={style}
                    onClickDropdown={this.onClickDropdown}
                    onMouseEnter={() => this.onMouseOver(true)}
                    onMouseLeave={() => this.onMouseOver(false)}
                    onClickItem={this.onClickItem}
                    selectedItem={selectedItem}
                    items={items}
                    hover={hover}
                    value={value}
                    optionZIndex={optionZIndex}
                    placeholder={placeholder}
                    showDropdown={showDropdown}
                />
            </React.Fragment>
        )
    }
}
