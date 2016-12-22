export function barCalledByFoo(a, b) { // eslint-disable-line no-unused-vars
  return "bar"
}

export function foo(a, b) {
  return "foo" + barCalledByFoo(a, b)
}