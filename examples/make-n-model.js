import React from 'react'
import react from 'raj/react'
import tag from 'tagmeme'

export const init = [{
  makeId: null,
  isLoading: false,
  models: []
}]

export const SetMake = tag()
export const ReceiveModels = tag()
export const Msg = tag.union([
  SetMake,
  ReceiveModels
])

export function update (msg, state) {
  return Msg.match(msg, [
    SetMake, id => {
      return [
        {...state, makeId: id, isLoading: true},
        loadModelsForMake(id, ReceiveModels)
      ]
    },
    ReceiveModels, models => [{
      ...state,
      models,
      isLoading: false
    }]
  ])
}

export function loadModelsForMake (id, tag) {
  return function (dispatch) {
    window.fetch(`/models?id=${id}`)
      .then(res => res.json())
      .then(res => {
        dispatch(tag(res.models))
      })
  }
}

export function view (state, dispatch) {
  const makes = ['ford', 'honda', 'windows']
  return <div>
    <ul>
      {makes.map(make =>
        <li onClick={() => dispatch(SetMake(make))}>{make}</li>
      )}
    </ul>
    state.isLoading && <p>Loading models...</p>
    <ul>
      {state.models.map(model => <li>{model.name}</li>)}
    </ul>
  </div>
}

export default function main () {
  return react.program(React.Component, () => ({
    init,
    update,
    view
  }))
}
