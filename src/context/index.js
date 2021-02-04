import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";

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

    removePlayerHandler = (id) => {
        let newPlayers = this.state.players;

        newPlayers.splice(id, 1);
        this.setState({
            players: newPlayers
        });
    }

    nextHandler = () => {
        const { players } = this.state;
        if (players.length < 2) {
            toast.error("You need at-least 2 players to move to next stage.", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
            });
        } else {
            this.setState({
                stage: 2,
            }, () => {
                setTimeout(() => {
                    this.getLooserHandler()
                }, 1000);
            })
        }
    }

    getLooserHandler = () => {
        const { players } = this.state;

        this.setState({
            result: players[Math.floor(Math.random() * players.length)]
        })

    }

    resetGameHandler = () => {
        this.setState({
            stage: 1, // Which screen to show. Default is 1
            players: [], // List of players.
            result: ''
        })
    }

    render() {
        return (
            <>
                <ToastContainer/>
                <MyContext.Provider value={{
                    state: this.state,
                    addPlayer: this.addPlayerHandler,
                    removePlayer: this.removePlayerHandler,
                    next: this.nextHandler,
                    getLooser: this.getLooserHandler,
                    resetGame: this.resetGameHandler,
                }}>
                    {this.props.children}
                </MyContext.Provider>
            </>
        )
    }
}

export { MyContext, MyProvider };
