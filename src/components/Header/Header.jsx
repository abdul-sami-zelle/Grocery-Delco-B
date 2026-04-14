"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaTruckMovingSolid } from "react-icons/lia";
import "./Header.css";
import { CartContext } from "../../context/addToCart";
import { IoMdArrowDropdown } from "react-icons/io";
import { getSalesProductData, getCategories, getHeaderDepartments } from "@/lib/api";
import LocationModal from "../LocationModal/LocationModal";
import DeliveryModal from "../DeliveryModal/DeliveryModal";
import ComingSoonPopup from "../comingSoon/comingSoon";
import ComingSoonPopup2 from "../comingSoon2/comingSoon";

export default function Header({ onDeptClick, onDiscountClick }) {
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

  const slides = [
    "/assets/Images/1.jpg",
    "/assets/Images/2.jpg",
    "/assets/Images/3.jpg",
    "/assets/Images/4.jpg",
  ];

  const { showSideCart, setShowSideCart, cart } = useContext(CartContext);

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      const sideCart = document.querySelector(".side-cart-contaner");
      if (!sideCart) return;

      if (window.scrollY > 80) {
        sideCart.classList.add("sidecart-scrolled");
      } else {
        sideCart.classList.remove("sidecart-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSideCart]);

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

        // pick random departments
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
      if (data?.sales) {
        setDiscounts(data?.sales);
      }
      setLoading(false);
    }
    fetchData();
    getDicounts();
    fetchHeaderDepts();
  }, []);


  const [showSidebarDepts, setShowSidebarDepts] = useState(true);
  const [showSidebarAisles, setShowSidebarAisles] = useState(true);
  const [showSidebarDiscounts, setShowSidebarDiscounts] = useState(true);
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
                            setShowSidebar(false);

                            if (item.name?.toLowerCase() === "grocery") {
                              window.location.href = item.url;
                            } else {
                              setIsOpen(true); // Coming Soon popup
                            }
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
              {!showSideCart && (
                <MdOutlineShoppingCart
                  size={30}
                  color="#fff"
                  onClick={() => { setIsOpen(true) }}
                />
              )}
            </div>
          </div>
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
                        onClick={() => {
                          setShowSidebar(false);

                          if (dept.name?.toLowerCase() === "grocery") {
                            window.location.href = dept.url;
                          } else {
                            setIsOpen(true); // Coming Soon popup
                          }
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
          <div className="sub-header-logo-container dropdown">
            <img
              src="/assets/Images/edit-logo.png"
              className="sub-header-logo"
              alt=""
            />
            {/* <MdKeyboardArrowDown size={20} />

            <div className="dropdown-menu">
              <ul>
                <li>About Us</li>
                <li>Contact Support</li>
                <li>In-Store Mode</li>
                <li>Sustainability</li>
                <li>Grocery Subscription</li>
                <li>Prime Savings</li>
              </ul>
            </div> */}
          </div>

          <span style={{ color: "lightgray", fontSize: "20px" }}>|</span>




          <div className="sub-header-left">

            <div className="dropdown">
              <a href="#">
                Departments <MdKeyboardArrowDown size={13} />
              </a>
              <div className="dropdown-menu">
                <div className="explore-container depts">
                  <div className="" style={{ flex: 1 }}>
                    <ul>
                      {headerDepts && headerDepts?.map((dept) => (
                     
                          <li key={dept._id}>
                            <a
                              href={dept.name?.toLowerCase() === "grocery" ? dept.url :"#"}
                              onClick={(e) => {
                                e.preventDefault();

                                if (dept.name?.toLowerCase() === "grocery") {
                                  window.location.href = dept.url;
                                } else {
                                  setIsOpen(true); // Coming Soon popup
                                }
                              }}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                style={{ width: "20px", height: "20px", marginRight: "10px" }}
                                src={"https://api.delcofarmersmarket.com" + dept.image}
                                alt={dept.name}
                              />
                              {dept.name}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="sub-header-right">
            <div className="location">
              <span>
                1850 Delmar drive, Folcroft, PA
                {/* <span className="down-icon">
                  <MdKeyboardArrowDown />
                </span> */}
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

      {activeModal === "delivery" && (
        <DeliveryModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "pickup" && (
        <LocationModal onClose={() => setActiveModal(null)} />
      )}

      <ComingSoonPopup2 isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
    </>
  );
}
