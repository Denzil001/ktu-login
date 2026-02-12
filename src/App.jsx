import "./App.css";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faBuildingColumns,
  faSchool,
  faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect, useState } from "react";

function App() {
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const animating = useRef(false);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  /* ---------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* ---------- INITIAL STATE (ONLY FIRST VISIBLE) ---------- */
  useEffect(() => {
    gsap.set([card2.current, card3.current], {
      autoAlpha: 0,
      clipPath: "inset(0 100% 0 0)"
    });
  }, []);

  /* ---------- SWITCH CARD (PRIMITIVE SAFE LOGIC) ---------- */
  const switchCard = (index) => {
    if (animating.current || index === active) return;
    animating.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setActive(index);
        animating.current = false;
      }
    });

    /* RESET ALL */
    gsap.set(card1.current, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(card2.current, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(card3.current, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });

    /* CARD 1 */
    if (index === 0) {
      gsap.set(card1.current, { autoAlpha: 1 });

      tl.to(card1.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 0.5
      }, 0);

      tl.fromTo(
        card1.current.querySelectorAll(".title,.icon,p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 },
        0.1
      );
    }

    /* CARD 2 */
    if (index === 1) {
      gsap.set(card2.current, { autoAlpha: 1 });

      tl.to(card2.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 0.5
      }, 0);

      tl.fromTo(
        card2.current.querySelectorAll(".title,.icon,p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.5 },
        0.1
      );
    }

    /* CARD 3 */
    if (index === 2) {
      gsap.set(card3.current, { autoAlpha: 1 });

      tl.to(card3.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 0.5
      }, 0);

      tl.fromTo(
        card3.current.querySelectorAll(".title,.icon,p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.4 },
        0.1
      );
    }
  };

  return (
    <>
      <nav>
        <div>
          <img src="/logo.png" alt="logo" />
          <h1>APJ Abdul Kalam Technological University e-Governance Portal</h1>
        </div>

        <button
          className="menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>

        <div
          className={`dropdown ${open ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <p>HOME</p>
          <p>RESEARCH</p>
          <p>FAQ</p>
          <p>CONTACT US</p>
        </div>
      </nav>

      <div className="container">
        {/* LEFT PANEL */}
        <div className="left">
          <h2>Sign In</h2>

          <div className="content">
            <div className="input-group">
              <input type="text" required />
              <label>Username</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label>Password</label>
            </div>
            <a href="#">Forgot Password ?</a>
            <button>LOG IN</button>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="right">
          <div ref={card1} className="card">
            <div className="card-header">
              <FontAwesomeIcon icon={faSchool} className="icon" />
              <h1 className="title">Institutions</h1>
            </div>
            <p>Institutions that are affiliated/applying for affiliation with APJ Abdul Kalam Technological University can click here to login to the e-Gov application. Institution users can perform activities related to affiliation, student registration and academics, make fee payments etc. Colleges can view the student records that includes personal information, admission information, attendance details, internal evaluation details, mark lists, student history and other details after logging on. For the programs offered by the university, colleges can view the curriculum and choose the courses for each branch/stream running there.</p>
          </div>

          <div ref={card2} className="card">
            <div className="card-header">
              <FontAwesomeIcon icon={faUserGraduate} className="icon" />
              <h1 className="title">Students</h1>
            </div>
            <p>Students who are admitted in colleges affiliated to APJ Abdul Kalam Technological University can click here to login to the e-Gov application. Registered students can use the student portal to gain access to personalized information and also view their academic details, attendance and marks, earned credits etc. They can download their mark list, grade sheet etc and access educational information. The portal also allows students to securely communicate with the university.</p>
          </div>

          <div ref={card3} className="card">
            <div className="card-header">
              <FontAwesomeIcon icon={faBuildingColumns} className="icon" />
              <h1 className="title">University</h1>
            </div>
            <p>University staff such as management team, auditors, external trainers and other officials can login to the e-Gov application to perform various activities. Master data such as programs, schemes, branches/streams, courses, academic calendar etc can be set up by the administrators. Clusters can be set up, cluster members configured and curriculum managed for each cluster. University academic experts can prepare the Curriculum, Course Plan and Evaluation Plan for the various programs offered and set the rules for course selection by colleges. The management team can also issue orders, view payment information and respond to communication with colleges.</p>
          </div>
        </div>

        {/* DOT NAV */}
        <div className="dot">
          <div className={`slider ${active === 0 ? "active" : ""}`} onClick={() => switchCard(0)} />
          <div className={`slider ${active === 1 ? "active" : ""}`} onClick={() => switchCard(1)} />
          <div className={`slider ${active === 2 ? "active" : ""}`} onClick={() => switchCard(2)} />
        </div>
      </div>
    </>
  );
}

export default App;
