function map (fn, effect) {
  if (!effect) {
    return effect
  }

  return function _map (dispatch, io) {
    function intercept (message) {
      dispatch(fn(message))
    }

    return effect(intercept, io)
  }
}

function batch (effects) {
  return function _batch (dispatch, ios = []) {
    return effects.map((effect, index) => {
      if (effect) {
        return effect(dispatch, ios[index])
      }
    })
  }
}

module.exports = {
  map,
  batch
}
