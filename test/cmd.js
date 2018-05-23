import { test as testCase } from 'ava'
import * as Cmd from '../cmd'

testCase('Cmd.none() should do nothing', test => {
  var value = 'Initial'
  const dispatch = function (msg) {
    value = 'Modified'
  }

  var effect = Cmd.none()
  effect(dispatch)

  test.is(value, 'Initial')
})

testCase('Cmd.ofMsg dispatches the message correctly', test => {
  const message = 'Incr'
  var state = 0
  const dispatch = function (msg) {
    if (msg === 'Incr') {
      state = state + 1
    }
  }

  const effect = Cmd.ofMsg(message)
  effect(dispatch)

  test.is(state, 1)
})
