function createMessage (displayName) {
  function Message (...args) {
    if (!(this instanceof Message)) {
      return new Message(...args)
    }

    this.args = arguments
  }

  Message.is = function is (x) {
    return x instanceof Message
  }

  Message.unwrap = function unwrap (message, fn) {
    return fn.apply(null, message.args)
  }

  if (typeof displayName === 'string') {
    Message.name = displayName
    Message.displayName = displayName
  }

  return Message
}

function createMessageUnion (displayName, types) {
  if (Array.isArray(displayName)) {
    return createMessageUnion(null, displayName)
  }

  function UnionMessage () {
    throw new Error('Union messages cannot be created directly')
  }

  UnionMessage.is = function is (type) {
    return unionIs(types, type)
  }

  UnionMessage.unwrap = function unwrap (type, fn) {
    return fn(type)
  }

  UnionMessage.match = function match (type, cases) {
    return unionMatch(types, cases, type)
  }

  return UnionMessage
}

function unionMatch (types, cases, type) {
  const fullCases = Math.floor(cases.length / 2)
  const hasCatchAll = cases.length % 2 === 1
  if (!hasCatchAll) {
    // assert all message types are accounted for in the cases
  }

  for (let i = 0; i < fullCases; i++) {
    const Type = cases[2 * i]
    if (Type.is(type)) {
      const fn = cases[(2 * i) + 1]
      return Type.unwrap(type, fn)
    }
  }

  if (!hasCatchAll) {
    // assert message type not found in match
  }
  return cases[cases.length - 1]()
}

function unionIs (types, type) {
  return types.some(Type => Type.is(type))
}

createMessage.union = createMessageUnion
module.exports = createMessage
