exports.program = function (program) {
  var update = program.update
  var view = program.view
  var done = program.done
  var state
  var isRunning = true

  function dispatch (message) {
    if (isRunning) {
      change(update(message, state))
    }
  }

  function change (change) {
    state = change[0]
    var effect = change[1]
    if (effect) {
      effect(dispatch)
    }
    view(state, dispatch)
  }

  change(program.init)

  return function kill () {
    if (!isRunning) {
      return
    }
    isRunning = false
    if (done) {
      done(state)
    }
  }
}
