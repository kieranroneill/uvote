import { join } from 'path';

const Migrations = artifacts.require(join(__dirname, '..', 'contracts', 'Migrations.sol'));

module.exports = deployer => deployer.deploy(Migrations);
