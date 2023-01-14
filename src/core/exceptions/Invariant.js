class Invariant extends Error {
  constructor(message) {
    super(message);
    this.name = 'Invariant';
  }
}

module.exports = Invariant;
