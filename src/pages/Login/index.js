import { useEffect, useState } from "react";
import { Signin } from "./../../utils/rest";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, login] = Signin();
  const [access, setAccess] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(data.data).length > 0) {
      localStorage.setItem("authToken", data.data.idToken);
      navigate("/admin");
    }
  }, [data, navigate]);

  const formAccess = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAccess((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const signin = async () => {
    if (
      access.email.includes("@") &&
      access.email.length > 8 &&
      access.password.length >= 8
    ) {
      await login({
        email: access.email,
        password: access.password,
        returnSecureToken: true,
      });

      setAccess({ email: "", password: "" });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className=" uppercase text-center text-orange-600 font-bold text-5xl p-6">
            Managment
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={access.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-orange-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  onChange={formAccess}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={access.password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-orange-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  onChange={formAccess}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={signin}
                className="flex w-full justify-center rounded-md bg-orange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
