const Leave = require("../models/leave");

const updateLeaveRequestStatus = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body;

        if (!status || !["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Status must be either 'Approved' or 'Rejected'." });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave request not found." });
        }

        res.status(200).json({ message: "Leave request status updated successfully.", leave: updatedLeave });
    } catch (err) {
        console.error(`Error updating leave request status: ${err}`);
        res.status(500).json({ message: "Internal server error." });
    }
};

const showAllLeaveRequest = async (req, res) => {
    try {
        const allRequests = await Leave.find({ role: "student" });;
        if (!allRequests || allRequests.length === 0) {
            return res.status(404).json({ message: "There are no Leave requests at the moment" });
        }
        res.status(200).json({ allRequests });
    } catch (err) {
        console.error("Error in fetching all leave requests. Error: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { updateLeaveRequestStatus, showAllLeaveRequest };