function program ({init, update, view}) {
  let state

  function change ([newState, effect]) {
    state = newState
    if (effect) {
      setTimeout(() => effect(dispatch), 0)
    }
    view(state, dispatch)
  }

  function dispatch (message) {
    change(update(message, state))
  }

  change(init)
}

module.exports = {program}
