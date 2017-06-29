function assert (condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

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
    assert(Message.is(message), 'Cannot unwrap messages using an incorrect type')
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
  const hasCatchAll = cases.length % 2 === 1
  let fullCases = cases.length
  if (hasCatchAll) {
    fullCases = fullCases - 1
  }
  fullCases = fullCases / 2

  if (!hasCatchAll) {
    const typeCases = []
    const caseTypes = cases.filter(function even (_, i) {
      return (i % 2) === 0
    })
    caseTypes.forEach(function (type) {
      const isTypeCovered = typeCases.includes(type)
      assert(!isTypeCovered, 'Each message can only be covered by one case')
      typeCases.push(type)
    })
    assert(types.length === caseTypes.length, 'Each message should have exactly one case')
    assert(typeCases.length === caseTypes.length, 'Each message needs to be handled')
  }

  for (let i = 0; i < fullCases; i++) {
    const Type = cases[2 * i]
    if (Type.is(type)) {
      const fn = cases[(2 * i) + 1]
      return Type.unwrap(type, fn)
    }
  }

  assert(hasCatchAll, 'No type was found that matches the passed value')
  return cases[cases.length - 1]()
}

function unionIs (types, type) {
  return types.some(Type => Type.is(type))
}

createMessage.union = createMessageUnion
module.exports = createMessage
