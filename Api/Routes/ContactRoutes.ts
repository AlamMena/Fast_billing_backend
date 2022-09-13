import { Router } from "express";
import ContactController from "../Controllers/ContactController";

const router = Router();

router.route('/Contacts').get((...args) => { ContactController.GetAsync(...args) });
router.route('/Contact').get((...args) => { ContactController.GetByIdAsync(...args) });
router.route('/Contact').post((...args) => { ContactController.CreateAsync(...args) });
router.route('/Contact').put((...args) => { ContactController.UpdateAsync(...args) });
router.route('/Contact').delete((...args) => { ContactController.DeleteAsync(...args) });
router.route('/Contact/filtered').get((...args) => { ContactController.GetContactsByValue(...args) });


export default router;