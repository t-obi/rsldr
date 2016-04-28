/*eslint-env mocha*/
import expect from 'expect'
import Handle from './index'
import React from 'react'
import {shallow} from 'enzyme'
import { render } from 'react-dom'

describe('Handle', () => {

  it('renders a div with position: absolute', () => {
    expect(false);
  });

  it('has a mouseDown listener', () => {
    expect(false);
  });

  it('registers a global mouseUp listener on mouseDown', () => {
    expect(false);
  });

  it('registers a mouseMove listener on mouseDown', () => {
    expect(false);
  });

  it('removes all mouseUp and mouseMove listeners on mouseUp', () => {
    expect(false);
  });

  it('invokes the onDragEnd callback when mouseUp fires after mouseDown fired', () => {
    expect(false);
  });

  it('does NOT invoke the onDragEnd callback when mouseUp fires but mouseDown has not fired before', () => {
    expect(false);
  });

  it('invokes the onDrag callback if mouseDown has fired and mouseUp has not fired yet', () => {
    expect(false);
  });

  it('does NOT invoke the onDrag callback if mouseDown has not fired', () => {
    expect(false);
  });

  it('does NOT invoke the onDrag callback if mouseDown has AND mouseUp have fired', () => {
    expect(false);
  });

  it('says "RAR"', () => {
    expect(false);

    const div = document.createElement('div')
    document.body.appendChild(div)
    render(<Handle/>, div)
    expect(div.innerHTML).toMatch(/RAR/)
  })
})
