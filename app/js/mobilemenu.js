
module.exports = {

toggleClassMenuMobile = function toggleClassMenuMobile() {
	myMenu.classList.add("menu--animatable");	
	if(!myMenu.classList.contains("menu--visible")) {		
		myMenu.classList.add("mobile-menu--visible");
	} else {
		myMenu.classList.remove('mobile-menu--visible');		
	}	
},

OnTransitionEndMenuMobile =function OnTransitionEndMenuMobile() {
	myMenu.classList.remove("menu--animatable");
}

}
var myMenu = document.querySelector(".mobile-menu");
var oppMenu = document.querySelector(".menu-icon");//


myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);