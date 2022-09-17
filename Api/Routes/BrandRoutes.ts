import { Router } from "express";
import BrandController from "../Controllers/BrandController";

const router = Router();

router.route('/brands').get((...args) => { BrandController.GetAsync(...args) });
router.route('/brand').get((...args) => { BrandController.GetByIdAsync(...args) });
router.route('/brand').post((...args) => { BrandController.CreateAsync(...args) });
router.route('/brand').put((...args) => { BrandController.UpdateAsync(...args) });
router.route('/brand').delete((...args) => { BrandController.DeleteAsync(...args) });
router.route('/brands/filtered').get((...args) => { BrandController.GetBrandsByValue(...args) });

// router.route('/Login').get((...args) => { BrandController.LoginAsync(...args) });


export default router;