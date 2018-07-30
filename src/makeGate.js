const gateGenerator = function* (resolve, reject) {
  const result = yield null
  resolve(result)
}

makeGate = () => {
  let keyMechanism
  const gate = new Promise((res, rej) => {
    keyMechanism = gateGenerator(res, rej)
  })
  // prime the key; the next call to 'next' will pass out the result
  keyMechanism.next()

  key = {
    openGate: async function(result) {
      keyMechanism.next(result)
    }
  }

  return { key: key, gate: gate }
}

module.exports.default = makeGate
