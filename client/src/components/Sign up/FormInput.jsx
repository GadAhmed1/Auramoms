import PropTypes from "prop-types";

const FormInput = ({ label, error, ...props }) => {
  const inputClass = `w-full  border-2 rounded-xl p-4 mt-1 bg-transparent transition-colors duration-300 
    ${
      error
        ? "border-red-500 dark:border-red-400 shadow-sm shadow-red-200 dark:shadow-red-900/30"
        : "border-gray-300 duration-400 dark:border-gray-600 hover:border-[#f4a7b9] dark:hover:border-[#d86a84] focus:border-[#f4a7b9] dark:focus:border-[#d86a84] focus:outline-none focus:ring-2 focus:ring-[#f4a7b9]/20 dark:focus:ring-[#d86a84]/20"
    }
    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`;

  return (
    <div className="flex flex-col">
      <label className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1 block">
        {label}
      </label>
      <input className={inputClass} {...props} />
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormInput;
