import { Schema } from "mongoose";
import CoreEntity from "./CoreModel";

const TenantModel = new Schema({
    CompanyId: String,
    BranchId: String
})

export default TenantModel;