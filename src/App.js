import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

//IMPORTANT: THIS IS ASSUMING THAT THE USER HAS METAMASK INSTALLED!

class App extends Component {
  state = { //ES6 => this will move the variable directly to the constrcutor method same as constructor(props) { prosp..... state.... }
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); 
    //when working with metamask : dont need to define "from" attribute (default acc already set: 1st account signed into metamask)
    const players = await lottery.methods.getPlayers().call();
    //getPlayers defined on Soilidity contract
    const balance = await web3.eth.getBalance(lottery.options.address);
    //gets balance from the account contract

    this.setState({ manager });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const account = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts [0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div>

        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Try your luck!</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>   
        </form>

        <hr />

        <h4>Ready to spin the numbers?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>

      </div>
    );
  }
}

export default App;
