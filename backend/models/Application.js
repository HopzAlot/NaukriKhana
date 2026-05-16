const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: String,
    email: String,
    resumeLink: String,

    appliedAt: {
        type: Date,
        default: Date.now
    }
});
applicationSchema.index({ jobId: 1, appliedBy: 1 }, { unique: true });
module.exports = mongoose.model("Application", applicationSchema);