module.exports = function (options) {
  const logLevel = (options && options.logLevel) || 'warn'
  const emptyPrint = () => {}
  const logList = ['debug', 'info', 'warn', 'error']

  logList.slice(0, logList.indexOf(logLevel)).forEach(log => {
    Object.defineProperties(console, {
      [log]: {
        value: emptyPrint,
        writable: true,
        enumerable: true,
        configurable: true
      }
    })
  })
  return console
}
