import React, { Component } from 'react'

export interface IProps {
  text: string
}

export default class Headline extends Component<IProps> {
  public render() {
    const { text } = this.props

    return (
      <h2>{text}</h2>
    )
  }
}
