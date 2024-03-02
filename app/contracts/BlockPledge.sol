// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title BlockPledge
 * @dev A smart contract for crowdfunding projects on the Ethereum blockchain.
 */
contract BlockPledge {
    // State variables
    address public owner;
    uint256 public projectTax;
    uint256 public projectCount;
    StatsStruct public stats;
    ProjectStruct[] public projects;

    // Mappings
    mapping(address => ProjectStruct[]) public projectsOf;
    mapping(uint256 => BackerStruct[]) public backersOf;
    mapping(uint256 => bool) public projectExists;

    // Enum defining project status
    enum StatusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    // Structs
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

    // Modifier to restrict access to contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Access Reserved to Owner");
        _;
    }

    // Events
    event ProjectCreated(
        uint256 id,
        address owner,
        string title,
        uint256 timestamp
    );
    event ProjectUpdated(uint256 id, string title, uint256 timestamp);
    event ProjectDeleted(uint256 id, uint256 timestamp);
    event ProjectBacked(uint256 id, address backer, uint256 timestamp);
    event ProjectPaidOut(
        uint256 id,
        address recipient,
        uint256 amount,
        uint256 timestamp
    );

    // Constructor
    constructor(uint256 _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    /**
     * @dev Creates a new project.
     * @param _title Title of the project.
     * @param _description Description of the project.
     * @param _imageURL URL of the project's image.
     * @param _cost Cost of the project.
     * @param _expiresAt Expiration timestamp of the project.
     * @return bool Success status.
     */
    function createProject(
        string memory _title,
        string memory _description,
        string memory _imageURL,
        uint256 _cost,
        uint256 _expiresAt
    ) public returns (bool) {
        // Input validations
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_imageURL).length > 0, "ImageURL cannot be empty");
        require(_cost > 0 ether, "Cost cannot be zero");

        // Create a new project
        ProjectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = _title;
        project.description = _description;
        project.imageURL = _imageURL;
        project.cost = _cost;
        project.timestamp = block.timestamp;
        project.expiresAt = _expiresAt;

        // Update state variables and mappings
        projects.push(project);
        projectExists[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        // Emit event
        emit ProjectCreated(projectCount, msg.sender, _title, block.timestamp);
        projectCount++;
        return true;
    }

    /**
     * @dev Updates an existing project.
     * @param _id ID of the project to be updated.
     * @param _title New title for the project.
     * @param _description New description for the project.
     * @param _imageURL New imageURL for the project.
     * @param _expiresAt New expiration timestamp for the project.
     * @return bool Success status.
     */
    function updateProject(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _imageURL,
        uint256 _expiresAt
    ) public returns (bool) {
        require(msg.sender == projects[_id].owner, "Unauthorized Entity");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_imageURL).length > 0, "ImageURL cannot be empty");

        projects[_id].title = _title;
        projects[_id].description = _description;
        projects[_id].imageURL = _imageURL;
        projects[_id].expiresAt = _expiresAt;

        emit ProjectUpdated(_id, _title, block.timestamp);

        return true;
    }

    /**
     * @dev Deletes an existing project.
     * @param _id ID of the project to be deleted.
     * @return bool Success status.
     */
    function deleteProject(uint256 _id) public returns (bool) {
        require(
            projects[_id].status == StatusEnum.OPEN,
            "Project no longer opened"
        );
        require(msg.sender == projects[_id].owner, "Unauthorized Entity");

        projects[_id].status = StatusEnum.DELETED;
        performRefund(_id);

        emit ProjectDeleted(_id, block.timestamp);

        return true;
    }

    /**
     * @dev Performs a payment to the specified recipient.
     * @param _recipient Address of the recipient.
     * @param _amount Amount to be paid.
     */
    function payTo(address _recipient, uint256 _amount) private {
        (bool success, ) = payable(_recipient).call{value: _amount}("");
        require(success, "Payment failed");
    }

    /**
     * @dev Performs refund for a project.
     * @param _id ID of the project.
     */
    function performRefund(uint256 _id) internal {
        for (uint256 i = 0; i < backersOf[_id].length; i++) {
            address backer = backersOf[_id][i].backer;
            uint256 contribution = backersOf[_id][i].contribution;

            backersOf[_id][i].refunded = true;
            backersOf[_id][i].timestamp = block.timestamp;
            payTo(backer, contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= contribution;
        }
    }

    /**
     * @dev Backs a project by providing a contribution.
     * @param _id ID of the project to be backed.
     * @return bool Success status.
     */
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

        emit ProjectBacked(_id, msg.sender, block.timestamp);

        if (projects[_id].raised >= projects[_id].cost) {
            projects[_id].status = StatusEnum.APPROVED;
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

    /**
     * @dev Performs payout for a project.
     * @param _id ID of the project.
     */
    function performPayout(uint256 _id) internal {
        uint256 raised = projects[_id].raised;
        uint256 tax = (raised * projectTax) / 100;

        projects[_id].status = StatusEnum.PAIDOUT;

        payTo(projects[_id].owner, (raised - tax));
        payTo(owner, tax);

        emit ProjectPaidOut(
            _id,
            projects[_id].owner,
            (raised - tax),
            block.timestamp
        );
    }

    /**
     * @dev Requests refund for a project.
     * @param _id ID of the project.
     * @return bool Success status.
     */
    function requestRefund(uint256 _id) public returns (bool) {
        require(
            projects[_id].status != StatusEnum.REVERTED &&
                projects[_id].status != StatusEnum.DELETED,
            "Project already marked as reverted/deleted"
        );

        projects[_id].status = StatusEnum.REVERTED;
        performRefund(_id);

        return true;
    }

    /**
     * @dev Pays out a project to its owner.
     * @param _id ID of the project.
     * @return bool Success status.
     */
    function payOutProject(uint256 _id) public returns (bool) {
        require(
            projects[_id].status == StatusEnum.APPROVED,
            "Project not APPROVED"
        );
        require(
            msg.sender == projects[_id].owner || msg.sender == owner,
            "Unauthorized Entity"
        );

        performPayout(_id);
        return true;
    }

    /**
     * @dev Changes the project tax percentage.
     * @param _taxPct New tax percentage.
     */
    function changeTax(uint256 _taxPct) public onlyOwner {
        projectTax = _taxPct;
    }

    /**
     * @dev Retrieves details of a project.
     * @param _id ID of the project.
     * @return ProjectStruct Project details.
     */
    function getProject(
        uint256 _id
    ) public view returns (ProjectStruct memory) {
        require(projectExists[_id], "Project not found");
        return projects[_id];
    }

    /**
     * @dev Retrieves all projects.
     * @return ProjectStruct[] Array of projects.
     */
    function getProjects() public view returns (ProjectStruct[] memory) {
        return projects;
    }

    /**
     * @dev Retrieves backers of a project.
     * @param _id ID of the project.
     * @return BackerStruct[] Array of backers.
     */
    function getBackers(
        uint256 _id
    ) public view returns (BackerStruct[] memory) {
        return backersOf[_id];
    }
}
