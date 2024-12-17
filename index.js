const radioDivs = document.querySelectorAll(".query-type");
const formGroups = document.querySelectorAll(".form-group");
const formElement = document.querySelector("form");
const toast = document.querySelector(".toast");
let formValid = true;

formElement.setAttribute("novalidate", "");

const changeRadioBg = () => {
  radioDivs.forEach((radioDiv) => {
    const radio = radioDiv.querySelector("input");
    radioDiv.classList.toggle("radio-selected", radio.checked);
  });
};


const displayError = (formGroup, errorClass) => {
  const errorMessage = formGroup.querySelector(errorClass);
  if (errorMessage) {
    errorMessage.classList.remove("hidden");
  }
};


  
const removeError = (formGroup) => {
  const errorMessages = formGroup.querySelectorAll(".error");
  errorMessages.forEach((error) => error.classList.add("hidden"));
};


 
const validateGroup = (formGroup) => {
  const input = formGroup.querySelector("input, textarea");
  if (!input) return; 

  const inputType = input.type;

  switch (inputType) {
    case "radio":
      const radioInputs = formGroup.querySelectorAll("input");
      const isChecked = Array.from(radioInputs).some((input) => input.checked);
      if (!isChecked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "checkbox":
      if (!input.checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "text":
    case "textarea":
      if (input.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "email":
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (input.value.trim() === "") {
        displayError(formGroup, ".empty");
        formValid = false;
      } else if (!emailPattern.test(input.value)) {
        displayError(formGroup, ".valid");
        formValid = false;
      }
      break;

    default:
      break;
  }
};


const displayToast = () => {
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
};


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showToast") === "true") {
    displayToast();
    localStorage.removeItem("showToast");
  }
});


radioDivs.forEach((radioDiv) => {
  radioDiv.addEventListener("click", () => {
    const radioInput = radioDiv.querySelector("input");
    radioInput.checked = true;
    changeRadioBg();
    removeError(radioDiv.closest(".form-group"));
  });
});


formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  formValid = true;

  formGroups.forEach((formGroup) => validateGroup(formGroup));

  if (formValid) {
    localStorage.setItem("showToast", "true");
    formElement.submit();
  }
});


formGroups.forEach((formGroup) => {
  const inputs = formGroup.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => removeError(formGroup)); // Mejor "input" que "click"
    input.addEventListener("blur", () => validateGroup(formGroup));
  });
});


toast.addEventListener("click", () => toast.classList.add("hidden"));
