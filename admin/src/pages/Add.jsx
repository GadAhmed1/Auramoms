import { FaPlus } from "react-icons/fa"; // استيراد أيقونة "FaPlus" من مكتبة "react-icons/fa" لاستخدامها كزر للإضافة
import area1 from "../assets/upload_area1.svg"; // استيراد صورة "area1" من المسار المحدد لاستخدامها كصورة افتراضية في منطقة التحميل
import { useState } from "react"; // استيراد "useState" من مكتبة React لتتبع الحالة المحلية للمكونات
import axios from "axios"; // استيراد مكتبة "axios" لإجراء طلبات HTTP بشكل ميسر
import { toast } from "react-toastify"; // استيراد دالة "toast" من مكتبة "react-toastify" لإظهار الرسائل المنبثقة
import "react-toastify/dist/ReactToastify.css"; // استيراد ملف CSS الخاص بمكتبة "react-toastify" لتنسيق الرسائل المنبثقة

// مكون فرعي لرفع الصور
const ImageUpload = ({ label, image, setImage, id }) => (
  <div className="flex flex-col gap-y-2 max-w-24 h-24 mb-5 text-center"> {/* تنظيم العرض بشكل عمودي مع محاذاة مركزية */}
    <p>{label}</p> {/* عرض تسمية تحميل الصورة */}
    <label htmlFor={id} className="h-20"> {/* عنصر label لتحديد منطقة التحميل */}
      <img className="w-36" src={image ? URL.createObjectURL(image) : area1} alt="" /> {/* عرض الصورة المحملة أو صورة افتراضية */}
    </label>
    <input
      onChange={(e) => setImage(e.target.files[0])} // تحديث الصورة عند تغييرها
      type="file" // تعيين نوع الإدخال كملف
      hidden // إخفاء عنصر الإدخال الفعلي
      required // جعل الحقل مطلوبًا
      id={id} // تعيين معرف فريد للعنصر
    />
  </div>
);

// المكون الرئيسي لإضافة المنتجات
const Add = ({ url }) => {
  const [images, setImages] = useState(Array(5).fill(null)); // حالة الصور، مبدئيًا تحتوي على أربع صور فارغة

  const [data, setData] = useState({ // حالة البيانات لتتبع تفاصيل المنتج
    name: "", // اسم المنتج
    description: "", // وصف المنتج
    price: "", // سعر المنتج
    category: "", // فئة المنتج
  });

  const handleImageChange = (index) => (e) => { // دالة لمعالجة تغيير الصور
    const newImages = [...images]; // إنشاء نسخة من حالة الصور الحالية
    newImages[index] = e.target.files[0]; // تحديث الصورة في المؤشر المحدد
    setImages(newImages); // تعيين الحالة الجديدة للصور
  };

  const handleInputChange = (e) => { // دالة لمعالجة تغييرات الإدخال
    const { name, value } = e.target; // استخراج الخصائص من الهدف
    setData((prevData) => ({ // تحديث حالة البيانات
      ...prevData,
      [name]: value, // تحديث القيمة المحددة
    }));
  };

  const handleSubmit = async (e) => { // دالة معالجة إرسال النموذج
    e.preventDefault(); // منع السلوك الافتراضي للنموذج
    try {
      const formData = new FormData(); // إنشاء كائن FormData لإرسال البيانات
      Object.keys(data).forEach((key) => formData.append(key, data[key])); // إضافة البيانات الأساسية إلى FormData
      images.forEach((image) => { // إضافة الصور إلى FormData
        if (image) formData.append("images", image); // إضافة الصورة إذا كانت موجودة
      });

      const res = await axios.post(`${url}/products/add`, formData); // إجراء طلب POST لإضافة المنتج
      if (res.data.success) { // إذا كانت الاستجابة ناجحة
        setData({ name: "", description: "", price: "", category: "" }); // إعادة تعيين حالة البيانات
        setImages(Array(4).fill(null)); // إعادة تعيين الصور
        toast.success(res.data.message); // عرض رسالة نجاح
      } else {
        toast.error(res.data.message); // عرض رسالة خطأ
      }
    } catch (error) { // معالجة الأخطاء
      toast.error("An error occurred. Please try again."); // عرض رسالة خطأ عند حدوث استثناء
    }
  };

  return ( // العودة إلى واجهة المستخدم
    <div className="p-4 sm:p-10 w-full bg-primary/20"> {/* تصميم الحاوية مع padding وخلفية */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 max-w-[555px]"> {/* تصميم النموذج */}
        <h4 className="bold-22 pb-2 uppercase">Products Upload</h4> {/* عنوان النموذج */}

        <div className="flexBetween"> {/* تنظيم تحميل الصور بشكل متساوي */}
          {images.map((image, index) => ( // رسم مكون تحميل الصور لكل صورة
            <ImageUpload
              key={index} // تعيين مفتاح فريد للمكون
              label={`Image ${index + 1}`} // تسمية كل صورة
              image={image} // تمرير الصورة الحالية
              setImage={handleImageChange(index)} // تمرير دالة تغيير الصورة
              id={`image${index + 1}`} // تعيين معرف فريد لكل إدخال صورة
            />
          ))}
        </div>

        <div className="flex flex-col gap-y-2"> {/* تنظيم الحقول بشكل عمودي */}
          <p>Product name</p> {/* تسمية حقل اسم المنتج */}
          <input
            onChange={handleInputChange} // معالجة تغييرات الإدخال
            value={data.name} // ربط القيمة مع الحالة
            type="text" // تعيين نوع الإدخال كنص
            placeholder="Type here..." // نص توضيحي
            name="name" // اسم الحقل
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none" // تنسيق الحقل
          />
        </div>

        <div className="flex flex-col gap-y-2"> {/* تنظيم حقل الوصف */}
          <p>Product Description</p> {/* تسمية حقل الوصف */}
          <textarea
            onChange={handleInputChange} // معالجة تغييرات الإدخال
            value={data.description} // ربط القيمة مع الحالة
            name="description" // اسم الحقل
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none" // تنسيق حقل النص
            rows="6" // تحديد عدد الصفوف
            placeholder="Write Content Here..." // نص توضيحي
            required // جعل الحقل مطلوبًا
          ></textarea>
        </div>

        <div className="flex items-center gap-x-6 text-gray-900/70 medium-15"> {/* تنظيم حقل الفئة والسعر */}
          <div className="flex flex-col gap-y-2"> {/* حقل الفئة */}
            <p>Product Category</p> {/* تسمية حقل الفئة */}
            <select
              name="category" // اسم الحقل
              onChange={handleInputChange} // معالجة تغييرات الإدخال
              value={data.category} // ربط القيمة مع الحالة
              className="outline-none ring-1 ring-slate-900/10 pl-2" // تنسيق حقل القائمة المنسدلة
            >
              <option value="Skin Care">Skin Care</option> {/* خيار الفئة: العناية بالبشرة */}
              <option value="Health and personal care devices">Health and personal care devices</option> {/* خيار الفئة: الصحة */}
              <option value="Hair Care">Hair Care</option> {/* خيار الفئة: الأطفال */}
            </select>
          </div>

          <div className="flex flex-col gap-y-2"> {/* حقل السعر */}
            <p>Product Price</p> {/* تسمية حقل السعر */}
            <input
              onChange={handleInputChange} // معالجة تغييرات الإدخال
              value={data.price} // ربط القيمة مع الحالة
              className="ring-1 ring-slate-900/10 pl-2 w-24 outline-none" // تنسيق الحقل
              type="number" // تعيين نوع الإدخال كرقم
              placeholder="$20" // نص توضيحي
              name="price" // اسم الحقل
            />
          </div>
        </div>

        <button
          type="submit" // تعيين نوع الزر كزر إرسال
          className="btn-dark w-full flexCenter gap-x-2 !py-2 rounded" // تنسيق الزر
        >
          <FaPlus /> {/* إضافة الأيقونة إلى الزر */}
          Add Product {/* نص الزر */}
        </button>
      </form>
    </div>
  );
};

export default Add; // تصدير المكون "Add" للاستخدام في مكان آخر
