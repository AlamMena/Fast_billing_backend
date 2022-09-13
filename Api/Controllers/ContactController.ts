
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { model as contactModel } from '../../Data/Schemas/Contacts/ContactSchema';
import { NextFunction, Response, Request } from 'express';

class ContactController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

async GetContactsByValue(req: Request, res: Response, next: NextFunction) {
    let { value } = req.query;

    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    let parsedValue = `/${value}/`
    let query = {
        $or: [
            { name:parsedValue},
            { noIdentification: parsedValue },
            { phone:parsedValue }]
    }
    let data = await contactModel.find(query).skip((page - 1) * limit).limit(limit);
    let dataQuantity = await contactModel.find(query).count();
    
    res.send({ data, dataQuantity });
    }

}
export default new ContactController(contactModel);