import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const url = "http://localhost:4000";
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}