import Newsletter from '../models/Newsletter.js';

let inMemoryNewsletter = [];

// @desc    Subscribe to the Aurelle Circle
// @route   POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid correspondence email address.' });
    }

    try {
      const existing = await Newsletter.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.json({ success: true, message: 'You are already registered in the Aurelle Circle Salon registry.' });
      }
      await Newsletter.create({ email: email.toLowerCase() });
    } catch (err) {
      if (!inMemoryNewsletter.includes(email.toLowerCase())) {
        inMemoryNewsletter.push(email.toLowerCase());
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you. Your bespoke salon invitation has been addressed.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
