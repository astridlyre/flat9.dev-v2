import { InstagramIcon, LinkedInIcon, Triangle } from "./components/Icons";
export default {
  siteName: "flat9.dev",
  name: "Erin Burton",
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
    text: "View my Resume",
    title: "See some of my recent work",
    href: "/work",
    icon: Triangle,
  },
};
