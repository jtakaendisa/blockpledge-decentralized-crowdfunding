//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockPledge {
    address public owner;
    uint256 public projectTax;
    uint256 public projectCount;
    uint256 public balance;
    StatsStruct public stats;
    ProjectStruct[] projects;

    mapping(address => ProjectStruct[]) projectsOf;
    mapping(uint256 => BackerStruct[]) backersOf;
    mapping(uint256 => bool) public projectExists;

    enum StatusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct StatsStruct {
        uint256 totalProjects;
        uint256 totalBacking;
        uint256 totalDonations;
    }

    struct BackerStruct {
        address backer;
        uint256 contribution;
        uint256 timestamp;
        bool refunded;
    }

    struct ProjectStruct {
        uint256 id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint256 cost;
        uint256 raised;
        uint256 timestamp;
        uint256 expiresAt;
        uint256 backers;
        StatusEnum status;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Access Reserved to Owner");
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor(uint256 _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    function createProject(
        string memory _title,
        string memory _description,
        string memory _imageURL,
        uint256 _cost,
        uint256 _expiresAt
    ) public returns (bool) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_imageURL).length > 0, "ImageURL cannot be empty");
        require(_cost > 0 ether, "Cost cannot be zero");

        ProjectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = _title;
        project.description = _description;
        project.imageURL = _imageURL;
        project.cost = _cost;
        project.timestamp = block.timestamp;
        project.expiresAt = _expiresAt;

        projects.push(project);
        projectExists[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        emit Action(
            projectCount++,
            "PROJECT CREATED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function updateProject(
        uint256 id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 expiresAt
    ) public returns (bool) {
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action(id, "PROJECT UPDATED", msg.sender, block.timestamp);

        return true;
    }

    function deleteProject(uint256 id) public returns (bool) {
        require(
            projects[id].status == StatusEnum.OPEN,
            "Project no longer opened"
        );
        require(msg.sender == projects[id].owner, "Unauthorized Entity");

        projects[id].status = StatusEnum.DELETED;
        performRefund(id);

        emit Action(id, "PROJECT DELETED", msg.sender, block.timestamp);

        return true;
    }

    function payTo(address _recepient, uint256 _amount) internal {
        (bool success, ) = payable(_recepient).call{value: _amount}("");
        require(success);
    }

    function performRefund(uint256 _id) internal {
        // reduce global balance tally
        balance -= projects[_id].raised;

        for (uint256 i = 0; i < backersOf[_id].length; i++) {
            address _backer = backersOf[_id][i].backer;
            uint256 _contribution = backersOf[_id][i].contribution;

            backersOf[_id][i].refunded = true;
            backersOf[_id][i].timestamp = block.timestamp;
            payTo(_backer, _contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function backProject(uint256 _id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExists[_id], "Project not found");
        require(
            projects[_id].status == StatusEnum.OPEN,
            "Project no longer opened"
        );

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[_id].raised += msg.value;
        projects[_id].backers += 1;

        backersOf[_id].push(
            BackerStruct(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(_id, "PROJECT BACKED", msg.sender, block.timestamp);

        if (projects[_id].raised >= projects[_id].cost) {
            projects[_id].status = StatusEnum.APPROVED;
            balance += projects[_id].raised;
            performPayout(_id);
            return true;
        }

        if (block.timestamp >= projects[_id].expiresAt) {
            projects[_id].status = StatusEnum.REVERTED;
            performRefund(_id);
            return true;
        }

        return true;
    }

    function performPayout(uint256 id) internal {
        uint256 raised = projects[id].raised;
        uint256 tax = (raised * projectTax) / 100;

        projects[id].status = StatusEnum.PAIDOUT;

        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);

        emit Action(id, "PROJECT PAID OUT", msg.sender, block.timestamp);
    }

    // This function needs serious revision
    function requestRefund(uint256 id) public returns (bool) {
        require(
            projects[id].status != StatusEnum.REVERTED ||
                projects[id].status != StatusEnum.DELETED,
            "Project already marked as reverted/deleted"
        );

        projects[id].status = StatusEnum.REVERTED;
        performRefund(id);

        return true;
    }

    function payOutProject(uint256 id) public returns (bool) {
        require(
            projects[id].status == StatusEnum.APPROVED,
            "Project not APPROVED"
        );
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized Entity"
        );

        performPayout(id);
        return true;
    }

    function changeTax(uint256 _taxPct) public onlyOwner {
        projectTax = _taxPct;
    }

    function getProject(uint256 id) public view returns (ProjectStruct memory) {
        require(projectExists[id], "Project not found");

        return projects[id];
    }

    function getProjects() public view returns (ProjectStruct[] memory) {
        return projects;
    }

    function getBackers(uint256 id)
        public
        view
        returns (BackerStruct[] memory)
    {
        return backersOf[id];
    }
}
