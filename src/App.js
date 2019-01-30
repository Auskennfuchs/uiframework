import React, { Component } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp, faCalendarAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Dropdown from './components/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from './components/DatePicker'

library.add(faChevronDown, faChevronUp, faCalendarAlt, faChevronLeft, faChevronRight)

const Container = styled.div`
  background-color: #fefefe;
  padding: 0.3em;
  width: 100%;
  height: 100vh;
  font-size: 14px;
`

class App extends Component {

  state = {
    value: undefined
  }

  onChangeDropdown = ({ value }) => {
    this.setState({ value })
  }

  render() {
    const items = [
      { id: "MUC", label: "München" },
      { id: "LAX", label: "Los Angeles" },
      { id: "FRA", label: "Frankfurt" },
      { id: "XXX", label: "richtig langer Name für ein Feld" },
      { id: "FRA1", label: "Frankfurt" },
      { id: "FRA2", label: "Frankfurt" },
      { id: "FRA3", label: "Frankfurt" },
      { id: "FRA4", label: "Frankfurt" },
      { id: "FRA5", label: <FontAwesomeIcon icon="chevron-down" /> },
      { id: "FRA6", label: "Frankfurt" },
      { id: "FRA7", label: "Frankfurt" },
      { id: "FRA8", label: "Frankfurt" },
      { id: "FRA9", label: "Frankfurt" },
    ]
    const { value } = this.state
    return (
      <Container>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <DatePicker />
        <p>
          Lorem Ipsum
        </p>
        <Dropdown placeholder="Bitte wählen" value={value} items={items} style={{ width: "200px" }} onChange={this.onChangeDropdown} />
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p>
          Lorem Ipsum
        </p>
        <p style={{ zIndex: 100000, position: "fixed", bottom: 0, backgroundColor: "#f0f", width: "100%", padding: "4em 0" }}>
          Lorem Ipsum
        </p>
      </Container>
    )
  }
}

export default App