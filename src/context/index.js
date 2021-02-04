import React, {Component} from "react";

const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        stage: 1, // Which screen to show. Default is 1
        players: [], // List of players.
        result: '' // Who lose.
    }

    addPlayerHandler = (name) => {
        this.setState((prevState) => ({
            players: [
                ...prevState.players,
                name
            ]
        }));
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                addPlayer: this.addPlayerHandler
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export {MyContext, MyProvider};
