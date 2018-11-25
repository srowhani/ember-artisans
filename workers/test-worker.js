
module.exports = {
  async doSomething (a, b) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return a + b
  }
}