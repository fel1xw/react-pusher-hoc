# React Pusher HOC

[![Build Status](https://travis-ci.org/fel1xw/react-pusher-hoc.svg?branch=master)](https://travis-ci.org/fel1xw/react-pusher-hoc)
[![Coverage Status](https://coveralls.io/repos/github/fel1xw/react-pusher-hoc/badge.svg?branch=master)](https://coveralls.io/github/fel1xw/react-pusher-hoc?branch=master)

## Install

npm: `npm install react-pusher-hoc`
yarn: `yarn add react-pusher-hoc`

## Usage

1. To use react-pusher, you need to pass the pusher instance to the `PusherProvider` as following:
  ```js
  import { PusherProvider } from 'react-pusher-hoc';
  import Pusher from 'pusher-js';

  const pusherClient = new Pusher({
    <your_config>...
  });

  <PusherProvider value={pusherClient}>
    <App />
  </PusherProvider>
  ```

2. Then you can simply use the provided HOC as follows:

```js
import withPusher from 'react-pusher-hoc';

const SomeList = ({ items }) => (
  <ul>
    {items.map((item) => {<span>{item}</span>})}
  </ul>
);

const mapEventsToProps = {
  mapPropsToValues: () => ({
    items: [],
  }),
  events: {
    'itemChannel.add': (item, state) => ({
      items: state.items.concat(item),
    }),
  }
};

export default withPusher(mapEventsToProps)(SomeList);
```
