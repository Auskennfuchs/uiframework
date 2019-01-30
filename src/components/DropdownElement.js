import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DropdownWrapper = styled.div`
    display: inline-block;
    border: 1px solid #ddd;
    position: relative;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
`

const SelectedWrapper = styled.div`
    display: flex;
    padding: 0.3em;
    align-items: center;
`

const DropdownArrow = styled(FontAwesomeIcon)`
    margin-left: 0.5em;
    color: ${p => p.hover ? "#333" : "#888"};
`

const SelectedText = styled.span`
    flex: 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const Placeholdertext = styled.span`
    color: #888;
`

const OptionContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    max-width: 130%;
    margin: 0 0 0.3em;
    max-height: 15em;
    overflow-y: auto;
    box-shadow: 0 2px 10px 2px rgba(100,100,100,0.2);
`

const OptionWrapper = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;    
    border: 1px solid #ddd;
    background-color: #fff;
`

const OptionEntry = styled.li`
    padding: 0.3em 0.5em;
    border-top: 1px solid #ddd;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;

    background-color: ${p => p.selected ? "#877" : "transparent"};

    &:first-child {
        border-top: 0 none;
    }

    &:hover {
        background-color: #eee;
    }
`

const DropdownElement = ({ style, onClickDropdown, onMouseEnter, onMouseLeave, onClickItem, selectedItem, placeholder, hover, showDropdown, optionZIndex, value, items }) => (
    <DropdownWrapper style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <SelectedWrapper onClick={onClickDropdown}>
            <SelectedText>
                {!selectedItem &&
                    <Placeholdertext>{placeholder}</Placeholdertext>
                }
                {selectedItem &&
                    <React.Fragment>{selectedItem.label}</React.Fragment>
                }
            </SelectedText>
            <DropdownArrow icon={showDropdown ? "chevron-up" : "chevron-down"} hover={hover} />
        </SelectedWrapper>
        {showDropdown &&
            <OptionContainer style={{ zIndex: optionZIndex }}>
                <OptionWrapper>
                    {items.map(({ id, label }) => (
                        <OptionEntry key={id} selected={value === id} onClick={() => onClickItem(id)}>
                            {label}
                        </OptionEntry>
                    ))}
                </OptionWrapper>
            </OptionContainer>
        }
    </DropdownWrapper>
)

export default DropdownElement