const {program} = require('./runtime')

function reactProgram (Component, createApp) {
  return class ReactProgram extends Component {
    constructor (props) {
      super(props)
      let initial = true
      const {init, update, view} = createApp(props)
      this._view = view
      program({
        init,
        update,
        view: (state, dispatch) => {
          this._dispatch = dispatch
          if (initial) {
            this.state = {state}
            initial = false
          } else {
            this.setState(() => ({state}))
          }
        }
      })
    }

    render () {
      return this._view(this.state.state, this._dispatch)
    }
  }
}

module.exports = {program: reactProgram}
