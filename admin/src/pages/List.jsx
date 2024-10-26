import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";


const List = ({url}) => {
  const [list, setlist] = useState([]);
  const fetchList = async () => {
    const res = await axios.get(`${url}/products/list`);
    console.log(res.data);
    if (res.data.success) {
      setlist(res.data.data);
    } else {
      toast.error("Error");
    };
  };

  const removeProduct = async(productid)=>{
    const res = await axios.post(`${url}/products/remove`, {id: productid});
    await fetchList();
    if(res.data.success){
      toast.success(res.data.message);
    }else{
      toast.error("Error")
    }

  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <section className=" p-4  box-border w-full">
      <h4 className="bold-22 uppercase">Products List</h4>
      <div className=" overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className=" border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left">Image 1</th>
              <th className="p-1 text-left">Image 2</th>
              <th className="p-1 text-left">Image 3</th>
              <th className="p-1 text-left">Image 4</th>
              <th className="p-1 text-left">Image 5</th>
              <th className="p-1 text-left">Title</th>
              <th className="p-1 text-left">Description</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr key={product._id} className=" border-b border-slate-900/20 text-gray-50 medium-14 text-left py-12" >
                <td className="p-1"><img className=" rounded-lg ring-slate-900 m-1" src={product.image} height={58} width={58} alt="" /></td>
                <td className="p-1"><img className=" rounded-lg ring-slate-900 m-1" src={product.image2} height={58} width={58} alt="" /></td>
                <td className="p-1"><img className=" rounded-lg ring-slate-900 m-1" src={product.image3} height={58} width={58} alt="" /></td>
                <td className="p-1"><img className=" rounded-lg ring-slate-900 m-1" src={product.image4} height={58} width={58} alt="" /></td>
                <td className="p-1"><img className=" rounded-lg ring-slate-900 m-1" src={product.image5} height={58} width={58} alt="" /></td>
                <td className="p-1"><p className=" line-clamp-3">{product.name}</p></td>
                {/* <td className="p-1"><p className=" line-clamp-3">{product.description}</p></td> */}
                <td className="p-1"><p>{product.price}$</p></td>
                <td className="p-1"><p className=" bold-22"><TbTrash onClick={()=> removeProduct(product._id)} /></p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default List
