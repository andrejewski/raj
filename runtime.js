function program ({init, update, renderer}) {
  let state

  function change ([newState, effect]) {
    state = newState
    if (effect) {
      setTimeout(() => effect(dispatch), 0)
    }
    renderer(dispatch, state)
  }

  function dispatch (message) {
    change(update(message, state))
  }

  change(init)
}

module.exports = {program}
