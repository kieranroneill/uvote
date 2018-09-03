pragma solidity ^0.4.23;

contract Ballot {
    event AddedCandidate(uint candidateId);

    struct Voter {
        bytes32 uid;
        uint candidateId;
    }
    struct Candidate {
        bytes32 name;
        bytes32 party;
        bool doesExist;
    }

    uint numCandidates;
    uint numVoters;

    mapping (uint => Candidate) candidates;
    mapping (uint => Voter) voters;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function addCandidate(bytes32 name, bytes32 party) public {
        uint candidateId = numCandidates++;

        candidates[candidateId] = Candidate(name, party, true);

        // Fire an event.
        AddedCandidate(candidateId);
    }

    function vote(bytes32 uid, uint candidateId) public {
        // checks if the struct exists for that candidate
        if (candidates[candidateId].doesExist == true) {
            uint voterId = numVoters++;

            voters[voterId] = Voter(uid, candidateId);
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * *
     *  Getter Functions, marked by the key word "view" *
     * * * * * * * * * * * * * * * * * * * * * * * * * */

    function votesByCandidate(uint candidateId) view public returns (uint) {
        uint numOfVotes = 0;

        for (uint i = 0; i < numVoters; i++) {
            if (voters[i].candidateId == candidateId) {
                numOfVotes++;
            }
        }

        return numOfVotes;
    }

    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }

    function getCandidate(uint candidateId) public view returns (uint, bytes32, bytes32) {
        return (candidateId, candidates[candidateId].name, candidates[candidateId].party);
    }
}
