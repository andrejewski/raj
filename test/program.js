import test from 'ava'
import {program} from '../program'

test('program() should call renderer() initially', t => {
  const initialState = 1
  return new Promise(resolve => {
    program({
      init: [initialState],
      renderer (dispatch, state) {
        t.is(state, initialState)
        resolve()
      }
    })
  })
})

test('program() should call renderer() after dispatch', t => {
  let count = 0
  return new Promise(resolve => {
    program({
      init: ['init'],
      update (msg) {
        return [msg]
      },
      renderer (dispatch, state) {
        count++
        if (state === 'init') {
          return dispatch('next')
        }
        if (state === 'next') {
          return dispatch('done')
        }
        if (state === 'done') {
          resolve()
        }
      }
    })
  }).then(() => t.is(count, 3))
})
