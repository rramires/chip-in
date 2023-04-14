// SPDX-License-Identifier: MIT

// solidity version
pragma solidity ^0.8.17;

// Campaign 
struct Campaign {
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}
 
// contract
contract DonateCrypto{

    // define app tax in Wei
    uint256 public fee = 100; 
    // index used in mapping
    uint256 public nextId = 0;

    /*
     Mapping is a typed data structure similar to array
      - this data is persistent since it was not specified as memory
      -- persistent data pay fees
    */
    mapping(uint256 => Campaign) public campaigns; // id => campaign

    /*
     Create a new Campaign
    */
    function addCampaign(string calldata title, string calldata description, string calldata videoUrl, string calldata imageUrl) public {
        /* 
         Remember
          - use memory to not persist
          - calldata = memory read only
          - msg = caller infos eg: msg.sender
        */
        
        // create new  Campaign 
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        newCampaign.author = msg.sender; // The author of the campaign is the wallet of the caller of this function
        // increment id
        nextId++;
        // add campaign on mapping
        campaigns[nextId] = newCampaign;
    }


    /*
     Donate to Campaign
    */
    function donate(uint256 id) public payable {
        /* 
         Remember
          - uint256 does not need to have memory or calldata
        */
        // validate(condition, "Output Message")
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaigns[id].active == true, "Cannot donate to this campaign");
        // increment balance
        campaigns[id].balance += msg.value;
    }


    /*
     Withdraw the entire balance and close the campaign
    */
    function withdraw(uint256 id) public {
        // get campaign
        Campaign memory campaign = campaigns[id];
        // validate
        require(campaign.author == msg.sender, "You do not have permission");
        require(campaign.active == true, "This campaign is closed");
        require(campaign.balance > fee, "This campaign does not have enough balance");
        // get author address to receive
        address payable recipient = payable(campaign.author);
        // pays the balance to the author, discounting the system fee
        (bool success, ) = recipient.call{value: campaign.balance - fee}("");
        // validate
        require(success, "Failed to send value");
        // desactivate campaign
        campaigns[id].active = false;
    }
}

