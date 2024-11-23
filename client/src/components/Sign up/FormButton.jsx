const FormButton = ({ children, loading, ...props }) => {
  return (
    <button
      className="group relative w-full bg-[#f4a7b9] dark:bg-[#d86a84] hover:bg-[#d86a84] dark:hover:bg-[#f4a7b9] 
        text-white font-medium py-4 px-6 rounded-xl transform transition-all duration-200 
        hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 
        focus:ring-[#f4a7b9]/50 dark:focus:ring-[#d86a84]/50 shadow-lg 
        shadow-[#f4a7b9]/20 dark:shadow-[#d86a84]/20 disabled:opacity-70"
      disabled={loading}
      {...props}
    >
      <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
};

export default FormButton;