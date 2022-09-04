
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { model as contactModel } from '../../Data/Schemas/Contacts/ContactSchema';

class ContactController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

}
export default new ContactController(contactModel);