import Lead from "../models/Lead.js";

export const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      data: {
        id: lead._id,
        fullName: lead.fullName,
        email: lead.email,
        service: lead.service,
        createdAt: lead.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};
