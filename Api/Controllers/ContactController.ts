
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { model as contactModel } from '../../Data/Schemas/Contacts/ContactSchema';
import { NextFunction, Response, Request } from 'express';
import { AnyARecord } from 'dns';

class ContactController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

    async GetContactsByValue(req: Request, res: Response, next: NextFunction) {
        try {
            let { value, isDeleted, type } = req.query;

            if (!value) {
                res.status(400).send({message:"Value is not valid"})
            }
            const page: number = parseInt(req.query.page as string);
            const limit: number = parseInt(req.query.limit as string);

            let query: any = {
                $and: [
                    {
                        $or: [
                            { name: { '$regex': value, '$options': 'i' } },
                            { noIdentification: { '$regex': value, '$options': 'i' } },
                            { phone: { '$regex': value, '$options': 'i' } }
                        ]
                    },
                ]
            }

            if (isDeleted) {
                query.$and.push({ IsDeleted: isDeleted });
            }
            if (type) {
                query.$and.push({ type: type });
            }
            let data = await contactModel.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = await contactModel.find(query).count();
    
            res.send({data,dataQuantity});
        }
        catch (error) {
            res.status(400).send({message:"An error has occurred",error})
        }
    }
}
export default new ContactController(contactModel);