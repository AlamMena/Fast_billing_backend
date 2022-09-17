
import { Model, Schema } from 'mongoose'
import { NextFunction, Response, Request } from 'express';

import { CoreController } from './CoreController';
import { model as brandModel } from '../../Data/Schemas/System/BrandSchema';

class BrandController extends CoreController {
    constructor(brandModel: Model<any>) {
        super(brandModel)
    }

    async GetBrandsByValue(req: Request, res: Response, next: NextFunction) {
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

            let data = await brandModel.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = await brandModel.find(query).count();

            return res.send({ data, dataQuantity });
        }
        catch (error) {
            return res.status(500).send({ message: "An error has occurred", error })
        }
    }
    // async LoginAsync(req: Request, res: Response, next: NextFunction) {

    //     const response = await Login();
    //     return res.send(response);
    //  }
}
export default new BrandController(brandModel);