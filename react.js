function program (React, {init, update, view, flags}) {
  return class Program extends React.Component {
    constructor (props) {
      super(props)
      this._dispatch = this.dispatch.bind(this)
      const [state, effect] = init(flags, props)
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
        const [state, effect] = update(message, oldState)
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
