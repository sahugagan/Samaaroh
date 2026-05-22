import ClickEvent from "../models/ClickEvent.js";

export const trackClick = async (req, res) => {
  try {
    const { eventName, page = "", target = "", sessionId = "", meta = {} } = req.body;

    const userId = req.user?.id || null;
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : (forwardedFor || req.socket?.remoteAddress || "").toString();

    const userAgent = (req.headers["user-agent"] || "").toString();

    const record = await ClickEvent.create({
      userId,
      sessionId,
      eventName,
      page,
      target,
      meta,
      ip,
      userAgent,
    });

    return res.status(201).json({
      success: true,
      message: "Click event tracked",
      data: {
        id: record._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to track click event",
      error: error.message,
    });
  }
};

export const listClickEvents = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const events = await ClickEvent.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("userId", "name email role");

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch click events",
      error: error.message,
    });
  }
};
