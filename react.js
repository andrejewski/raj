const React = require('react')

function program ({init, update, view, flags}) {
  return class Program extends React.Component {
    constructor (props) {
      super(props)
      this.state = init(flags, props)
      this._dispatch = this.dispatch.bind(this)
    }

    dispatch (action) {
      this.setState(oldState => {
        const result = update(oldState, action)
        let newState
        let command
        if (!Array.isArray(oldState)) {
          newState = result
        } else {
          newState = result[0]
          command = result[1]
        }

        if (command) {
          setTimeout(() => command(this._dispatch), 0)
        }

        return newState
      })
    }

    render () {
      return view(this.state, this._dispatch)
    }
  }
}

module.exports = {program}
