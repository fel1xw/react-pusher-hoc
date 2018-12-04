import React from 'react'
import { shallow } from 'enzyme'

import Headline from '../lib'

describe('<Headline />', () => {
  it('renders', () => {
    const wrapper = shallow(<Headline text="hello" />)
    expect(wrapper.text()).toBe("hello")
  })
})
