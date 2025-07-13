const jobModel = require('../models/jobModels');

(async () => {
    try {
        console.log("=== ADD JOB ===");
        const added = await jobModel.addJob({
            company: "Erdi Corporation",
            role: "Backend Engineer",
            location: "Remote",
            format: "Remote",
            status: "Applied",
            dateApplied: "2025-07-04",
            notes: "Job Req: #12345"
        });
        console.log("Added job:", added);

        console.log("\n=== GET ALL JOBS ===");
        const jobs = await jobModel.getAllJobs();
        console.log(jobs);

        console.log("\n=== GET JOB BY ID ===");
        const job = await jobModel.getJobById(added.id);
        console.log(job);

        console.log("\n=== UPDATE JOB ===");
        const updated = await jobModel.updateJob(added.id, {
            company: "Erdi Corporation",
            role: "Backend Engineer",
            location: "Remote",
            format: "Remote",
            status: "Interview",
            dateApplied: "2025-07-04",
            notes: "Job Req: #12345"
        });
        console.log("Update result:", updated);

        console.log("\n=== DELETE JOB ===");
        const deleted = await jobModel.deleteJob(added.id);
        console.log("Delete result:", deleted);

        console.log("\n=== FINAL JOBS LIST ===");
        const finalJobs = await jobModel.getAllJobs();
        console.log(finalJobs);

    } catch (err) {
        console.error("Test failed:", err);
    }
})();
