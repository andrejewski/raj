const program = require('./program')

function reactProgram (React, {init, update, view}) {
  return class ReactProgram extends React.Component {
    constructor (props) {
      super(props)
      this._program = program({
        init: init(props),
        update,
        renderer: (dispatch, state) => {
          this._dispatch = dispatch
          this.setState(() => state)
        }
      })
    }

    render () {
      return view(this.state, this._dispatch)
    }
  }
}

module.exports = {program: reactProgram}
