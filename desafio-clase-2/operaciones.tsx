class Sumar {
  private num1: number
  private num2: number

  constructor(num1: number, num2: number) {
    this.num1 = num1
    this.num2 = num2
  }

  resultado(): number {
    return this.num1 + this.num2
  }
}

class Restar {
  private num1: number
  private num2: number

  constructor(num1: number, num2: number) {
    this.num1 = num1
    this.num2 = num2
  }

  resultado(): number {
    return this.num1 - this.num2
  }
}

module.exports = {
  sumar: Sumar,
  restar: Restar
};