import React from 'react'
import { mount } from 'enzyme'

import withPusher, { PusherProvider } from '../lib'

export const withContext = (Comp: any, context: any) => (
  <PusherProvider value={context}>
    <Comp />
  </PusherProvider>
)

const SomeList = ({ items }: { items: string[] }) => (
  <ul>
    {items.map(item => <span key={item}>{item}</span>)}
  </ul>
);

describe('<Headline />', () => {
  it('registers to channel|event', () => {
    const mockEventFn = jest.fn((item: string, state: { items: string[] }) => ({
      items: state.items.concat(item),
    }))
    const bindMock = {
      bind: jest.fn(),
    }
    const unbindMock = {
      unbind: jest.fn(),
    }
    const contextMock = {
      subscribe: jest.fn(() => bindMock),
      channel: jest.fn(() => unbindMock),
    }
    const mapEventsToProps = {
      mapPropsToValues: () => ({
        items: ['buy milk'],
      }),
      events: {
        'itemChannel.add': mockEventFn,
      }
    };
    const Wrapped = () => withContext(withPusher(mapEventsToProps)(SomeList), contextMock)
    const wrapper = mount(<Wrapped />)
    expect(wrapper.html().includes("buy milk")).toBe(true)
    expect(contextMock.subscribe).toHaveBeenCalledWith('itemChannel')
    const [ eventName ] = bindMock.bind.mock.calls[0]
    expect(eventName).toBe('add')

    wrapper.unmount()

    expect(contextMock.channel).toHaveBeenCalledWith('itemChannel')
    const [unbindEventName] = bindMock.bind.mock.calls[0]
    expect(unbindEventName).toBe('add')
  })
})
