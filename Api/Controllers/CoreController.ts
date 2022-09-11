import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { ErrorResponse } from "../../Exceptions/ValidationHandler";
import { currentUser, getCurrentUser } from "../../Services/SessionHandler";


export class CoreController {

    dbModel: Model<any>;

    constructor(model: Model<any>) {

        this.dbModel = model;
    }

    async GetAsync(req: Request, res: Response, next: NextFunction) {

        try {

            // getting values
            const page: number = parseInt(req.query.page as string)
            const limit: number = parseInt(req.query.limit as string)

            if (!page) {
                const error = new ErrorResponse('Invalid page', 400)
                return res.status(400).send(error)
            }

            if (!limit) {
                const error = new ErrorResponse('Invalid limit', 400)
                return res.status(400).send(error)
            }

            const entities = await this.dbModel.find().skip((page - 1) * limit).limit(limit);

            if (entities.length === 0) {
                return res.status(204).send([]);
            }

            return res.status(200).send(entities);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'An error has ocurred' })
        }
    }

    async CreateAsync(req: Request, res: Response, next: NextFunction) {

        try {

            const entity = new this.dbModel(req.body);

            // default data
            // entity.companyId = currentUser.companyId;
            entity.IsDeleted = false;
            entity.CreatedAt = new Date();
            // entity.CreatedBy = currentUser.uid;// add user id

            await entity.save();

            console.log(entity);
            return res.status(201).send();

        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'An error has ocurred', details: error });
        }

    }
    async UpdateAsync(req: Request, res: Response, next: NextFunction) {

        try {

            const { _id } = req.body;

            if (_id === undefined) {
                return res.status(404).send({ message: "Resource not found" });
            }

            const entity = req.body;
            // entity.companyId = currentUser.companyId;
            entity.IsDeleted = false;
            entity.UpdatedAt = new Date();
            // entity.UpdatedBy = currentUser.uid;// add user id

            const response = await this.dbModel.updateOne({ _id: _id }, { $set: entity });
            return res.status(200).send(response);

        } catch (error) {

            return res.status(400).send({ message: 'An error has ocurred', details: error });
        }

    }

    async DeleteAsync(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.query;

            if (id === undefined) {
                return res.status(404).send({ message: "Resource not found" });
            }

            const entity = req.body;
            // entity.companyId = currentUser.companyId;
            entity.IsDeleted = true;
            entity.UpdatedAt = new Date();
            // entity.UpdatedBy = currentUser.uid;// add user id

            const response = await this.dbModel.updateOne({ _id: id }, { $set: entity });

            return res.status(200).send(response);

        } catch (error) {

            return res.status(400).send(error);
        }

    }

    async GetByIdAsync(req: Request, res: Response, next: NextFunction) {

        const { id } = req.query;

        const item = await this.dbModel.findOne({ _id: id });

        if (item === null) {
            res.status(404).send({ message: 'Resource not found' })
        }

        return res.status(200).send(item);
    }
}