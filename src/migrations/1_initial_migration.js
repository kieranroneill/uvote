const path = require('path');

const Migrations = artifacts.require(path.join(__dirname, '..', 'contracts', 'Migrations.sol'));

module.exports = function(deployer) {
    deployer.deploy(Migrations);
};
