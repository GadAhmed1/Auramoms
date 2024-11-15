import profile from "../assets/Auramoms.jpg";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-slate-50 shadow-sm p-2 md:p-4">
      {/* شعار الموقع أو اسم العنوان */}
      <h1 className="text-lg font-bold text-gray-700 hidden md:block">Auramoms</h1>

      {/* صورة الملف الشخصي */}
      <img
        src={profile}
        className="rounded-full border border-gray-300 shadow-sm object-cover m-1"
        width={50}
        height={50}
        alt="Profile"
      />
    </div>
  );
};

export default Navbar;
