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
    CategoryStruct[] public categories;

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
        PAIDOUT,
        PENDING_APPROVAL
    }

    // Structs
    struct StatsStruct {
        uint256 totalProjects;
        uint256 totalBackings;
        uint256 totalDonations;
    }

    struct CategoryStruct {
        uint256 id;
        string name;
    }

    struct BackerStruct {
        uint256 id;
        address backer;
        uint256 contribution;
        uint256 timestamp;
        string comment;
        bool refunded;
    }

    struct ProjectStruct {
        uint256 id;
        address owner;
        string title;
        string description;
        string[] imageUrls; // Changed to string array
        uint256 cost;
        uint256 raised;
        uint256 createdAt;
        uint256 expiresAt;
        uint256 backers;
        uint256 categoryId;
        StatusEnum status;
        string deletionReason; // Added a deletion reason property
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
        string description,
        string[] imageUrls,
        uint256 categoryId,
        uint256 cost,
        uint256 raised,
        uint256 createdAt,
        uint256 expiresAt,
        uint256 backers,
        StatusEnum status
    );

    event ProjectUpdated(
        uint256 id,
        string description,
        string[] imageUrls,
        uint256 timestamp
    );
    event ProjectDeleted(uint256 id, uint256 timestamp);
    event ProjectBacked(
        uint256 projectId,
        uint256 contributionId,
        address backer,
        uint256 raised,
        uint256 contribution,
        uint256 totalBackings,
        uint256 totalDonations,
        string comment,
        uint256 timestamp,
        bool refunded
    );
    event ProjectPaidOut(
        uint256 id,
        string title,
        address recipient,
        uint256 amount,
        uint256 timestamp
    );
    event ProjectApproved(uint256 id, uint256 timestamp);
    event ProjectRejected(uint256 id, uint256 timestamp);

    // Constructor
    constructor(uint256 _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;

        /**
         * @dev Populates the categories array upon contract deployment.
         */
        string[] memory categoryNames = new string[](12); // Define dynamic array

        categoryNames[0] = "Art & Creativity";
        categoryNames[1] = "Technology & Innovation";
        categoryNames[2] = "Community & Social Impact";
        categoryNames[3] = "Fashion & Design";
        categoryNames[4] = "Food & Beverage";
        categoryNames[5] = "Gaming & Entertainment";
        categoryNames[6] = "Travel & Exploration";
        categoryNames[7] = "Education & Learning";
        categoryNames[8] = "Health & Fitness";
        categoryNames[9] = "Crafts & DIY";
        categoryNames[10] = "Finance & Investment";
        categoryNames[11] = "Pets & Animals";

        for (uint256 i = 0; i < categoryNames.length; i++) {
            categories.push(CategoryStruct(i, categoryNames[i]));
        }
    }

    /**
     * @dev Creates a new project.
     * @param _title Title of the project.
     * @param _description Description of the project.
     * @param _imageUrls Urls of the project's images.
     * @param _category Category of the project.
     * @param _cost Cost of the project.
     * @param _expiresAt Expiration timestamp of the project.
     * @return bool Success status.
     */
    function createProject(
        string memory _title,
        string memory _description,
        string[] memory _imageUrls, // Changed to string array
        uint256 _category,
        uint256 _cost,
        uint256 _expiresAt
    ) public returns (bool) {
        // Input validations
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_imageUrls.length > 0, "ImageUrls cannot be empty"); // Ensure imageUrls array is not empty
        require(_cost > 0 ether, "Cost cannot be zero");
        require(_category < categories.length, "Invalid category ID");

        // Create a new project
        ProjectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = _title;
        project.description = _description;
        project.imageUrls = _imageUrls;
        project.categoryId = _category;
        project.cost = _cost;
        project.createdAt = block.timestamp;
        project.expiresAt = _expiresAt;
        project.status = StatusEnum.PENDING_APPROVAL;

        // Update state variables and mappings
        projects.push(project);
        projectExists[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        // Emit event
        emit ProjectCreated(
            project.id,
            project.owner,
            project.title,
            project.description,
            project.imageUrls,
            project.categoryId,
            project.cost,
            project.raised,
            project.createdAt,
            project.expiresAt,
            project.backers,
            project.status
        );
        projectCount++;
        return true;
    }

    /**
     * @dev Updates an existing project.
     * @param _id ID of the project to be updated.
     * @param _description New description for the project.
     * @param _imageUrls New imageUrls for the project.
     * @return bool Success status.
     */
    function updateProject(
        uint256 _id,
        string memory _description,
        string[] memory _imageUrls // Changed to string array
    ) public returns (bool) {
        require(msg.sender == projects[_id].owner, "Unauthorized Entity");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_imageUrls.length > 0, "ImageUrls cannot be empty");

        projects[_id].description = _description;
        projects[_id].imageUrls = _imageUrls;

        emit ProjectUpdated(
            _id,
            projects[_id].description,
            projects[_id].imageUrls,
            block.timestamp
        );

        return true;
    }

    /**
     * @dev Deletes an existing project.
     * @param _id ID of the project to be deleted.
     * @param _reason Reason for project deletion.
     * @return bool Success status.
     */
    function deleteProject(
        uint256 _id,
        string memory _reason
    ) public returns (bool) {
        require(
            projects[_id].status == StatusEnum.OPEN,
            "Project no longer opened"
        );
        require(msg.sender == projects[_id].owner, "Unauthorized Entity");

        projects[_id].status = StatusEnum.DELETED;
        projects[_id].deletionReason = _reason;

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
     * @dev Allows the contract owner to accept the project.
     * @param _id ID of the project under review.
     */
    function acceptProject(uint256 _id) public onlyOwner returns (bool) {
        require(projectExists[_id], "Project not found");
        require(
            projects[_id].status == StatusEnum.PENDING_APPROVAL,
            "Project not pending approval"
        );

        projects[_id].status = StatusEnum.OPEN;

        emit ProjectApproved(_id, block.timestamp);
        return true;
    }

    /**
     * @dev Allows the contract owner to reject the project.
     * @param _id ID of the project under review.
     * @param _reason Reason for project rejection.
     */
    function rejectProject(
        uint256 _id,
        string memory _reason
    ) public onlyOwner returns (bool) {
        require(projectExists[_id], "Project not found");
        require(
            projects[_id].status == StatusEnum.PENDING_APPROVAL,
            "Project not pending approval"
        );

        projects[_id].status = StatusEnum.DELETED;
        projects[_id].deletionReason = _reason;

        emit ProjectRejected(_id, block.timestamp);
        return true;
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

            stats.totalBackings -= 1;
            stats.totalDonations -= contribution;
        }
    }

    /**
     * @dev Backs a project by providing a contribution.
     * @param _id ID of the project to be backed.
     * @param _comment Comment left by the backer.
     * @return bool Success status.
     */
    function backProject(
        uint256 _id,
        string memory _comment
    ) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExists[_id], "Project not found");
        require(
            projects[_id].status == StatusEnum.OPEN,
            "Project no longer opened"
        );

        stats.totalBackings += 1;
        stats.totalDonations += msg.value;
        projects[_id].raised += msg.value;

        backersOf[_id].push(
            BackerStruct(
                projects[_id].backers,
                msg.sender,
                msg.value,
                block.timestamp,
                _comment,
                false
            )
        );

        emit ProjectBacked(
            _id,
            projects[_id].backers,
            msg.sender,
            projects[_id].raised,
            msg.value,
            stats.totalBackings,
            stats.totalDonations,
            _comment,
            block.timestamp,
            false
        );

        projects[_id].backers += 1;

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
            projects[_id].title,
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
     * @dev Retrieves all projects created by a user.
     * @param _user Address of the user.
     * @return ProjectStruct[] Array of user projects.
     */
    function getUserProjects(
        address _user
    ) public view returns (ProjectStruct[] memory) {
        return projectsOf[_user];
    }

    /**
     * @dev Retrieves stats.
     * @return StatsStruct stats details.
     */
    function getStats() public view returns (StatsStruct memory) {
        return stats;
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

    /**
     * @dev Retrieves all categories.
     * @return CategoryStruct[] Array of categories.
     */
    function getCategories() public view returns (CategoryStruct[] memory) {
        return categories;
    }
}
