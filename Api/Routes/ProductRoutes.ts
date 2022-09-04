import { Router } from "express";
import ProductController from "../Controllers/ProductController";

const router = Router();

router.route('/products').get((...args) => { ProductController.GetAsync(...args) });
router.route('/product').get((...args) => { ProductController.GetByIdAsync(...args) });
router.route('/product').post((...args) => { ProductController.CreateAsync(...args) });
router.route('/product').put((...args) => { ProductController.UpdateAsync(...args) });
router.route('/product').delete((...args) => { ProductController.DeleteAsync(...args) });
router.route('/products/filtered').get((...args) => { ProductController.GetProductsByValue(...args) });


export default router;