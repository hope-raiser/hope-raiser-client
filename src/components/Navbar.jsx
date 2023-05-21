import useAuthStore from "@/modules/authStore";
import { useRouter } from "next/router";
import Link from "next/link";
import { Image, Img } from "@chakra-ui/react";

import { useEffect, useState } from "react";

const Navbar = () => {
  //   const userData = useAuthStore((state) => state.user);
  //   const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [window.localStorage.getItem("token")]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-[#D9D9D9]">
        <div className="py-5">
          <div className="flex items-center  justify-around">
            <div className="flex items-center ">
              <Image boxSize="40px" src="" alt="LOGO" className="text-Dark font-semibold" />
              <div className="flex flex-wrap flex-col px-4 text-center">
                <h2 className="text-Teal text-2xl font-bold tracking-wider">HOPERAISER</h2>
                <span className="text-Dark text-xs  tracking-widest ">YOUR TAGLINE</span>
              </div>
            </div>
            <div className="text-Dark text-lg font-medium flex gap-10">
              <a>
                <Link href="/" className="hover:text-Teal duration-300">
                  Home
                </Link>
              </a>
              <a>
                <Link href="/campaigns" className="hover:text-Teal duration-300">
                  Campaigns
                </Link>
              </a>
              <a>
                <Link href="/categories" className="hover:text-Teal duration-300">
                  Categories
                </Link>
              </a>
              <a>
                <Link href="/users/bookmark" className="hover:text-Teal duration-300">
                  Saved
                </Link>
              </a>
            </div>
            <div>
              {!isLogin ? (
                <>
                  <Link href="/login">
                    <button className="bg-Teal px-5 py-2 text-sm text-slate-200 rounded-sm hover:bg-slate-100 hover:text-Teal duration-500 hover:ring-1 hover:ring-Teal">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="bg-Teal px-5 py-2 text-sm text-slate-200 rounded-sm hover:bg-slate-100 hover:text-Teal duration-500 hover:ring-1 hover:ring-Teal"
                    >
                      Menu
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 mt-2  bg-slate-50 rounded-sm shadow-md ">
                        <ul className="py-2 px-8 ">
                          <li
                            className="cursor-pointer mb-4 py-1  text-Dark hover:text-Teal duration-300"
                            onClick={() => router.push("/campaigns/create")}
                          >
                            Create Campaign
                          </li>
                          <li
                            className="cursor-pointer mb-4 py-1  text-Dark hover:text-Teal duration-300"
                            onClick={() => router.push("/profile")}
                          >
                            Profile
                          </li>
                          <li
                            className=" cursor-pointer  text-Dark hover:text-Teal py-1"
                            onClick={() => {
                              window.localStorage.removeItem("token");
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
