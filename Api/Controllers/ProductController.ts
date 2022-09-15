
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
            let { value, isDeleted } = req.query;

            const page: number = parseInt(req.query.page as string);
            const limit: number = parseInt(req.query.limit as string);

            const parsedValue: number = isNaN(parseFloat(value as string)) ? 0 : parseFloat(value as string);

            return res.send({ value });
            let query: any = {
                $and: [
                    {
                        $or: [
                            { name: { '$regex': value?.toString(), '$options': 'i' } },
                            { price: parsedValue },
                            { cost: parsedValue },
                            { benefit: parsedValue },

                        ]
                    },
                ]
            }

            if (isDeleted !== "all") {
                query.$and.push({ IsDeleted: isDeleted });
            }

            let data = await productModel.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = await productModel.find(query).count();

            return res.send({ data, dataQuantity });
        }
        catch (error) {
            return res.status(500).send({ message: "An error has occurred", error })
        }
    }

}
export default new ProductController(productModel);