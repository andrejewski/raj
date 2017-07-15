function map (fn, effect) {
  if (!effect) {
    return effect
  }

  return function _map (dispatch) {
    function intercept (message) {
      dispatch(fn(message))
    }

    return effect(intercept)
  }
}

function batch (effects) {
  return function _batch (dispatch) {
    return effects.map(effect => {
      if (effect) {
        return effect(dispatch)
      }
    })
  }
}

module.exports = {
  map,
  batch
}
