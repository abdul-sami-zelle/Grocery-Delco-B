"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaTruckMovingSolid } from "react-icons/lia";
import "./Header.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { getCategories,getHeaderDepartments} from '../../lib/api'
import ComingSoonPopup from "../comingSoon/comingSoon";



export default function Header({ onDeptClick, onDiscountClick, activeDeptId }) {
  // const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDelcoMenu, setShowDelcoMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Delco Farmers");
  const [departments, setDepartments] = useState([]);
  const [headerDepts, setHeaderDepts] = useState([]);
  const [trendDepartments, setTrendDepartments] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [activeDept, setActiveDept] = useState(activeDeptId || null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);
  const [showAisleDropdown, setShowAisleDropdown] = useState(false);
  const aisleDropdownRef = useRef(null);

  const handleDeptClick = (dept) => {
    const name = dept.name?.toLowerCase();
    window.location.href = dept.url;
  };
  const slides = [
    "/assets/Images/1.jpg",
    "/assets/Images/2.jpg",
    "/assets/Images/3.jpg",
    "/assets/Images/4.jpg",
  ];

  

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const updateIndicator = (element) => {
    if (element && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      setIndicatorStyle({
        left: elementRect.left - containerRect.left,
        width: elementRect.width,
      });
    }
  };

  const handleMouseEnter = (e) => {
    updateIndicator(e.currentTarget);
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector(".sidebar-dept-item.active");
      if (activeEl) {
        updateIndicator(activeEl);
      }
    }
  };
  // 1. Subdomain matching logic helper
  const getActiveDeptBySubdomain = (items) => {
    if (typeof window === "undefined") return null;
    const currentHost = window.location.hostname.toLowerCase();

    let matchedKeyword = "";
    if (currentHost.includes("grocery.")) matchedKeyword = "grocery";
    else if (currentHost.includes("butchershop.")) matchedKeyword = "butcher shop";
    else if (currentHost.includes("bakery.")) matchedKeyword = "bakery";
    else if (currentHost.includes("food.")) matchedKeyword = "prepared food";
    else if (currentHost.includes("floral.")) matchedKeyword = "floral";

    if (!matchedKeyword) return null;

    const found = items.find(dept => dept.name?.toLowerCase() === matchedKeyword);
    return found ? found._id : null;
  };

  useEffect(() => {
    if (headerDepts.length > 0) {
      const matchedId = getActiveDeptBySubdomain(headerDepts);
      if (matchedId) {
        setActiveDept(matchedId);
      }
    }
  }, [headerDepts]);

  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector(".sidebar-dept-item.active");
      if (activeEl) {
        const timer = setTimeout(() => updateIndicator(activeEl), 100);
        return () => clearTimeout(timer);
      } else {
        const firstEl = containerRef.current.querySelector(".sidebar-dept-item");
        if (firstEl) updateIndicator(firstEl);
      }
    }
  }, [headerDepts, activeDept]);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aisleDropdownRef.current && !aisleDropdownRef.current.contains(event.target)) {
        setShowAisleDropdown(false);
      }
    };

    if (showAisleDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAisleDropdown]);
  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      setTransition(false);
      setIndex(1);
    }
    if (index === 0) {
      setTransition(false);
      setIndex(slides.length);
    }
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sideCart = document.querySelector(".side-cart-contaner");
  //     if (!sideCart) return;

  //     if (window.scrollY > 80) {
  //       sideCart.classList.add("sidecart-scrolled");
  //     } else {
  //       sideCart.classList.remove("sidecart-scrolled");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   handleScroll();

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [showSideCart]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);



  useEffect(() => {
    async function fetchHeaderDepts() {
      setLoading(true);
      const data = await getHeaderDepartments();
      if (data) {
        setHeaderDepts(data);
      }
      setLoading(false);
    }
    async function fetchData() {
      setLoading(true);
      const data = await getCategories();
      if (data) {
        setDepartments(data);

        const count =
          data.length <= 5 ? 2 : Math.floor(data.length / 2); // rule
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomSelected = shuffled.slice(0, count);

        setTrendDepartments(randomSelected);
      }
      setLoading(false);
    }
    async function getDicounts() {
      setLoading(true);
      const data = await getSalesProductData();
      if (data?.data) {
        setDiscounts(data?.data);
      }
      setLoading(false);
    }
    fetchData();
    getDicounts();
    fetchHeaderDepts();
  }, []);


  const [showSidebarDepts, setShowSidebarDepts] = useState(false);
  const [showSidebarAisles, setShowSidebarAisles] = useState(true);

  const [isOpen, setIsOpen] = useState(false);











  return (
    <>
      <header className="header">
        <div className="topbar-container">
          <div className="topbar">
            <div className="hamburger-with-heading">
              <div className="hamburger-btn">
                <button
                  className="hamburger"
                  onClick={() => setShowSidebar(true)}
                >
                  <HiMenuAlt1 />
                </button>
              </div>
              <a style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }} href="https://delcofarmersmarket.com">
                <img
                  src="/assets/Images/header-logo.png"
                  className="header-logo desktop"
                  alt="Delco Farmers Market"
                />
                <img
                  src="/assets/Images/header-logo2.png"
                  className="header-logo mobile"
                  alt="Delco Farmers Market"
                />
              </a>

              <div className="search-container">
                <span
                  className="delco-fresh-btn"
                  onClick={() => { }}
                >
                  {selectedCategory} <IoMdArrowDropdown />
                </span>
                <input readOnlys type="text" placeholder="Delco Search" />
                <span className="search-icon">
                  <IoSearch size={20} />
                </span>
                {showDelcoMenu && (
                  <div className="delco-menu">
                    <ul>
                      {departments.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setSelectedCategory(item.name);
                            setShowDelcoMenu(false);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="topbar-right">
              <RiAccountCircleLine onClick={() => { setIsOpen(true) }} size={30} color="#ffff" />
              <MdOutlineShoppingCart
                  size={30}
                  color="#fff"
                  onClick={()=>{setIsOpen(true)}}
                />
            </div>
          </div>
        </div>
        <div className="MainMenuDelcoTopContainer">

        </div>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              <div className="modal-head-center">
                <img src="/assets/Images/logo.png" alt="Delco Farmers Market" />
                <h2>Delco Farmers Market</h2>
                <p className="subtext">Fresh • Quality • Local</p>
              </div>

              <p className="modal-intro">
                We’re a neighborhood market focused on fresh produce, trusted
                meats, and everyday essentials — delivered to your door or ready
                for pickup. No fluff, just good food you can count on.
              </p>

              <div className="modal-grid">
                <div className="modal-item">
                  <h4>What we do</h4>
                  <ul>
                    <li>Daily-picked fruits & vegetables</li>
                    <li>Halal-certified meats & pantry</li>
                    <li>Fresh bakery & ready meals</li>
                    <li>Delivery & curbside pickup</li>
                  </ul>
                </div>
                <div className="modal-item">
                  <h4>Store hours</h4>
                  <ul>
                    <li>Mon–Sat: 8:00 AM – 9:00 PM</li>
                    <li>Sunday: 9:00 AM – 7:00 PM</li>
                    <li>Same-day delivery (selected areas)</li>
                  </ul>
                </div>
              </div>

              <div className="modal-cta">
                <button
                  className="btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Start Shopping
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showSidebar && (
          <div
            className="sidebar-overlay"
            onClick={() => setShowSidebar(false)}
          >
            <div className="sidebar" onClick={(e) => e.stopPropagation()}>
              <div className="sidebar-header">
                <img src="/assets/Images/logo.png" alt="logo" />
                <h2>Delco Farmers Market</h2>
              </div>

              {/* <div className="sidebar-dropdown">
                <div
                  className="sidebar-dropdown-header"
                  onClick={() => setShowSidebarAisles((prev) => !prev)}
                >
                  <span>Aisles</span>
                  <IoMdArrowDropdown
                    className={showSidebarAisles ? "rotate" : ""}
                  />
                </div>

                {showSidebarAisles && (
                  <div className="sidebar-dropdown-content">
                    {departments.map((dept) => (
                      <div
                        key={dept._id}
                        className="sidebar-dept-item"
                        style={{ padding: '4px 0px' }}
                        onClick={() => {
                          setShowSidebar(false);
                          onDeptClick(dept._id); // SAME as header
                        }}
                      >
                        <img
                          src={`https://api.delcofarmersmarket.com${dept.image}`}
                          alt={dept.name}
                        />
                        <span>{dept.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}


              <div className="sidebar-dropdown">
                <div
                  className="sidebar-dropdown-header"
                  onClick={() => setShowSidebarDepts((prev) => !prev)}
                >
                  <span>Departments</span>
                  <IoMdArrowDropdown
                    className={showSidebarDepts ? "rotate" : ""}
                  />
                </div>

                {showSidebarDepts && (
                  <div className="sidebar-dropdown-content">
                    {headerDepts?.map((dept) => (
                      <div
                        key={dept._id}
                        className="sidebar-dept-item"
                        style={{ padding: '4px 0px' }}
                        onClick={() => {
                          setShowSidebar(false);
                          handleDeptClick(dept);
                        }}
                      >
                        <img
                          src={`https://api.delcofarmersmarket.com${dept.image}`}
                          alt={dept.name}
                        />
                        <span>{dept.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>




              <div className="sidebar-actions">
                <button onClick={() => { setIsOpen(true) }} className="btn sign-in">Sign Up</button>
                <button onClick={() => { setIsOpen(true) }} className="btn cart">Sign In</button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="sub-header">
        <div className="sub-header-container">
          <div onClick={() => router.push("/")} className="sub-header-logo-container dropdown">
            <img
              src="/assets/Images/edit-logo.png"
              className="sub-header-logo"
              alt=""
            />

          </div>

          {/* <span style={{ color: "lightgray", fontSize: "20px" }}>|</span> */}




          {/* <div className="sub-header-left">


            <div className="dropdown" ref={aisleDropdownRef}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAisleDropdown((prev) => !prev);
                }}
              >
                Aisles <MdKeyboardArrowDown size={20} />
              </a>

              {showAisleDropdown && (
                <div className="dropdown-menu" style={{ display: "block" }}>
                  <div
                    className="explore-container"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 2fr))",
                      gap: "20px",
                      maxHeight: "600px",
                      overflowY: "auto",
                    }}
                  >
                    {departments
                      .reduce((rows, dept, index) => {
                        const rowIndex = Math.floor(index / 10);
                        if (!rows[rowIndex]) rows[rowIndex] = [];
                        rows[rowIndex].push(dept);
                        return rows;
                      }, [])
                      .map((group, i) => (
                        <ul key={i} style={{ listStyle: "none", padding: 0, display: 'flex', flexWrap: 'wrap' }}>
                          {group.map((dept) => (
                            <li
                              key={dept._id}
                              onClick={() => {
                                onDeptClick(dept._id);
                                setShowAisleDropdown(false); // Item click hote hi dropdown band ho jaye
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "8px 12px",
                                cursor: "pointer",
                                width: 'fit-content',
                                fontSize: "var(--fs-14)",
                                fontWeight: "var(--fw-400)"
                              }}
                            >
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "10px",
                                  borderRadius: "4px",
                                }}
                                src={`https://api.delcofarmersmarket.com${dept.image}`}
                                alt={dept.name}
                              />
                              {dept.name}
                            </li>
                          ))}
                        </ul>
                      ))}
                  </div>
                </div>
              )}
            </div>


          </div> */}
          <div className="MainMenuDelcoTopContainersss">
            <div className="departments_Headersss" ref={containerRef} style={{ position: "relative" }}>

              {loading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="DpaertmentShimmerDevDesktopItem DpaertmentShimmerDev">
                      <div className="DpaertmentShimmerDevDesktopImg DpaertmentShimmerDev"></div>
                      <div className="DpaertmentShimmerDevDesktopText DpaertmentShimmerDev"></div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {headerDepts?.map((dept) => {
                    const isActive = activeDept === dept._id;
                    return (
                      <div
                        key={dept._id}
                        className={`sidebar-dept-item ${isActive ? "active" : ""}`}
                        onClick={() => {
                          setActiveDept(dept._id);
                          setShowSidebar(false);
                          handleDeptClick(dept);
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={`https://api.delcofarmersmarket.com${dept.image}`}
                          alt={dept.name}
                        />
                        <span>{dept.name}</span>
                      </div>
                    );
                  })}

                  <div
                    className="movable-line-indicator"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: "0",
                      borderRadius: '5px',
                      height: "32px",
                      backgroundColor: "#ececec",
                      width: `${indicatorStyle.width}px`,
                      transform: `translateX(${indicatorStyle.left}px)`,
                      transition: "transform 0.3s ease, width 0.3s ease",
                      pointerEvents: "none"
                    }}
                  />
                </>
              )}

            </div>
          </div>



          <div className="sub-header-right">
            <div className="location">
              <span>
                1850 Delmar drive, Folcroft, PA
              </span>
            </div>
            <div className="sub-header-right-buttons">
              <button
                className={"active"}
              >
                <span>
                  <img src="/assets/Icons/store.png" alt="pickup" />
                </span>{" "}
                Pickup
              </button>


              <button
                className={activeModal === "delivery" ? "active" : ""}
                onClick={() => { setIsOpen(true) }}
              >
                <span>
                  <LiaTruckMovingSolid className="truck-icon" />
                </span>
                Delivery
              </button>


            </div>


          </div>
        </div>

        <div className="overlay"></div>
      </div>
      <div className="MainMenuDelcoTopContainersssMobile" style={{ height: '60px' }}>
        <div className="departments_Headersss" style={{ position: "relative", gap: '12px', color: 'var(--dark-medium-green)', padding: '10px' }}>

          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="DpaertmentShimmerDevMobileItem DpaertmentShimmerDev" style={{ flexShrink: '0', borderRadius: '6px' }}>
                  <div className="DpaertmentShimmerDevMobileText DpaertmentShimmerDev"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {headerDepts?.map((dept) => {
                const isActive = activeDept === dept._id;
                return (
                  <div
                    key={dept._id}
                    className={`sidebar-dept-item ${isActive ? "active" : ""}`}
                    style={{ flexShrink: '0', backgroundColor: '#ffffff', borderRadius: '6px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px', userSelect: 'none' }}
                    onClick={() => {
                      setActiveDept(dept._id);
                      setShowSidebar(false);
                      handleDeptClick(dept);
                    }}
                  >
                    <span style={{ userSelect: 'none' }}>{dept.name}</span>
                  </div>
                );
              })}
            </>
          )}

        </div>
      </div>
      {activeModal === "delivery" && (
        <DeliveryModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "pickup" && (
        <LocationModal onClose={() => setActiveModal(null)} />
      )}

      <ComingSoonPopup isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
    </>
  );
}
