import test from 'ava'
import effect from '../effect'

test('map() transforms any dispatched messages', t => {
  function rawEffect (dispatch) {
    dispatch(1)
    dispatch(2)
    dispatch(3)
  }

  const inc = n => n + 1
  const newEffect = effect.map(inc, rawEffect)

  const results = []
  newEffect(result => results.push(result))

  t.deepEqual(results, [2, 3, 4], 'results should have been incremented')
})

test('map() should not wrap a falsey effect', t => {
  /*
    The reasoning for this test is that commands can
    be falsey and not run by the runtime.

    map() should align with this behavior.
  */

  t.notThrows(() => {
    const inc = n => n + 1
    const newEffect = effect.map(inc, null)
    t.is(newEffect, null)
  })
})

test('map() should pass the second argument to the effect', t => {
  const val = 1
  const id = x => x
  function rawEffect (dispatch, arg) {
    t.is(arg, val)
  }

  const newEffect = effect.map(id, rawEffect)
  newEffect(null, val)
})

test('map() should return the result of the effect', t => {
  const id = x => x
  const rawEffect = () => 1
  const newEffect = effect.map(id, rawEffect)
  t.is(newEffect(), 1, 'newEffect should return the effect value')
})

test('batch() should return a single effect', t => {
  t.is(typeof effect.batch([]), 'function')
})

test('batch() should pass dispatch to each effect', t => {
  const makeEffect = dispatchVal => dispatch => dispatch(dispatchVal)
  const vals = [1, 2, 3]
  const effects = effect.batch(vals.map(makeEffect))

  const results = []
  effects(result => results.push(result))

  t.deepEqual(results, vals)
})

test('batch() should not call falsey values', t => {
  /*
    The reasoning for this test is that commands can
    be falsey and not run by the runtime.

    batch() should align with this behavior.
  */

  t.notThrows(() => {
    const effects = effect.batch([null, false, undefined, 0])
    effects()
  })
})

test('batch() should pass each effect its second argument', t => {
  const makeEffect = expectedArg => (dispatch, actualArg) => {
    t.is(actualArg, expectedArg)
  }

  const args = [1, 2, 3]
  const effects = effect.batch(args.map(makeEffect))
  effects(null, args)
})

test('batch() should return the effects return values', t => {
  const makeEffect = returnVal => dispatch => returnVal
  const vals = [1, 2, 3]
  const effects = effect.batch(vals.map(makeEffect))
  t.deepEqual(effects(), vals)
})
