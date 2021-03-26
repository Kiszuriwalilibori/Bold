
const { mountClickAndEnterHandler, throttled} = require("./lib");

module.exports = {
  prepareHamburgerMenuNew: function prepareHamburgerMenu(target, menu) {
    try {
      if (!(target && menu)) {
        
        throw new Error("can not open hamburger menu - missing or falsey arguments");
      }
     
      toggleClassMenuMobile = function () {
        menu.classList.add("mobile-menu--animatable");	
        if(!menu.classList.contains("mobile-menu--visible")) {		
          menu.classList.add("mobile-menu--visible");
        } else {
          menu.classList.remove('mobile-menu--visible');		
        }	
      },

      OnTransitionEndMenuMobile =function () {
        menu.classList.remove("mobile-menu--animatable");
      }
      menu.addEventListener("transitionend", OnTransitionEndMenuMobile, false);
      mountClickAndEnterHandler(target, throttled(toggleClassMenuMobile, 300));
      mountClickAndEnterHandler(menu, throttled(toggleClassMenuMobile, 300));

    } catch (err) {console.log(err)}

  },
};
