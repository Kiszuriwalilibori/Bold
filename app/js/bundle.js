(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { throttle } = require("./throttle");

function isFunction(x) {
  return Object.prototype.toString.call(x) == "[object Function]";
}
const getRandomBoolean = ()=>Math.random() >= 0.5;



function getMapFromForm(form) {
  try {
    var myMap = new Map();
    formData = new FormData(form);
    for (var pair of formData.entries()) {
      myMap.set(pair[0], pair[1]);
    }

    return myMap;
  } catch (err) {
    console.log('something is wrong in getMapFromForm function');
    return null;
  }
}








function isNode(o) {
  return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}

function reportError(err) {
  try {
    if (!err instanceof Error) {
      throw new Error("it is not error object");
    }
    console.error(err.name, "\n", "\n", err.message, "\n", "\n", err.stack);
  } catch (e) {
    console.log(e.message);
  }
}

function getAttributeValue(target, attr) {
  const item = document.getElementById(target);
  if (item) {
    const style = item.currentStyle || window.getComputedStyle(item);
    return style[attr] ? parseInt(style[attr], 10) : 0;
  } else {
    return 0;
  }
}

module.exports = {
  getRandomBoolean:getRandomBoolean,
  isNode: isNode,
  reportError: reportError,
  getAttributeValue: getAttributeValue,
  getMapFromForm: getMapFromForm,
  mountClickAndEnterHandler: function mountClickAndEnterHandler(item, fn) {
    try {
      if (!isNode(item)) {
        throw new Error("item is not a node");
      }
      if (!isFunction(fn)) {
        throw new Error("fn is not a function");
      }
      if (!item || !document.body.contains(item)) {
        throw new Error("item is not a HTML node within document body");
      }
      item.addEventListener("click", fn);
      item.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          fn(event);
        }
      });

      if (item.toUpperCase !== "BUTTON" && !item.hasAttribute("tabindex")) {
        item.setAttribute("tabindex", "0");
      }
    } catch (err) {
      reportError(err);
    }
  },
  throttled: function throttled(fn, delay) {
    return typeof throttle !== "undefined" ? throttle(fn, delay) : throttle;
  },
};

},{"./throttle":5}],2:[function(require,module,exports){
const { prepareHamburgerMenuNew } = require("./prepareHamburgerMenuNew");
const { prepareFormHandling } = require("./prepareFormHandling");

window.onload = function () {
    
    const hamburgerMenu = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const fields = Array.prototype.slice.call(document.getElementsByClassName("form__item"));
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit_button");
    const messageBox = document.getElementById("message_box");
    
    prepareHamburgerMenuNew(hamburgerMenu, mobileMenu);
    prepareFormHandling(form, fields, submitButton, messageBox);

}
},{"./prepareFormHandling":3,"./prepareHamburgerMenuNew":4}],3:[function(require,module,exports){
const { getMapFromForm, getRandomBoolean } = require("./lib");

const validators = {
  firstname: {
    run: data => {
      return getRandomBoolean();
    },
  },
  lastname: {
    run: data => {
      return getRandomBoolean();
    },
  },
  phone_number: {
    run: data => {
      return getRandomBoolean();
    },
  },
  services: {
    run: data => {
      return getRandomBoolean();
    },
  },
};

module.exports = {
  prepareFormHandling: function prepareFormHandling(form, fields, submitBtn, messageBox) {
    try {
      if (!(form && fields && submitBtn && messageBox)) {
        throw new Error("one or more arguments of prepareFormHandling fn are not sert or invalid");
      }

      fields.forEach(field => field.addEventListener("change", checkFields));
      fields.forEach(field => field.addEventListener("mouseout", checkFields));
      form.addEventListener("submit", mockSubmit);

      function mockSubmit(e) {
        e.preventDefault();
        const resultMap = getMapFromForm(form);

        const nonValidated = new Map();
        resultMap.forEach((value, key) => {
          if (!validators[key].run(value)) {
            nonValidated.set(key, value);
          }
        });

        if (nonValidated.size) {
          const errorsString = Array.from(nonValidated.keys()).toString();
          messageBox.classList.add("message-box--visible", "message-box--warning");
          messageBox.innerText = `Niezwalidowano ${errorsString}`;
          setTimeout(clearMessage, 3000);
        } else {
          const random = getRandomBoolean();
          setTimeout(clearMessage, 3000);
          switch (random) {
            case true:
              messageBox.classList.add("message-box--visible", "message-box--success");
              messageBox.innerText = "Pomyślnie dostarczono dane";
              break;
            case false:
              messageBox.classList.add("message-box--visible", "message-box--failure");
              messageBox.innerText = "Niestety nie udło się dostarczyć danych";
              break;
            default: {
              messageBox.classList.add("message-box--visible", "message-box--failure");
              messageBox.innerText = "Niestety nie udło się dostarczyć danych";
            }
          }
        }

        function clearMessage() {
          messageBox.classList.remove("message-box--visible", "message-box--failure", "message-box--success");
        }
      }

      function checkFields() {
        const resultMap = getMapFromForm(form);
        const resultArray = Array.from(resultMap.values());
        isFormFilled = resultArray.every(item => item) && resultMap.size === 4;

        if (isFormFilled) {
          submitBtn.classList.add("button--active");
          submitBtn.disabled = false;
        } else {
          submitBtn.classList.remove("button--active");
          submitBtn.disabled = true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};

},{"./lib":1}],4:[function(require,module,exports){

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

},{"./lib":1}],5:[function(require,module,exports){
module.exports = {
  throttle: function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;

      setTimeout(function () {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  },
};

},{}]},{},[2]);
