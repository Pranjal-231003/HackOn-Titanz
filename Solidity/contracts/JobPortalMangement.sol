// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract JobPortal {
    struct JobPost {
        uint id;
        address employer;
        string title;
        string description;
        string requirements;
        uint salary;
        uint applicationDeadline;
        bool isActive;
        address[] applicants;
        mapping(address => ApplicantInfo) applicantInfo;
    }

    struct ApplicantInfo {
        string name;
        string resume;
    }

    struct JobPostView {
        uint id;
        address employer;
        string title;
        string description;
        string requirements;
        uint salary;
        uint applicationDeadline;
        bool isActive;
        address[] applicants;
    }

    uint public JobCount;
    mapping(uint => JobPost) public JobPosts;
    mapping(address => uint[]) public employerJobs;
    mapping(address => uint[]) public applicantJobs;

    event JobCreated(uint id, address employer, string title);
    event JobUpdated(uint id, string title);
    event JobRemoved(uint id);
    event JobApplied(uint jobId, address applicant, string name, string resume);

    function createJob(
        string memory _title,
        string memory _description,
        string memory _requirements,
        uint _salary,
        uint _applicationDeadline
    ) public {
        JobCount++;
        JobPost storage job = JobPosts[JobCount];
        job.id = JobCount;
        job.employer = msg.sender;
        job.title = _title;
        job.description = _description;
        job.requirements = _requirements;
        job.salary = _salary;
        job.applicationDeadline = _applicationDeadline;
        job.isActive = true;
        employerJobs[msg.sender].push(JobCount);

        emit JobCreated(JobCount, msg.sender, _title);
    }

    function updateJob(
        uint _id,
        string memory _title,
        string memory _description,
        string memory _requirements,
        uint _salary,
        uint _applicationDeadline
    ) public {
        JobPost storage job = JobPosts[_id];
        require(job.employer == msg.sender, "Only the employer can update");
        job.title = _title;
        job.description = _description;
        job.requirements = _requirements;
        job.salary = _salary;
        job.applicationDeadline = _applicationDeadline;

        emit JobUpdated(_id, _title);
    }

    function removeJob(uint _id) public {
        JobPost storage job = JobPosts[_id];
        require(job.employer == msg.sender, "Only the employer can remove jobs");
        job.isActive = false;

        emit JobRemoved(_id);
    }

    function applyForJob(uint _jobId, string memory _name, string memory _resume) public {
        JobPost storage job = JobPosts[_jobId];
        require(job.isActive, "Job is not active");
        // require(block.timestamp <= job.applicationDeadline, "Application deadline has passed");

        job.applicants.push(msg.sender);
        job.applicantInfo[msg.sender] = ApplicantInfo({
            name: _name,
            resume: _resume
        });
        applicantJobs[msg.sender].push(_jobId);

        emit JobApplied(_jobId, msg.sender, _name, _resume);
    }

    function getAllJobs() public view returns (JobPostView[] memory) {
        uint activeCount = 0;
        for (uint i = 1; i <= JobCount; i++) {
            if (JobPosts[i].isActive) {
                activeCount++;
            }
        }

        JobPostView[] memory jobs = new JobPostView[](activeCount);
        uint index = 0;
        for (uint i = 1; i <= JobCount; i++) {
            if (JobPosts[i].isActive) {
                JobPost storage job = JobPosts[i];
                jobs[index] = JobPostView({
                    id: job.id,
                    employer: job.employer,
                    title: job.title,
                    description: job.description,
                    requirements: job.requirements,
                    salary: job.salary,
                    applicationDeadline: job.applicationDeadline,
                    isActive: job.isActive,
                    applicants: job.applicants
                });
                index++;
            }
        }
        return jobs;
    }

    function getApplicants(uint _jobId) public view returns (address[] memory) {
        JobPost storage job = JobPosts[_jobId];
        return job.applicants;
    }

    function getApplicantInfo(uint _jobId, address _applicant) public view returns (string memory, string memory) {
        JobPost storage job = JobPosts[_jobId];
        ApplicantInfo storage info = job.applicantInfo[_applicant];
        return (info.name, info.resume);
    }
}
