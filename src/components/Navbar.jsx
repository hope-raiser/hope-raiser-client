import useAuthStore from "@/modules/authStore";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { useEffect, useState } from "react";

const Navbar = () => {
  //   const userData = useAuthStore((state) => state.user);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");

      if (token) {
        setIsLogin(true);
      }
    }
  }, [window.localStorage.getItem("token")]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavbar = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      <nav className="bg-[#D9D9D9] ">
        <div className="flex flex-wrap p-4 md:px-4  items-center gap-4 justify-around">
          <Link href="/">
            <div className="flex items-center">
              <Image src="https://placehold.co/60" fallback="https://placehold.co/75" alt="LOGO" className="text-Dark font-semibold" />
              <div className="flex flex-wrap flex-col px-4 text-center">
                <h2 className="text-Teal text-2xl font-bold tracking-wider">HOPERAISER</h2>
                <span className="text-Dark text-xs  tracking-widest hidden md:block">Empowering Hope, Fueling Progress</span>
              </div>
            </div>
          </Link>
          {/* NAVBAR MD > */}
          <ul className="text-Dark text-lg font-medium hidden md:flex gap-10 ">
            <Link href="/categories" className="hover:text-Teal duration-300">
              Categories
            </Link>
            <Link href={isLogin ? "/users/bookmark" : "/login"} className="hover:text-Teal duration-300">
              Saved
            </Link>
          </ul>
          <div className="hidden md:flex">
            {!isLogin ? (
              <>
                <Link href="/login">
                  <button className="bg-Teal px-5 py-2 text-sm text-slate-200 rounded-sm hover:text-slate-300 hover:bg-teal-700 duration-500">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="bg-Teal px-5 py-2 text-sm text-slate-200 rounded-sm hover:text-slate-300 hover:bg-teal-700 duration-500"
                  >
                    Menu
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 z-10 mt-2  bg-slate-50 rounded-sm shadow-md ">
                      <ul className="py-2 px-8 ">
                        <Link href="/users">
                          <li className="cursor-pointer mb-4 py-1  text-Dark hover:text-Teal duration-300">Profile</li>
                        </Link>
                        <Link href="/campaigns/create">
                          <li className="cursor-pointer mb-4 py-1  text-Dark hover:text-Teal duration-300">Create Campaign</li>
                        </Link>
                        <li
                          className=" cursor-pointer  text-Dark hover:text-Teal py-1"
                          onClick={() => {
                            window.localStorage.removeItem("token");
                            window.localStorage.removeItem("user");
                            setIsLogin(false);
                            router.push("/");
                          }}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* NAVBAR SM << */}
          <div className="block md:hidden " onClick={handleNavbar}>
            <AiOutlineMenu size={20} />
          </div>
          <div
            className={
              navVisible
                ? "z-[30] md:hidden fixed h-full  top-0 left-0 p-8 w-full bg-Dark duration-500 ease-in-out"
                : "z-[30] md:hidden fixed h-full top-0 left-[-1000px] p-8 w-full bg-Dark duration-500 ease-in-out"
            }
          >
            <div className="flex flex-wrap overflow-auto items-center justify-around">
              <Link href="/">
                <div className="flex items-center ">
                  <Image src="https://placehold.co/60" fallback="https://placehold.co/60" alt="LOGO" className="text-Dark font-semibold" />
                  <div className="flex flex-wrap flex-col px-4 text-center">
                    <h2 className="text-Teal text-2xl font-bold tracking-wider">HOPERAISER</h2>
                  </div>
                </div>
              </Link>
              <div className="block md:hidden " onClick={handleNavbar}>
                <AiOutlineClose size={20} color="white" />
              </div>
            </div>
            <ul className="text-white text-md  font-medium pt-8" onClick={handleNavbar}>
              <Link href="/categories" className="block py-4 border-b border-gray-700">
                Categories
              </Link>
              <Link href={isLogin ? "/users/bookmark" : "/login"} className="block py-4 border-b border-gray-700">
                Saved
              </Link>
              <Link href={isLogin ? "users" : "/login"} className="block py-4 mt-8  border-b border-gray-700">
                Profile
              </Link>
              <Link href={isLogin ? "campaigns/create" : "/login"} className="block py-4 border-b border-gray-700">
                Create Campaign
              </Link>
              <div className="flex justify-center">
                <button
                  className="bg-Teal px-5 py-2 mt-6  text-sm text-slate-200 rounded-sm "
                  onClick={() => {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("user");
                    setIsLogin(false);
                    window.location.reload();
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
