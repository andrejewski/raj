const {program} = require('./runtime')

function reactProgram (Component, {init, update, view}) {
  return class ReactProgram extends Component {
    constructor (props) {
      super(props)
      let initial = true
      program({
        init: init(props),
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
      return view(this.state.state, this._dispatch)
    }
  }
}

module.exports = {program: reactProgram}
