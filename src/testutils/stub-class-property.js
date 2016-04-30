const stub = (ClassWithoutStub, propertyName, stub) => {
  return class ClassWithStub extends ClassWithoutStub {
    constructor(props) {
      super(props);
      this[propertyName] = stub;      
    }
  } 
}

export default stub;