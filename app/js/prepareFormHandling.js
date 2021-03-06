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
          const errorsIdArray = Array.from(nonValidated.keys());
          errorsIdArray.forEach(id => {
            document.getElementsByName(id)[0].classList.add("form__input--not-validated");
          });
          setTimeout(() => clearMessage(errorsIdArray), 3000);
        } else {
          const random = getRandomBoolean();
          setTimeout(clearMessage, 3000);
          switch (random) {
            case true:
              messageBox.classList.add("message-box--visible", "message-box--success");
              messageBox.innerText = "Pomyślnie dostarczono dane";
              form.reset();
              break;
            case false:
              messageBox.classList.add("message-box--visible", "message-box--failure");
              messageBox.innerText = "Niestety nie udało się dostarczyć danych";
              break;
            default: {
              messageBox.classList.add("message-box--visible", "message-box--failure");
              messageBox.innerText = "Niestety nie udało się dostarczyć danych";
            }
          }
        }

        function clearMessage(Ary) {
          messageBox.classList.remove("message-box--visible", "message-box--failure", "message-box--success", "message-box--warning");
          Ary.forEach(id => {
            console.log(id);
            document.getElementsByName(id)[0].classList.remove("form__input--not-validated");
          });
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
