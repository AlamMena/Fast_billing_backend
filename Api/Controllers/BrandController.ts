
import { Model, Schema } from 'mongoose'
import { CoreController } from './CoreController';
import { model as brandModel } from '../../Data/Schemas/System/BrandSchema';

class BrandController extends CoreController {
    constructor(brandModel: Model<any>) {
        super(brandModel)
    }

    // async LoginAsync(req: Request, res: Response, next: NextFunction) {
        
    //     const response = await Login();
    //     return res.send(response);
    //  }
}
export default new BrandController(brandModel);