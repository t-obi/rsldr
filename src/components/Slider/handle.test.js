/* eslint-env mocha*/
import Handle from './handle';

import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
chai.use(chaiEnzyme());
chai.use(dirtyChai);

import sinon from 'sinon';
import stub from '../../testutils/stub-class-property';
import simulant from 'simulant';

describe('Handle', () => {
  const emptyProps = { onDrag: () => {}, value: 0, position: 0 };
  it('renders a div with position: absolute', () => {
    const wrapper = mount(<Handle {...emptyProps} />);
    expect(wrapper).to.have.style('position', 'absolute');
    wrapper.unmount();
  });

  it('has css class "handle', () => {
    const wrapper = mount(<Handle {...emptyProps} />);
    expect(wrapper).to.have.className('handle');
    wrapper.unmount();
  });

  it('invokes handleDragStart on mouseDown', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDragStart', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown');
    expect(spy.calledOnce).to.be.true();
    wrapper.unmount();
  });

  // TODO: figure out how to test this
  // or maybe don't, should be implicitly covered by the other test anyway
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
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown', { screenX: 20 });
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mouseup');
    expect(spy.calledOnce).to.be.true();
    wrapper.unmount();
  });

  it('does NOT invoke the onDragEnd callback when mouseUp fires but mouseDown has not fired before',
    () => {
      const spy = sinon.spy();
      const WithSpy = stub(Handle, 'handleDragEnd', spy);
      const wrapper = mount(<WithSpy {...emptyProps} />);
      // needs to fire a real event because testutils.simulate does not work with react 15?!
      simulant.fire(document, 'mouseup');
      expect(spy.called).to.be.false();
      wrapper.unmount();
    }
  );

  it('invokes handleDrag if mouseDown has fired and mouseUp has not fired yet', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown', { screenX: 20 });
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.true();
    wrapper.unmount();
  });

  it('does NOT invoke handleDrag if mouseDown has not fired', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.false();
    wrapper.unmount();
  });

  it('does NOT invoke the onDrag callback if mouseDown has AND mouseUp have fired', () => {
    const spy = sinon.spy();
    const WithSpy = stub(Handle, 'handleDrag', spy);
    const wrapper = mount(<WithSpy {...emptyProps} />);
    wrapper.simulate('mouseDown', { screenX: 20 });
    // needs to fire a real event because testutils.simulate does not work with react 15?!
    simulant.fire(document, 'mouseup');
    simulant.fire(document, 'mousemove');
    expect(spy.called).to.be.false();
    wrapper.unmount();
  });

  it('should set the position-offset (->"left") to the position from props', () => {
    const wrapper = mount(<Handle {...emptyProps} />);
    expect(wrapper).to.have.style('left', '0px');
    wrapper.setProps({ position: 12 });
    expect(wrapper).to.have.style('left', '12px');
    wrapper.setProps({ position: 123 });
    expect(wrapper).to.have.style('left', '123px');
    wrapper.setProps({ position: 666 });
    expect(wrapper).to.have.style('left', '666px');

    wrapper.unmount();
  });

  it('should invoke ondrag callback when handleDrag is called', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Handle {...emptyProps} onDrag={spy} />);
    wrapper.instance().handleDrag({ screenX: 0 });
    expect(spy.called).to.be.true();
  });

  it('should pass the value of event.screenX to onDrag prop', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Handle {...emptyProps} onDrag={spy} />);
    wrapper.instance().handleDrag({ screenX: 123 });
    expect(spy.calledWith(123)).to.be.true();
    wrapper.instance().handleDrag({ screenX: 666 });
    expect(spy.calledWith(666)).to.be.true();
    wrapper.instance().handleDrag({ screenX: 0 });
    expect(spy.calledWith(0)).to.be.true();
    wrapper.instance().handleDrag({ screenX: 8080 });
    expect(spy.calledWith(8080)).to.be.true();
  });
});
