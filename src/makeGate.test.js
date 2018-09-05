const makeGate = require('./makeGate').makeGate

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
  key.openGate(3)
  await gate
  expect(foo).toBe(3)
})

test('allows multiple unlocking while passing results through and retains initial value', async function() {
  let foo = 1
  const {key, gate} = makeGate()
  gate.then((result) => foo = result)
  expect(foo).toBe(1)
  key.openGate(2)
  key.openGate(3)
  await gate
  expect(foo).toBe(2)
  key.openGate(4)
  expect(foo).toBe(2)
})

test("setting 'openValue' when creating gate results in value passing out of gate", async function() {
  let foo = 1
  const {key, gate} = makeGate(2)
  gate.then((result) => foo = result)
  expect(foo).toBe(1)
  key.openGate()
  await gate
  expect(foo).toBe(2)
})

test("'openValue' can be overriden by result value", async function() {
  let foo = 1
  const {key, gate} = makeGate(2)
  gate.then((result) => foo = result)
  expect(foo).toBe(1)
  key.openGate(3)
  await gate
  expect(foo).toBe(3)
})

test("falsy result value will still override initial 'openValue'", async function() {
  let foo = 1
  const {key, gate} = makeGate(2)
  gate.then((result) => foo = result)
  expect(foo).toBe(1)
  key.openGate(false)
  await gate
  expect(foo).toBe(false)
})
