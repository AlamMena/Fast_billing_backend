import { Router } from "express";
import CompanySchema from "../../Data/Schemas/System/CompanySchema";
import CompanyController from "../Controllers/CompanyController";

const router = Router();

router.route('/companies').get((...args) => { CompanyController.GetAsync(...args) });
router.route('/companies').get((...args) => { CompanyController.GetByIdAsync(...args) });
router.route('/company').post((...args) => { CompanyController.CreateAsync(...args) });
router.route('/company').put((...args) => { CompanyController.UpdateAsync(...args) });
router.route('/company').delete((...args) => { CompanyController.DeleteAsync(...args) });

export default router;