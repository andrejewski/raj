import test from 'ava'
import {program} from '../runtime'

test('program() should call view() initially', t => {
  const initialState = 1
  return new Promise(resolve => {
    program({
      init: [initialState],
      view (state) {
        t.is(state, initialState)
        resolve()
      }
    })
  })
})

test('program() should call view() after dispatch', t => {
  let count = 0
  return new Promise(resolve => {
    program({
      init: ['init'],
      update (msg) {
        return [msg]
      },
      view (state, dispatch) {
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
