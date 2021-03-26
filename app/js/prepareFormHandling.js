const { getMapFromForm } = require("./lib");

module.exports = {
  prepareFormHandling: function prepareFormHandling(form, fields, submitBtn) {
    try {
      if (!(form && fields && submitBtn)) {
        throw new Error("form not defined");
      }
      fields.forEach(field => field.addEventListener("change", onChangeHandler));
      fields.forEach(field => field.addEventListener("mouseout", onChangeHandler));
      function onChangeHandler() {
        const resultMap = getMapFromForm(form);
        const resultArray = Array.from(resultMap.values());
        isFormFilled = resultArray.every(item => item) && resultMap.size === 4;

        if (isFormFilled) {
          submitBtn.classList.add("button--active");
          submitBtn.disabled ='false';

        } else {
          submitBtn.classList.remove("button--active");
          submitBtn.disabled ='true';
        }

        console.log("entries", resultArray);
        console.log("filled", isFormFilled);
      }
    } catch (err) {
      console.log(err);
    }
  },
};