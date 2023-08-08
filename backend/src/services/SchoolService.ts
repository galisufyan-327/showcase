import School from "../models/School";
import { SchoolPayload } from "../interfaces/school";

export class SchoolService {
  static getSchools(search?: string) {
    return School.find(
      search
        ? {
            name: { $regex: search, $options: "i" },
          }
        : {}
    ).exec();
  }

  static addSchool(payload: SchoolPayload) {
    return School.create({
      name: payload.name,
    });
  }

  static async findOne(id: string) {
    const school = await School.findById(id).exec();
    if (!school) {
      throw new Error("School not found by this id");
    }
    return school;
  }

  static updateSchool(id: string, payload: SchoolPayload) {
    return School.findOneAndUpdate(
      { _id: id },
      { name: payload.name },
      { new: true }
    ).exec();
  }

  static deleteSchool(id: string) {
    return School.deleteOne({ _id: id }).exec();
  }
}
