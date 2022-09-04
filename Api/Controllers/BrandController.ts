
import { Model, Schema } from 'mongoose'
import { CoreController } from './CoreController';
import { model as brandModel } from '../../Data/Schemas/System/BrandSchema';

class BrandController extends CoreController {
    constructor(brandModel: Model<any>) {
        super(brandModel)
    }
}
export default new BrandController(brandModel);