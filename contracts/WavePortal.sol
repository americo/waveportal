// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] persons;
    mapping(address => uint256) totalWavesByAddress;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        totalWavesByAddress[msg.sender] += 1;
        uint256 existPerson;
        for (uint256 counter = 0; counter < persons.length; counter++) {
            if (persons[counter] == msg.sender) {
                existPerson = 1;
            }
        }

        if (existPerson != 1) {
            persons.push(msg.sender);
        }

        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getPersonWavedMost() public view returns (address) {
        uint256 max = 0;
        address maxAddress;
        for (uint256 counter; counter < persons.length; counter++) {
            address person = persons[counter];
            if (totalWavesByAddress[person] > max) {
                max = totalWavesByAddress[person];
                maxAddress = person;
            }
        }
        console.log("%s has waved most times! (%d)", maxAddress, max);
        return maxAddress;
    }
}