const {default:makeGate} = require('./makeGate')

test('gate should wait on open', async function() {
  let foo = 1
  const {key, gate} = makeGate()
  gate.then(() => foo = 2)
  expect(foo).toBe(1)
  key.openGate()
  await gate
  expect(foo).toBe(2)
})

test('can pass result through gate', async function() {
  let foo = 1
  const {key, gate} = makeGate()
  gate.then((result) => foo = result)
  expect(foo).toBe(1)
  key.openGate(2)
  await gate
  expect(foo).toBe(2)
})
