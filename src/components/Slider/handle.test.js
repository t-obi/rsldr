/*eslint-env mocha*/
import Handle from './handle'
import { handle, slider } from './styles.css'

import React from 'react'
import {shallow, mount} from 'enzyme'
import { render } from 'react-dom'
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import sinon from 'sinon';
import stub from '../../testutils/stub-class-property';
import ReactTestUtils from 'react-addons-test-utils';
import simulant from 'simulant';

describe('Handle', () => {
  const emptyProps = {onDrag:() => {}, value:0 }
  it('renders a div with position: absolute', () => {
    const wrapper = shallow(<Handle {...emptyProps} />);
    expect(wrapper).to.have.style('position', 'absolute');
    wrapper.unmount();
  });

  it('has css class "handle', () => {
    const wrapper = shallow(<Handle {...emptyProps} />);
    expect(wrapper).to.have.className('handle');
    wrapper.unmount();
  });

  it('invokes handleDragStart on mouseDown', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDragStart', spy);
    const wrapper = shallow(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown');
    expect(spy.calledOnce).to.be.true;
    wrapper.unmount();
  });

  // TODO: figure out how to test this
  /*
  it('registers a global mouseUp listener on mouseDown', () => {
    expect(false).to.be.true();
  });

  it('registers a mouseMove listener on mouseDown', () => {
    expect(false).to.be.true();
  });

  it('removes all mouseUp and mouseMove listeners on mouseUp', () => {
    expect(false).to.be.true();
  });

  it('removes all event listeners when unmounted', () => {
    expect(false).to.be.true();
  });
  */
 
  it('invokes handleDragEnd when mouseUp fires after mouseDown fired', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDragEnd', spy);
    const wrapper = shallow(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown');
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mouseup');
    expect(spy.calledOnce).to.be.true;
    wrapper.unmount();
  });

  it('does NOT invoke the onDragEnd callback when mouseUp fires but mouseDown has not fired before', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDragEnd', spy);
    const wrapper = shallow(<WithSpy {...emptyProps} />);
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mouseup');
    expect(spy.called).to.be.false;
    wrapper.unmount();
  });

  it('invokes handleDrag if mouseDown has fired and mouseUp has not fired yet', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown');
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.true;
    wrapper.unmount();
  });

  it('does NOT invoke handleDrag if mouseDown has not fired', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.false;
    wrapper.unmount();
  });

  it('does NOT invoke the onDrag callback if mouseDown has AND mouseUp have fired', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown');
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mouseup');
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.false;
    wrapper.unmount();
  });
})
