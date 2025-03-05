"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import logo from "/public/logo.svg";
import newLogo from "/public/newLogo.png";
//import { SERVER_URL } from "@/src/app/constants/api";

import SignIn from "../(auth)/sign-in/page";
import { env } from "../../../config/env";
import { useRouter, usePathname } from "next/navigation";

import { useSelector, useDispatch } from "react-redux"
import { registerUser } from '../store/actions/user/registerUseraction'
import { bindActionCreators } from "redux";
interface NavProps {
  isHomeActive: boolean,
  isSoftwareActive: boolean,
  isRealEstateActive: boolean,
  isGalleryActive: boolean,
  isTechnicalActive: boolean,
  isConstructionActive: boolean,
  isOurServiceActive: boolean,
  isNoticeActive: boolean,
  isExportActive: boolean,
  isVisaActive: boolean,
  isOrdersActive: boolean,
  isTravelingActive: boolean,
  isBlogActive: boolean,
  isEmployeerActive: boolean
}

function Navbar() {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // To handle client-side rendering
  const [isLoading, setIsLoading] = useState(true); // Added state variable
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const path = usePathname().split("/")[1]

  const [activeNav, setActiveNav] = useState(() => {

    switch (path) {

      case ',': {
        return {
          isHomeActive: true,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isContructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }

      }

      case 'news': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: true
        }
      }

      case 'software': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: true,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }

      case 'gallery': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: true,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }

      case 'technical': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: true,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'construction': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: true,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'notice': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: true,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'export': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: true,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'visa': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: true,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'traveling': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: true,
          isBlogActive: false
        }
      }
      case 'orders': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: true,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }
      case 'real-estate': {
        return {
          isHomeActive: false,
          isRealEstateActive: true,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: false,
          isTravelingActive: false,
          isBlogActive: false
        }
      }

      case 'employers': {
        return {
          isHomeActive: false,
          isRealEstateActive: false,
          isSoftwareActive: false,
          isGalleryActive: false,
          isTechnicalActive: false,
          isConstructionActive: false,
          isOurServiceActive: false,
          isNoticeActive: false,
          isExportActive: false,
          isVisaActive: false,
          isOrdersActive: false,
          isEmployeerActive: true,
          isTravelingActive: false,
          isBlogActive: false
        }
      }

      default: return {
        isHomeActive: true,
        isRealEstateActive: false,
        isSoftwareActive: false,
        isGalleryActive: false,
        isTechnicalActive: false,
        isConstructionActive: false,
        isOurServiceActive: false,
        isNoticeActive: false,
        isExportActive: false,
        isVisaActive: false,
        isOrdersActive: false,
        isEmployeerActive: false,
        isTravelingActive: false,
        isBlogActive: false
      }
    }

  })

  useEffect(() => {
    let interval: any;
    
    if (activeNav) {
      setProgress(1); // Start from 1%

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setProgress(0), 1000); // Reset after 1s
            return 100;
          }
          return prev + 1; // Increment by 1%
        });
      }, 10); // Adjust speed if needed
    }

    return () => clearInterval(interval);
  }, [activeNav]);

  interface AuthState {
    isAuthenticated: boolean,
    user: any
  }


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false)
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const user = useSelector((state: any) => state.auth.user)
  const isUserAuthhenticated = useSelector((state: any) => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  const router = useRouter()

  const active =
    "font-bold text-gray-400 hover:text-#151B54 relative after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:bg-[#151B54] after:w-full";


  const actions = bindActionCreators({ registerUser }, dispatch)
  useEffect(() => {
    const id = Cookies.get("token") ?? null;
    setId(id);

    // alert(selector.name)


    //actions.registerUser({name:''})

    // alert(JSON.stringify(selector.name))
  }, []);

  // Ensure the component is rendered only after it's mounted on the client
  //if (!isClient) return null; // Prevent SSR-related issues



  useEffect(() => {
    // Check if the current route matches any of the navigation links
    const isNavigating =
      path === 'news' ||
      path === 'software' ||
      path === 'gallery' ||
      path === 'notice' ||
      path === 'orders' ||
      path === '' ||
      path === 'employers' ||
      path === 'real-estate'; // Add more paths as needed

    if (isNavigating) {
      setIsLoading(true);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1-second loading time

    // ... rest of the useEffect logic as before

    return () => clearTimeout(timeout);

  }, [path]);

  const menu = ["real-estate",
    "gallery",
    "technical",
    "construction",
    "our-service",
    "notice",
    "export",
    "visa",
    "orders",
    "employers",
    "traveling",
    "news"]


  return (
    <div>
      <nav className="flex h-[10vh] items-center justify-between md:px-14 px-6 bg-primary py-4 cursor-default w-[100&]">
        <div className="">
          <Image src={newLogo} alt="Logo" className="sm:w-16 w-12" />
        </div>

        <ul className="hidden md:flex items-center gap-x-5 text-white text-base tracking-tighter leading-24 cursor-pointer">
          <li>
            <p className={`${(activeNav.isHomeActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: true,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/")

            }}   >
              Home
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isSoftwareActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: true,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/software")
            }}>
              Software
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isRealEstateActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: true,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/real-estate")

            }} >
              Real Estate
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isGalleryActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: true,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/gallery")

            }} >
              Gallery
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isTechnicalActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: true,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/technical")

            }} >
              Technical
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isConstructionActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isConstructionActive: true,
                  isTechnicalActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/construction")

            }} >
              Construction
            </p>
          </li>
          
          <li>
            <p className={`${(activeNav.isExportActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: true,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/export")

            }} >
              Export
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isVisaActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: true,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/visa")

            }} >
              Visa
            </p>
          </li>
          
          
          <li>
            <p className={`${(activeNav.isTravelingActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: true,
                  isBlogActive: false
                }
              })
              router.push("/traveling")

            }} >
              Traveling
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isNoticeActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: true,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/notice")

            }} >
              Notice
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isOrdersActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: true,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/orders")

            }} >
              Orders
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isEmployeerActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: true,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/employers")
            }} >
              Employers
            </p>
          </li>
          
          <li>
            <p className={`${(activeNav.isBlogActive) && active}`}
              onClick={() => {

                setActiveNav(prevstate => {
                  return {
                    ...prevstate,
                    isHomeActive: false,
                    isRealEstateActive: false,
                    isSoftwareActive: false,
                    isGalleryActive: false,
                    isTechnicalActive: false,
                    isConstructionActive: false,
                    isOurServiceActive: false,
                    isNoticeActive: false,
                    isExportActive: false,
                    isVisaActive: false,
                    isOrdersActive: false,
                    isEmployeerActive: false,
                    isTravelingActive: false,
                    isBlogActive: true
                  }
                })
                router.push("/news")

              }} >
              Blog
            </p>
          </li>
          <li>
            {isUserAuthhenticated ? (
              <div className="relative">
                <Image
                  src={
                    "/images/upload-avatar.png"
                  }
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="cursor-pointer rounded-full"
                  onClick={() => {
                    // Use window.location.href for redirection
                    //  window.location.href = "/dashboard/profile";
                    router.push('/dashboard/profile')
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveNav(prevstate => {
                    return {
                      ...prevstate,
                      isHomeActive: false,
                      isRealEstateActive: false,
                      isSoftwareActive: false,
                      isGalleryActive: false,
                      isTechnicalActive: false,
                      isConstructionActive: false,
                      isOurServiceActive: false,
                      isNoticeActive: false,
                      isExportActive: false,
                      isVisaActive: false,
                      isOrdersActive: false,
                      isEmployeerActive: false,
                      isTravelingActive: false,
                      isBlogActive: false
                    }
                  })
                  openModal()
                }}
                className="w-[100px] h-[40px] rounded-md bg-[#fff] px-3 py-1 font-semibold text-base tracking-widest text-primary"
              >
                Sign Up
              </button>
            )}
          </li>
        </ul>
        <button onClick={openMenu} className="text-white text-2xl font-bold cursor-pointer md:hidden flex">&#9776;</button>

        {isModalOpen && <SignIn onClose={closeModal} />}
      </nav>

      <nav className={`${isOpen ? 'left-0' : 'left-[-100%]'} md:hidden fixed top-0 bg-gray-900  w-full h-screen p-5 z-10 transition-all duration-300`}>
        <ul className="flex flex-col space-y-4 text-white font-semibold cursor-pointer pb-5">
          <li>
            <p className={`${(activeNav.isHomeActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: true,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/")

            }}   >
              Home
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isSoftwareActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: true,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/software")
            }}>
              Software
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isRealEstateActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: true,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/real-estate")

            }} >
              Real Estate
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isGalleryActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: true,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/gallery")

            }} >
              Gallery
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isTechnicalActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: true,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/technical")

            }} >
              Technical
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isConstructionActive) && active}`} onClick={() => {

              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isConstructionActive: true,
                  isTechnicalActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/construction")

            }} >
              Construction
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isOurServiceActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: true,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/our-service")

            }} >
              Our Service
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isNoticeActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: true,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/notice")

            }} >
              Notice
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isExportActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: true,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/export")

            }} >
              Export
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isVisaActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: true,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/visa")

            }} >
              Visa
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isOrdersActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: true,
                  isEmployeerActive: false,
                  isTravelingActive: false,
                  isBlogActive: false
                }
              })
              router.push("/orders")

            }} >
              Orders
            </p>
          </li>
          <li>

            <p className={`${(activeNav.isTravelingActive) && active}`} onClick={() => {
              setActiveNav(prevstate => {
                return {
                  ...prevstate,
                  isHomeActive: false,
                  isRealEstateActive: false,
                  isSoftwareActive: false,
                  isGalleryActive: false,
                  isTechnicalActive: false,
                  isConstructionActive: false,
                  isOurServiceActive: false,
                  isNoticeActive: false,
                  isExportActive: false,
                  isVisaActive: false,
                  isOrdersActive: false,
                  isEmployeerActive: false,
                  isTravelingActive: true,
                  isBlogActive: false
                }
              })
              router.push("/traveling")

            }} >
              Traveling
            </p>
          </li>
          <li>
            <p className={`${(activeNav.isBlogActive) && active}`}
              onClick={() => {

                setActiveNav(prevstate => {
                  return {
                    ...prevstate,
                    isHomeActive: false,
                    isRealEstateActive: false,
                    isSoftwareActive: false,
                    isGalleryActive: false,
                    isTechnicalActive: false,
                    isConstructionActive: false,
                    isOurServiceActive: false,
                    isNoticeActive: false,
                    isExportActive: false,
                    isVisaActive: false,
                    isOrdersActive: false,
                    isEmployeerActive: false,
                    isTravelingActive: false,
                    isBlogActive: true
                  }
                })
                router.push("/news")

              }} >
              Blog
            </p>
          </li>
          <li>
            {isUserAuthhenticated ? (
              <div className="relative">
                <Image
                  src={
                    "/images/upload-avatar.png"
                  }
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="cursor-pointer rounded-full"
                  onClick={() => {
                    // Use window.location.href for redirection
                    //  window.location.href = "/dashboard/profile";
                    router.push('/dashboard/profile')
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveNav(prevstate => {
                    return {
                      ...prevstate,
                      isHomeActive: false,
                      isRealEstateActive: false,
                      isSoftwareActive: false,
                      isGalleryActive: false,
                      isTechnicalActive: false,
                      isConstructionActive: false,
                      isOurServiceActive: false,
                      isNoticeActive: false,
                      isExportActive: false,
                      isVisaActive: false,
                      isOrdersActive: false,
                      isEmployeerActive: false,
                      isTravelingActive: false,
                      isBlogActive: false
                    }
                  })
                  openModal()
                }}
                className="w-full block mt-2 text-center h-[38px] rounded-md bg-[#fff] px-3 py-1 font-semibold text-sm tracking-widest text-primary"
              > 
               Sign Up
              </button>
            )}
          </li>
        </ul>
        <button onClick={closeMenu} className="text-white text-3xl font-bold cursor-pointer absolute top-3 right-5">&times;</button>

        {isModalOpen && <SignIn onClose={closeModal} />}
      </nav>
      <div className="flex w-full">
        <div className={`bg-nav-bar-line-color h-[2px]`} style={{ width: `${progress}%` }}></div>
        <div className="bg-white  h-[2px]"></div>
      </div>
    </div>
  );
}

export default Navbar;