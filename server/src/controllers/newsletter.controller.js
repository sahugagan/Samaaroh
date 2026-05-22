const subscribers = new Set();

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (subscribers.has(email)) {
      return res.status(200).json({
        success: true,
        message: "Email is already subscribed.",
      });
    }

    subscribers.add(email);

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
