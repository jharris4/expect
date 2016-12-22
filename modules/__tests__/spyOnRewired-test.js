import expect, { spyOnRewired } from '../index'

/*eslint-disable no-unused-vars, import/named */
import { foo, barCalledByFoo, __RewireAPI__ as rewiredModule } from './spyOnRewired-module'
/*eslint-enable no-unused-vars, import/named */

describe('A rewired function that was spied on', () => {
  let spy
  beforeEach(() => {
    spy = spyOnRewired(rewiredModule, 'barCalledByFoo')
    foo('some', 'args')
  })

  it('tracks the number of calls', () => {
    expect(spy.calls.length).toEqual(1)
  })

  it('tracks the context that was used', () => {
    expect(spy.calls[0].context).toBe(undefined)
  })

  it('tracks the arguments that were used', () => {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
  })

  it('was called', () => {
    expect(spy).toHaveBeenCalled()
  })

  it('was called with the correct args', () => {
    expect(spy).toHaveBeenCalledWith('some', 'args')
  })

  it('can be restored', () => {
    expect(rewiredModule.__get__('barCalledByFoo')).toEqual(spy)
    spy.restore()
    expect(rewiredModule.__get__('barCalledByFoo')).toNotEqual(spy)
  })

  after(() => {
    spy.restore()
  })
})

describe('A rewired function that was spied on but not called', () => {
  let spy
  beforeEach(() => {
    spy = spyOnRewired(rewiredModule, 'barCalledByFoo')
  })

  it('number of calls to be zero', () => {
    expect(spy.calls.length).toEqual(0)
  })

  it('was not called', () => {
    expect(spy).toNotHaveBeenCalled()
  })

  after(() => {
    spy.restore()
  })
})
