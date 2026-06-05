class ExpedientElement {
  constructor(type, content) {
    this.type = type;
    this.content = content;
    this.createdAt = new Date();
  }

  getDetail() {
    return {
      type: this.type,
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}

class ExpedientComposite {
  constructor() {
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }

  getElements() {
    return this.elements.map((element) => element.getDetail());
  }
}

module.exports = {
  ExpedientElement,
  ExpedientComposite,
};