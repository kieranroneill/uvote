import * as React from 'react';
import contract from 'truffle-contract';

class App extends React.PureComponent {
    private readonly BallotContract: contract.TruffleContract<{}>;

    constructor(props: {}) {
        super(props);

        this.BallotContract = contract(require('../build/contracts/Ballot.json'));

        this.initialiseBallotContract(window.web3.eth.accounts[0]);
    }

    componentDidMount(): void {

    }

    initialiseBallotContract(address: string): void {
        this.BallotContract.setProvider(window.web3.currentProvider);
        this.BallotContract.defaults({
            from: address,
            gas: 6721975
        });
    }

    render(): React.ReactNode {
        return (
            <h1>Hello human!</h1>
        );
    }
}

export { App };
