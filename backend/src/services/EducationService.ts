import Education from "../models/Education";
import { SchoolPayload } from "../interfaces/school";

export class EducationService {
  static getEducationalExperience(user_id: string) {
    return Education.find({ user_id })
      .populate({ path: "school", select: "name" })
      .exec();
  }

  static addEducationalExperience(payload: SchoolPayload) {
    return Education.create(payload);
  }

  static async findOne(id: string, user_id: string) {
    const education = await Education.findOne({ _id: id, user_id })
      .populate({ path: "school", select: "name" })
      .exec();
    if (!education) {
      throw new Error("Education not found by this id");
    }
    return education;
  }

  static updateEducationalExperience(
    id: string,
    user_id: string,
    payload: SchoolPayload
  ) {
    return Education.findOneAndUpdate({ _id: id, user_id }, payload, {
      new: true,
    })
      .populate("school")
      .exec();
  }

  static deleteExperience(id: string, user_id: string) {
    return Education.deleteOne({ _id: id, user_id }).exec();
  }
}
