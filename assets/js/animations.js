// page load animation
export const defaultAnimationTiming = {
  duration: 1000,
  iterations: 1,
  easing: "ease-out",
};
export const fadeInRight = [
  { opacity: 0, transform: "translateX(25%)" },
  { opacity: 1 },
];
export const fadeInLeft = [
  { opacity: 0, transform: "translateX(-25%)" },
  { opacity: 1 },
];
export const fadeIn = [{ opacity: 0 }, { opacity: 1 }];
