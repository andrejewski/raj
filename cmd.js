/* global fetch:false */

/*

    This module provide a default set of effects that can be used
    in a raj program, Elm-style
*/

const none = function () {
  return function (dispatch) {
    // does nothing;
  }
}

// A command that dispaches messages on demand
const ofMsg = function (msg) {
  return function (dispatch) {
    dispatch(msg)
  }
}

// props : { value: Promise<'T>, success: 'T -> Msg, error: exception -> Msg }
const promise = function (props) {
  return function (dispatch) {
    props.value
      .then(result => dispatch(props.success(result)))
      .catch(ex => dispatch(props.error(ex)))
  }
}

// props : { url: string, success: obj -> Msg, error: exception -> Msg }
const fetchJson = function (props) {
  return promise({
    value: fetch(props.url).then(response => response.json()),
    success: props.success,
    error: props.error
  })
}

// props : { url: string, data: any success: obj -> Msg, error: exception -> Msg }
const postJson = function (props) {
  return promise({
    value: fetch(props.url, { method: 'POST', body: JSON.stringify(props.data) }).then(response => response.json()),
    success: props.success,
    error: props.error
  })
}

const timeout = function (timeInMilliseconds, msg) {
  return function (dispatch) {
    setTimeout(() => dispatch(msg), timeInMilliseconds)
  }
}

module.exports = {
  none,
  ofMsg,
  promise,
  fetchJson,
  postJson,
  timeout
}
