function program ({init, update, view, done}) {
  let state
  let isRunning = true

  function dispatch (message) {
    if (isRunning) {
      change(update(message, state))
    }
  }

  function change ([newState, effect]) {
    state = newState
    if (effect) {
      setTimeout(() => effect(dispatch), 0)
    }
    view(state, dispatch)
  }

  change(init)

  return function kill () {
    if (!isRunning) {
      return
    }
    isRunning = false
    if (done) {
      const effect = done(state)
      if (effect) {
        setTimeout(() => effect(), 0)
      }
    }
  }
}

module.exports = {program}
