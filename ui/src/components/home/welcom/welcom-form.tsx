import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { welcomeSchema } from "../../../yupSchemas/index";
import { routesConstant } from "../../../routes/routes";
import { useNavigate } from "react-router-dom"

const initialValues = {
  username: "",
};
const WelcomeForm: FC = () => {
  const navigate = useNavigate()  
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: welcomeSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: async (values, action) => {
        
        localStorage.setItem("username", values.username);
       
        navigate(routesConstant.HOME);
      
      },
    });

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-2/6 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-medium text-center text-purple-700 ">
          Hi There, Welcome to your education showcase
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2 ">
          
            <input
              type="name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="username"
              placeholder="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.username && touched.username ? (
            <p className="text-base text-red-500 capitalize">
              {errors.username}
            </p>
          ) : null}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeForm;
