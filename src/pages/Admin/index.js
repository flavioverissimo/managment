import { useEffect } from "react";
import { useGet } from "../../utils/rest";
import { Link, useNavigate } from "react-router-dom";
import Navegation from "./../../componentes/navegation";
const Admin = () => {
  const getHeader = useGet("Header");
  const navigate = useNavigate();

  useEffect(() => {
    if (getHeader.data.error === "Permission denied") {
      navigate("/login");
    }

    setTimeout(() => {
      getHeader.refetch();
    }, 1000);
  }, [getHeader.data.error, navigate, getHeader]);

  return (
    <>
      <Navegation />
      <div className=" container mx-auto">
        <div className="pt-12 flex flex-col gap-2">
          <p className=" text-lg">Seja bem vindo ao Painel Administrativo</p>
          <p className=" text-sm">
            Utilize os campos abaixo para fazer as devidas alterações nos items
            que compoem o site. Todos os campos tem um limite máximo de
            caracteres que podem ser preenchidos, se atente as informações para
            melhor compor as informações a serem preenchidas.
          </p>
        </div>
        <div className="overflow-auto	w-full h-96 mt-12">
          <div>
            <div className=" flex justify-between bg-gray-50 border-b border-gray-200">
              <h3 className="py-2 p-6 font-semibold">Dados do Header</h3>
              <Link
                to="/admin/Header"
                className="py-2 p-6 uppercase text-sm font-semibold"
              >
                Fazer Alterarações
              </Link>
            </div>
            {!Object.keys(getHeader.data.data).length &&
              !getHeader.data.error && (
                <p className="text-center py-10">Loading...</p>
              )}
            {Object.keys(getHeader.data.data).length > 0 && (
              <table className=" w-full">
                <thead className=" bg-gray-50">
                  <tr>
                    <th className="pl-6 text-start">Item</th>
                    <th className="pl-6 text-start">Informação</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(getHeader.data.data).map((res) => (
                    <tr key={res}>
                      <td className="pl-6 text-start">{res}</td>
                      <td className="pl-6 text-start">
                        {getHeader.data.data[res]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="py-6 text-center text-gray-400/80">
        <p>Copyright © 2023 Managment</p>
      </div>
    </>
  );
};

export default Admin;
