import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "../../utils/rest";
import Navegation from "../../componentes/navegation";

const baseURL = "https://realtimedatabase-link";

const AdminLayout = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const setValue = async () => {
    const res = await axios.get(baseURL + id + ".json" + getAuth());
    if (res.data.error === "Permission denied") {
      navigate("/login");
    } else {
      setFormData(res.data);
    }
  };

  useEffect(() => {
    setValue();
  }, []);

  const setData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const saveData = () => {
    axios.patch(baseURL + id + ".json" + getAuth(), formData);
    return navigate("/admin");
  };

  return (
    <>
      <Navegation />
      <div className="container mx-auto">
        <h1 className="py-12 text-2xl">
          Alterações serão realizadas em <span className="underline">{id}</span>
        </h1>
        <div className=" flex flex-col gap-4">
          {Object.keys(formData).map((item) => (
            <div key={item} className=" flex border-b border-gray-100">
              <label htmlFor={item} className="py-4 w-64 font-semibold">
                {item}
              </label>
              <input
                className="flex-1 py-4 px-6 bg-gray-50"
                id={item}
                type="text"
                value={formData[item]}
                name={item}
                onChange={setData}
              />
            </div>
          ))}
        </div>
        <button
          onClick={saveData}
          className="bg-orange-600 py-2 px-6 text-center text-white mt-12 mx-auto"
        >
          Salvar Alterações
        </button>
      </div>
    </>
  );
};

export default AdminLayout;
