import "/src/pages/layout";
import "/src/styles/style.css";
import { gsap } from "gsap";

const tl = gsap.timeline();
tl.from(".visual img", { opacity: 0, x: 50 });
tl.from(".visual h2 span", { opacity: 0, x: -50, stagger: 0.2 });
