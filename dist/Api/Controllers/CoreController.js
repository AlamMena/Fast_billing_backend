"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreController = void 0;
const ValidationHandler_1 = require("../../Exceptions/ValidationHandler");
const SessionHandler_1 = require("../../Services/SessionHandler");
class CoreController {
    constructor(model) {
        this.dbModel = model;
    }
    GetAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // getting values
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                if (!page) {
                    const error = new ValidationHandler_1.ErrorResponse('Invalid page', 400);
                    return res.status(400).send(error);
                }
                if (!limit) {
                    const error = new ValidationHandler_1.ErrorResponse('Invalid limit', 400);
                    return res.status(400).send(error);
                }
                const entities = yield this.dbModel.find().skip((page - 1) * limit).limit(limit);
                if (entities.length === 0) {
                    return res.status(204).send([]);
                }
                return res.status(200).send(entities);
            }
            catch (error) {
                return res.status(500).send({ message: 'An error has ocurred' });
            }
        });
    }
    CreateAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = new this.dbModel(req.body);
                // default data
                entity.companyId = SessionHandler_1.currentUser.companyId;
                entity.IsDeleted = false;
                entity.CreatedAt = new Date();
                entity.CreatedBy = SessionHandler_1.currentUser.uid; // add user id
                yield entity.save();
                console.log(entity);
                return res.status(201).send();
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    UpdateAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                if (_id === undefined) {
                    return res.status(404).send({ message: "Resource not found" });
                }
                const entity = req.body;
                entity.companyId = SessionHandler_1.currentUser.companyId;
                entity.IsDeleted = false;
                entity.UpdatedAt = new Date();
                entity.UpdatedBy = SessionHandler_1.currentUser.uid; // add user id
                const response = yield this.dbModel.updateOne({ _id: _id }, { $set: entity });
                return res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error);
            }
        });
    }
    DeleteAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                if (id === undefined) {
                    return res.status(404).send({ message: "Resource not found" });
                }
                const entity = req.body;
                entity.companyId = SessionHandler_1.currentUser.companyId;
                entity.IsDeleted = true;
                entity.UpdatedAt = new Date();
                entity.UpdatedBy = SessionHandler_1.currentUser.uid; // add user id
                const response = yield this.dbModel.updateOne({ _id: id }, { $set: entity });
                return res.status(200).send(response);
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    GetByIdAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const item = this.dbModel.find({ id: id });
            if (item === null) {
                res.status(404).send({ message: 'Resource not found' });
            }
            return res.status(200).send(item);
        });
    }
}
exports.CoreController = CoreController;
