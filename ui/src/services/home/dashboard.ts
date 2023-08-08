// import { get, post,deleteAxios,put } from "../../common/helpers/api_helper";
import api from "../../common/helpers/api_helper";
import { toast } from "react-toastify";
import {
  EducationPayload,
  GetEducationResponse,
  SearchQuery,
  UpdateEducationPayload,
} from "../../types/education";

const getEducation = () => api.get<GetEducationResponse>("/educations");

const searchSchools = (userQuery: string) =>
  api.get<SearchQuery>(`schools`, {
    params: {
      search: userQuery,
    },
  });
const postEduction = (body: EducationPayload) => api.post("/educations", body);

const deleteEducation = async (id: string) => {
  const response = await api.delete(`educations/${id}`);
  toast.success(response.msg);
  return response;
};

const updateEducations = async (id: string, body: UpdateEducationPayload) => {
  const response = await api.put(`educations/${id}`, body);
  toast.success(response.msg);
  return response;
};

export {
  getEducation,
  postEduction,
  searchSchools,
  deleteEducation,
  updateEducations,
};
