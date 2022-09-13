import { Router } from "express";
import BrandController from "../Controllers/BrandController";

const router = Router();

router.route('/Brands').get((...args) => { BrandController.GetAsync(...args) });
router.route('/Brand').get((...args) => { BrandController.GetByIdAsync(...args) });
router.route('/Brand').post((...args) => { BrandController.CreateAsync(...args) });
router.route('/Brand').put((...args) => { BrandController.UpdateAsync(...args) });
router.route('/Brand').delete((...args) => { BrandController.DeleteAsync(...args) });
// router.route('/Login').get((...args) => { BrandController.LoginAsync(...args) });


export default router;