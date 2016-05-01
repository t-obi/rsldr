import React from 'react'
import { IndexLink, Link } from 'react-router'
import Title from 'react-title-component'

export default React.createClass({
  render() {
    return (
      <div>
        <Title render="Awesome App"/>
        <h1>Slider Example</h1>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

