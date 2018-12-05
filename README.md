![logo](https://i.ibb.co/8MmP9pp/react-pusher-hoc-logo.png)

[![npm version](https://badge.fury.io/js/react-pusher-hoc.svg)](https://badge.fury.io/js/react-pusher-hoc)
[![Build Status](https://travis-ci.org/fel1xw/react-pusher-hoc.svg?branch=master)](https://travis-ci.org/fel1xw/react-pusher-hoc)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/react-pusher-hoc)
[![Coverage Status](https://coveralls.io/repos/github/fel1xw/react-pusher-hoc/badge.svg?branch=master)](https://coveralls.io/github/fel1xw/react-pusher-hoc?branch=master)
[![Dependencies](https://david-dm.org/fel1xw/react-pusher-hoc.svg)](https://david-dm.org/fel1xw/react-pusher-hoc.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![gzip size](http://img.badgesize.io/https://unpkg.com/react-pusher-hoc@latest/dist/index.js?compression=gzip)](https://unpkg.com/react-pusher-hoc@latest/dist/index.js)

## Install
```sh
npm install react-pusher-hoc --save
# or
yarn add react-pusher-hoc
```

## Usage
1. To use react-pusher, you need to pass the [pusher](https://github.com/pusher/pusher-js) instance to the `PusherProvider` as following:
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

2. Then you can wrap your component with the HOC (where `itemChannel` is the channel name and `add` is the event name delimited by `.`):

```js
import withPusher from 'react-pusher-hoc';

const ItemList = ({ items }) => (
  <ul>
    {items.map(item => <span key={item}>{item}</span>)}
  </ul>
);

const mapEventsToProps = {
  mapPropsToValues: props => ({
    items: [],
  }),
  events: {
    'itemChannel.add': (item, state, props) => ({
      items: state.items.concat(item),
    }),
  }
};

export default withPusher(mapEventsToProps)(ItemList);
```

You need to provide initialValues through the `mapPropsToValues` function.

## Author

* Felix Wostal [@felixwostal](https://twitter.com/felixwostal)
