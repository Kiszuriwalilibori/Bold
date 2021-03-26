const { prepareHamburgerMenuNew } = require("./prepareHamburgerMenuNew");
const { prepareFormHandling } = require("./prepareFormHandling");

window.onload = function () {
    
    const hamburgerMenu = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const fields = Array.prototype.slice.call(document.getElementsByClassName("form__item"));
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit_button");
    
    prepareHamburgerMenuNew(hamburgerMenu, mobileMenu);
    prepareFormHandling(form, fields, submitButton);

}