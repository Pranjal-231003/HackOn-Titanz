//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

contract UserRegistration {
    struct User {
        address userAddress;
        string username;
        string email;
    }

    mapping(address => User) public users;

    event UserRegistered(address userAddress, string username, string email);

    function registerUser(string memory _username, string memory _email) public {
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_email).length > 0, "Email is required");

        users[msg.sender] = User(msg.sender, _username, _email);

        emit UserRegistered(msg.sender, _username, _email);
    }

    function getUser(address _userAddress) public view returns (User memory) {
        require(bytes(users[_userAddress].username).length > 0, "User has not been registered");

        return users[_userAddress];
    }
}