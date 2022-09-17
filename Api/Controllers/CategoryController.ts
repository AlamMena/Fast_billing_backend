import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { NextFunction, Response, Request } from 'express';


import CategorySchema, { model as categoryModel } from '../../Data/Schemas/Inventory/CategorySchema';

class CategoryController extends CoreController {
    constructor(model: Model<any>) {
        super(categoryModel)
    }

    async GetCategoriesByValue(req: Request, res: Response, next: NextFunction) {
        try {
            let { value, isDeleted } = req.query;

            const page: number = parseInt(req.query.page as string);
            const limit: number = parseInt(req.query.limit as string);


            let query: any = {
                $and: [
                    { name: { '$regex': value?.toString(), '$options': 'i' } },
                ]
            }

            if (isDeleted !== "all") {
                query.$and.push({ IsDeleted: isDeleted });
            }

            let data = await categoryModel.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = await categoryModel.find(query).count();

            return res.send({ data, dataQuantity });
        }
        catch (error) {
            return res.status(500).send({ message: "An error has occurred", error })
        }
    }
}
export default new CategoryController(categoryModel);