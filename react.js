function marshal (result) {
  if (Array.isArray(result)) {
    return result
  } else {
    return [result]
  }
}

function program (React, {init, update, view, flags}) {
  return class Program extends React.Component {
    constructor (props) {
      super(props)
      this._dispatch = this.dispatch.bind(this)
      const [state, effect] = marshal(init(flags, props))
      this.state = state
      if (effect) {
        this.command(effect)
      }
    }

    command (effect) {
      setTimeout(() => effect(this._dispatch), 0)
    }

    dispatch (message) {
      this.setState(oldState => {
        const [state, effect] = marshal(update(message, oldState))
        if (effect) {
          this.command(effect)
        }
        return state
      })
    }

    render () {
      return view(this.state, this._dispatch)
    }
  }
}

module.exports = {program}
