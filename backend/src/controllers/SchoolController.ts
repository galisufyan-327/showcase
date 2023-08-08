import { Request, Response } from "express";

import { BaseController } from "./BaseController";
import { SchoolService } from "../services/SchoolService";
import { errorCodeIsValid } from "../utilities/helpers";
import { schoolValidation } from "../validations/school";

export class SchoolController {
  static async index(req: Request, res: Response) {
    try {
      const data = await SchoolService.getSchools(req.query.search as string);

      return res.json(BaseController.successResponse({ data }));
    } catch (e: any) {
      return res
        .status(errorCodeIsValid(e.status))
        .json(
          BaseController.errorResponse({ error: e.message, code: e.status })
        );
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const data = await SchoolService.findOne(req.params.id);

      return res.json(BaseController.successResponse({ data }));
    } catch (e: any) {
      return res
        .status(errorCodeIsValid(e.status))
        .json(
          BaseController.errorResponse({ error: e.message, code: e.status })
        );
    }
  }

  static async store(req: Request, res: Response) {
    try {
      await schoolValidation.validateAsync(req.body);
      const data = await SchoolService.addSchool(req.body);
      return res.json(BaseController.successResponse({ data }));
    } catch (e: any) {
      return res
        .status(errorCodeIsValid(e.status))
        .json(
          BaseController.errorResponse({ error: e.message, code: e.status })
        );
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await schoolValidation.validateAsync(req.body);
      const data = await SchoolService.updateSchool(req.params.id, req.body);
      return res.json(BaseController.successResponse({ data }));
    } catch (e: any) {
      return res
        .status(errorCodeIsValid(e.status))
        .json(
          BaseController.errorResponse({ error: e.message, code: e.status })
        );
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await SchoolService.deleteSchool(req.params.id);
      return res.json(BaseController.successResponse({ data: null }));
    } catch (e: any) {
      return res
        .status(errorCodeIsValid(e.status))
        .json(
          BaseController.errorResponse({ error: e.message, code: e.status })
        );
    }
  }
}
