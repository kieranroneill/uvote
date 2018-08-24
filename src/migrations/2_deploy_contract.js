const path = require('path');

const Ballot = artifacts.require(path.join(__dirname, '..', 'contracts', 'Ballot.sol'));

module.exports = function(deployer) {
    deployer.deploy(Ballot);
};
