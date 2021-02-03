import React, {Component} from "react";

const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        stage: 1, // Which screen to show. Default is 1
        players: [], // List of players.
        result: '' // Who lose.
    }

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export {MyContext, MyProvider};
