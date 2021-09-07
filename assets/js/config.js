import {
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
  Triangle,
} from "./components/Icons";
export default {
  siteName: "flat9",
  name: "Erin Burton",
  siteHeading: `I make websites <span>work</span>.`,
  siteLinks: [
    {
      name: "about",
      href: "/about",
      title: "Learn more about me",
    },
    {
      name: "my work",
      href: "/work",
      title: "See some of my work",
    },
    {
      name: "contact",
      href: "/contact",
      title: "Contact Me",
    },
  ],
  footerLinks: [
    {
      icon: GitHubIcon,
      title: "Visit my GitHub page (external link)",
      href: "https://www.github.com/astridlyre",
    },
    {
      icon: InstagramIcon,
      title: "Visit my Instagram page (external link)",
      href: "https://www.instagram.com/artsyidler",
    },
    {
      icon: LinkedInIcon,
      title: "Visit my LinkedIn page (external link)",
      href: "https://www.linkedin.com/in/ebflat9/",
    },
  ],
  cta: {
    text: "See my work",
    title: "See some of my recent work",
    href: "/work",
    icon: Triangle,
  },
  superSecretSecret:
    "SGVsbG8sIG15IG5hbWUgaXMgRXJpbiBCdXJ0b24gYW5kIEkgbG92ZSBjYXRzCg==",
  API_ENDPOINT: window.location.href.includes("flat9")
    ? "https://flat9-backend.herokuapp.com/api"
    : "http://localhost:3001/api",
  SECRET_ENDPOINT: window.location.href.includes("flat9")
    ? "https://flat9-backend.herokuapp.com/"
    : "http://localhost:3001/",
  SECRET_HEADER: "ilovecats",
};
