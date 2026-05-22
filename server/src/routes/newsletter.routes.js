import { Router } from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { newsletterSchema } from "../validators/newsletter.validator.js";

const router = Router();

router.post("/", validate(newsletterSchema), subscribeNewsletter);

export default router;
