import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/auth-context/auth";
import {
  getEducation,
  deleteEducation,
} from "../../../services/home/dashboard";
import { Education } from "../../../types/education";
import EducationModel from "../../education-modal/education-modal";

const MainComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Education[]>([]);
  const [edit, setEdit] = useState(false);

  const { onLogout } = useContext(GlobalContext);

  const closeModal = () => {
    setIsOpen(false);
    setEdit(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    try {
      await deleteEducation(id);

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error deleting education.", error);
    }
  };

  const fetchData = useCallback(async () => {
    const data = await getEducation();
    setData(data?.data ?? []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prependData = (e: CustomEvent) => {
    const { detail } = e;
    setData((prev) => [detail, ...prev]);
  };
  const editData = (e: CustomEvent) => {
    const { detail } = e;
    setData((prev) =>
      prev.map((item) => (item._id === detail._id ? detail : item))
    );
  };

  useEffect(() => {
    document.addEventListener("refresh" as any, prependData);
    document.addEventListener("edit" as any, editData);
    return () => {
      document.removeEventListener("refresh" as any, prependData);
      document.removeEventListener("edit" as any, editData);
    };
  }, []);

  const username = localStorage.getItem("username");

  return (
    <>
      <div className="flex m-auto">
        <h1 className="text-2xl text-center flex m-auto text-purple-700 pb-20 ">
          WELCOME TO {username} EDUCATION PAGE
        </h1>
        <div className="mt-6 m-1">
          <button
            type="submit"
            onClick={openModal}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Add New Education
          </button>
        </div>
        <div className="mt-6 m-1">
          <button
            type="submit"
            onClick={onLogout}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Logout Now !
          </button>
        </div>
      </div>

      <div className="flex md:flex-row-reverse flex-wrap">
        <div className="w-full md:w-3/4 bg-gray-100  p-4  text-gray-200">
          {data.length ? (
            data?.map((schoolData) => (
              <div
                className="bg-white text-gray-700 w-full"
                key={schoolData._id}
              >
                <div
                  className="flex p-2"
                  style={{ justifyContent: "space-between" }}
                >
                  {" "}
                  <button
                    className="text-blue-500 border p-2"
                    onClick={(e) => {
                      setEdit({ ...schoolData, __v: undefined });
                      openModal();
                    }}
                  >
                    Edit
                  </button>{" "}
                  <h2 className="text-2xl font-bold mb-2 ">
                    {schoolData.school.name}
                  </h2>
                  <button
                    className="text-red-500 border p-2"
                    onClick={() => onDelete(schoolData._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Degree: </span>
                  {schoolData.degree}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Description: </span>
                  {schoolData.description}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">End Year: </span>
                  {schoolData.end_year}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Field: </span>
                  {schoolData.field}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Grade: </span>
                  {schoolData.grade}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Is End Year Expected: </span>
                  {schoolData.is_end_year_expected ? "Yes" : "No"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Start Year: </span>
                  {schoolData.start_year}
                </div>
              </div>
            ))
          ) : (
            <p className="text-black text-2xl">No Data</p>
          )}
        </div>
        <div className="w-full md:w-1/4 bg-gray-400 p-4 text-center text-black-700 h-72 min-h-full">
          Add new Education
        </div>
      </div>

      <EducationModel
        isOpen={isOpen}
        closeModal={closeModal}
        setIsOpen={setIsOpen}
        edit={edit}
      />
    </>
  );
};

export default MainComponent;
