import AOS from "aos";
export const DisableAOS = () => {
  AOS.init({
    disable: window.innerWidth < 1024 ? true : false,
  });
};
