const { prepareHamburgerMenuNew } = require("./prepareHamburgerMenuNew");



window.onload = function () {
    console.log('ondload fired')

    const hamburgerMenu = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    prepareHamburgerMenuNew(hamburgerMenu, mobileMenu);
}