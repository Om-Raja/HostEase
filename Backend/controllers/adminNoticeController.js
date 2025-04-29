const Notice = require("../models/notice");
const User = require("../models/user");

const postNotice = async (req, res) => {
  try {
    const { title, description, expiresAt } = req.body;

    const newNotice = new Notice({
      title,
      description,
      expiresAt,
      careTaker: req.user._id,
    });
    const result = await newNotice.save();
    if (!result)
      return res.status(500).json({ message: "Error in saving the notice" });

    res.status(200).json({ message: "Notice Posted" });
  } catch (err) {
    console.error(`Error while posting the notice. Error: ${err}`);
    res
      .status(500)
      .json({ message: "Error while adding notice. Please try again" });
  }
};

const editNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;

    if (!noticeId)
      return res
        .status(400)
        .json({ message: "Notice Id is required to update notice details" });

    const { title, description, expiresAt } = req.body;

    const result = await Notice.findByIdAndUpdate(
      noticeId,
      { title, description, expiresAt },
      { new: true, runValidators: true },
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "Notice is missing or expired already" });
    }

    res.status(200).json({ message: "Notice posted successfully" });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: "Error occured, please try again" });
  }
};

const showAllNotices = async (req, res) => {
  try {
    const careTaker = await User.findById(req.user._id);

    const allNotices = await Notice.find({ hostelNo: careTaker.hostelNo }).populate("user", "name email mobile");
    if (!allNotices || allNotices.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no active notice right now" });
    }
    res.status(200).json(allNotices);
  } catch (err) {
    console.error("Error in showing notices to CareTaker. Error: ", err);
    res
      .status(500)
      .json({ message: "Some error occured , please try again later" });
  }
};

module.exports = { postNotice, editNotice, showAllNotices };
