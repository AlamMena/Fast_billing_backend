
import { model as productModel } from '../../Data/Schemas/Inventory/ProductSchema';
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { Request, Response, NextFunction } from "express";

class ProductController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

    async GetProductsByValue(req: Request, res: Response, next: NextFunction) {
        try {
            let { value, isDeleted, type } = req.query;

            const page: number = parseInt(req.query.page as string);
            const limit: number = parseInt(req.query.limit as string);

            let query: any = {
                $and: [
                    {
                        $or: [
                            { name: { '$regex': value ? value : "", '$options': 'i' } },
                            { price: value },
                            { cost: value },
                            { benefit: value },

                        ]
                    },
                ]
            }

            if (isDeleted !== "all") {
                query.$and.push({ IsDeleted: isDeleted });
            }

            let data = await productModel.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = await productModel.find(query).count();

            res.send({ data, dataQuantity });
        }
        catch (error) {
            res.status(500).send({ message: "An error has occurred", error })
        }
    }

}
export default new ProductController(productModel);