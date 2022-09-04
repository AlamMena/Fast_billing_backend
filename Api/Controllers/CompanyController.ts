
import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import { model as companyModel } from '../../Data/Schemas/System/CompanySchema';
class CompanyController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }

}
export default new CompanyController(companyModel);