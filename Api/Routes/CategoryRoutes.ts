import { Router } from "express";
import CategoryController from "../Controllers/CategoryController";

const router = Router();

router.route('/Categories').get((...args) => { CategoryController.GetAsync(...args) });
router.route('/Category').get((...args) => { CategoryController.GetByIdAsync(...args) });
router.route('/Category').post((...args) => { CategoryController.CreateAsync(...args) });
router.route('/Category').put((...args) => { CategoryController.UpdateAsync(...args) });
router.route('/Category').delete((...args) => { CategoryController.DeleteAsync(...args) });

export default router;