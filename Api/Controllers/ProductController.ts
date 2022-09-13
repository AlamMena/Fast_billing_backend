
import { model as productModel } from '../../Data/Schemas/Inventory/ProductSchema';
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { Request, Response, NextFunction } from "express";

class ProductController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

    async GetProductsByValue(req: Request, res: Response, next: NextFunction) {
        let { value } = req.query;
        let response = await productModel.find({ name: { $in: value } });
        res.send(response);
    }

}
export default new ProductController(productModel);