import React from 'react';

export const AppContext = React.createContext();

export default class ContextProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            ipAddress: null,
            name: null,
            scores: []
        }
    }
    updateState = ( key , val ) => {
        this.setState({ [key] : val })
    }
    clearState = () => {
        this.setState({
            ipAddress: null,
            name: null,
            scores: []
        })
    }
    render() {
        return (
          <AppContext.Provider
            value={{
              ...this.state,
              updateState: this.updateState,
              clearState: this.clearState
            }}
          >
            {this.props.children}
          </AppContext.Provider>
        );
    }
}