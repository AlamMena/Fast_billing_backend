import { Model } from 'mongoose'
import { CoreController } from './CoreController';
import CategorySchema, { model as categoryModel } from '../../Data/Schemas/Inventory/CategorySchema';

class CategoryController extends CoreController {
    constructor(model: Model<any>) {
        super(categoryModel)
    }
}
export default new CategoryController(categoryModel);