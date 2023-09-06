const PostEnquiry = require("../models/postEnquiry");

const createPostEnquiry = async (req, res) => {
  try {
    const enquiry = await PostEnquiry.createEnquiry(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Error creating enquiry." });
  }
};

const getPostEnquiry = async (req, res) => {
  try {
    const enquiry = await PostEnquiry.getEnquiryById(req.params.id);
    if (enquiry) {
      res.status(200).json(enquiry);
    } else {
      res.status(404).json({ message: "Enquiry not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiry." });
  }
};

module.exports = {
  createPostEnquiry,
  getPostEnquiry,
};
