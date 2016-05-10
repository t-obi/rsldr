const getStub = (ClassWithoutStub, propertyName, stub) =>
  class ClassWithStub extends ClassWithoutStub {
    constructor(props) {
      super(props);
      this[propertyName] = stub;
    }
  };

export default getStub;
