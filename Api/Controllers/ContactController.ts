
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
    let response = await contactModel.find({
        $or: [
            { name: { $in: value } },
            { noIdentification: { $in: value } },
            { phone: { $in: value } }]
    });

        res.send(response);
    }

}
export default new ContactController(contactModel);