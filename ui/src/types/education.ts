export interface Education {
  readonly _id: string;
  school: School;
  readonly user_id: string;
  degree: string;
  start_year: string;
  field: string;
  end_year?: string;
  is_end_year_expected?: boolean;
  grade: string;
  description: string;
  __v?: number;
}

export interface School {
  readonly _id: string;
  name: string;
}

export type GetEducationResponse = {
  data: Education[];
};
export interface SearchQuery {
  school: string;
}
export type EducationPayload = Required<
  Omit<Education, "_id" | "user_id" | "school">
> & {
  school: string;
};
export type UpdateEducationPayload = Partial<
  Omit<Education, "user_id" | "school">
> & {
  school: string;
};
