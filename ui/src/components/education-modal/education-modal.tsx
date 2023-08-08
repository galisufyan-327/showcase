import { Fragment, useEffect, useState, FC, ChangeEvent } from "react";
import AsyncSelect from "react-select/async";
import { Dialog, Transition } from "@headlessui/react";
import {
  Education,
  EducationPayload,
  UpdateEducationPayload,
} from "../../types/education";
import {
  postEduction,
  searchSchools,
  updateEducations,
} from "../../services/home/dashboard";

interface EducationModelProps {
  isOpen: boolean;
  closeModal: () => void;
  edit: Education;
}

type Option = { value: string; label: string };

const EducationModel: FC<EducationModelProps> = ({
  isOpen,
  closeModal,
  edit,
}) => {
  const [selectedSchool, setSelectedSchool] = useState<Option | null>(
    edit
      ? {
          label: edit?.school?.name,
          value: edit?.school?._id,
        }
      : null
  );
  const [state, setState] = useState<EducationPayload | UpdateEducationPayload>(
    {
      school: "",
      degree: "",
      field: "",
      start_year: "",
      end_year: "",
      grade: "",
      description: "",
      is_end_year_expected: false,
    }
  );

  useEffect(() => {
    if (edit) {
      setState({
        ...edit,
        school: edit.school._id,
        user_id: undefined,
      } as UpdateEducationPayload);
    } else {
      setState({
        school: "",
        degree: "",
        field: "",
        start_year: "",
        end_year: "",
        grade: "",
        description: "",
        is_end_year_expected: false,
      });
    }
  }, [edit]);

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (edit) {
      const data = await updateEducations(edit._id, {
        ...state,
        _id: undefined,
      } as UpdateEducationPayload);
      document.dispatchEvent(new CustomEvent("edit", { detail: data.data }));
      closeModal();
      setState({
        school: "",
        degree: "",
        field: "",
        start_year: "",
        end_year: "",
        grade: "",
        description: "",
        is_end_year_expected: false,
      });
      return;
    }
    postEduction(state as EducationPayload).then((res) => {
      document.dispatchEvent(new CustomEvent("refresh", { detail: res.data }));

      setState({
        school: "",
        degree: "",
        field: "",
        start_year: "",
        end_year: "",
        grade: "",
        description: "",
        is_end_year_expected: false,
      });

      closeModal();
    });
  };

  const getSchools = async (inputValue: string) => {
    const response = await searchSchools(inputValue);
    return (
      response?.data?.map((school: { _id: string; name: string }) => ({
        value: school._id,
        label: school.name,
      })) ?? []
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: Option[]) => void
  ) => {
    getSchools(inputValue).then((options) => {
      callback(options);
    });
  };

  const handleSchoolSelect = (selectedOption: Option | null) => {
    if (selectedOption) {
      setSelectedSchool(selectedOption);
      setState((prev) => ({
        ...prev,
        school: selectedOption.value,
      }));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="bg-white px-6 py-8 rounded text-black w-full">
                  <h3 className="mb-8 text-2xl text-center">
                    Create New Education
                  </h3>

                  <AsyncSelect
                    cacheOptions
                    className="block border border-grey-light w-full rounded mb-4 outline-none"
                    placeholder="Name Of School"
                    loadOptions={loadOptions}
                    defaultOptions
                    value={selectedSchool}
                    onChange={handleSchoolSelect}
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="degree"
                    placeholder="Degree"
                    value={state.degree}
                    onChange={onChangeHandler}
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="field"
                    placeholder="Field Of Study"
                    value={state.field}
                    onChange={onChangeHandler}
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="start_year"
                    placeholder="Start Year"
                    value={state.start_year}
                    onChange={onChangeHandler}
                  />

                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="end_year"
                    placeholder="End Year"
                    value={state.end_year}
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="grade"
                    placeholder="Grade"
                    value={state.grade}
                    onChange={onChangeHandler}
                  />
                  <textarea
                    type="text"
                    className="block border border-grey-light w-full p-2 rounded mb-4 outline-none"
                    name="description"
                    placeholder="Description"
                    value={state.description}
                    onChange={onChangeHandler}
                  />

                  <div className="w-full text-right">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onSubmit}
                    >
                      {edit ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EducationModel;
