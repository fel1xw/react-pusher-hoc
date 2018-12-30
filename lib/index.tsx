import * as React from 'react'

const PusherContext = React.createContext({})

export const PusherProvider = PusherContext.Provider

interface WithPusherState {
  values: any
}

interface FunctionsMap { [s: string]: (event: any, state: any, props: any) => Object }

interface IncomingProps {
  mapPropsToValues: (props: any) => Object,
  events: FunctionsMap,
}

const parseEventKey = (eventKey: string) => eventKey.split('.')

const withPusher = (config: IncomingProps) => <P extends object>(WrappedComponent: React.ComponentType<P>): React.ComponentType => {
  return class WithPusher extends React.Component<P, WithPusherState> {
    static contextType = PusherContext

    constructor(props: any) {
      super(props)

      const values = config.mapPropsToValues(this.props)

      this.state = {
        values,
      }
    }

    componentDidMount() {
      const { events: fns } = config

      Object.entries(fns).forEach(([eventKey, fn]) => {
        const [channelName, eventName] = parseEventKey(eventKey)

        this.context
          .subscribe(channelName)
          .bind(eventName, (event: any) => {
            this.setState(prevState => ({
              ...prevState,
              values: {
                ...prevState.values,
                ...fn(event, this.state.values, this.props),
              },
            }))
          })
      })
    }

    componentWillUnmount() {
      const { events: fns } = config

      Object.entries(fns).forEach(([eventKey]) => {
        const [channelName, eventName] = parseEventKey(eventKey)

        this.context
          .channel(channelName)
          .unbind(eventName)
      })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state.values} />
    }
  }
};

export default withPusher
