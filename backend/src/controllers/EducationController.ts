import { Request, Response } from "express";

import { BaseController } from "./BaseController";
import Education from "../models/Education";
import { EducationService } from "../services/EducationService";
import { educationValidation } from "../validations/education";
import { errorCodeIsValid } from "../utilities/helpers";

export class EducationController {
  static async index(req: Request, res: Response) {
    try {
      const { user } = req as any;
      const data = await EducationService.getEducationalExperience(user.id);

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
      const { user } = req as any;
      const data = await EducationService.findOne(req.params.id, user.id);

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
      const { user } = req as any;
      await educationValidation.validateAsync(req.body);
      const data = await EducationService.addEducationalExperience({
        ...req.body,
        user_id: user.id,
      });
      const edu = await EducationService.findOne(data._id.toString(), user.id);
      return res.json(BaseController.successResponse({ data: edu }));
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
      const { user } = req as any;
      await educationValidation.validateAsync(req.body);
      const data = await EducationService.updateEducationalExperience(
        req.params.id,
        user.id,
        req.body
      );
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
      const { user } = req as any;
      await EducationService.deleteExperience(req.params.id, user.id);
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
