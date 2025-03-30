// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("MentorMind Reward", "MMR") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply
    }

    mapping(address => uint256) public rewards;

    event RewardIssued(address indexed user, uint256 amount);
    event RewardRedeemed(address indexed user, uint256 amount);

    function issueReward(address _user, uint256 _amount) external onlyOwner {
        _mint(_user, _amount);
        rewards[_user] += _amount;
        emit RewardIssued(_user, _amount);
    }

    function redeemReward(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient reward balance");
        _burn(msg.sender, _amount);
        rewards[msg.sender] -= _amount;
        emit RewardRedeemed(msg.sender, _amount);
    }

    function checkRewardBalance(address _user) external view returns (uint256) {
        return balanceOf(_user);
    }
}
