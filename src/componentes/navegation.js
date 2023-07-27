import { useNavigate } from "react-router-dom";

const Navegation = () => {
  const navigate = useNavigate();

  const logoff = () => {
    localStorage.removeItem("authToken");
    return navigate("/login");
  };
  return (
    <>
      <nav className=" py-4 px-10 bg-gray-100 flex justify-between">
        <h1 className=" text-center text-xl uppercase font-light">
          Painel Administrativo
        </h1>
        <button
          onClick={logoff}
          className=" border border-orange-600 text-orange-600 px-3"
        >
          Sair
        </button>
      </nav>
    </>
  );
};

export default Navegation;
