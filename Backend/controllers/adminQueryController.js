const QueryModel = require("../models/query");
const User = require("../models/user");

const updateQueryResponse = async (req, res) => {
  try {
    const queryId = req.params.id;
    const { answer } = req.body;
    if (!queryId) {
      return res
        .status(400)
        .json({ message: "Query ID is requierd to update query response" });
    }
    if (!answer) {
      return res
        .status(400)
        .json({ message: "Answer is required to update response of query" });
    }

    const query = await QueryModel.findByIdAndUpdate(
      queryId,
      { answer: answer },
      { new: true, runValidators: true },
    );
    if (!query) {
      return res.status(404).json({ message: "Invalid query ID" });
    }
    res
      .status(200)
      .json({ message: "Query response updated successfully.", query });
  } catch (err) {
    console.error(`Error in updating the query response. Error: ${err}`);
    res.status(500).json("Something went wrong");
  }
};

const getAllQueries = async (req, res) => {
  try {
    const careTakerEmail = req.user.email;
    if (!careTakerEmail)
      return res.status(400).json({ message: "CareTaker email is missing" });

    const careTaker = await User.findOne({ email: careTakerEmail });
    if (!careTaker)
      return res.status(404).json({ message: "No careTaker found" });

    const careTakerHostel = careTaker.hostelNo;

    const allStudentOfSameHostel = await User.find({
      hostelNo: careTakerHostel,
    }).select("_id");
    if (!allStudentOfSameHostel || allStudentOfSameHostel.length === 0)
      return res
        .status(404)
        .json({
          message: `There are no student in hostel no ${careTakerHostel}`,
        });

    const allUserIds = allStudentOfSameHostel.map((u) => {
      return u._id;
    });
    const allQueries = await QueryModel.find({user: {$in: allUserIds}}).populate("user", "name email branch crn room hostelNo mobile");
    if (!allQueries || allQueries.length === 0) {
      return res
        .status(404)
        .json({ message: "No queries found at the moment" });
    }
    res.status(200).json({ allQueries });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Something went wrong"});
  }
};

module.exports = { updateQueryResponse, getAllQueries };
