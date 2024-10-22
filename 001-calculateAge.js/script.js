const form = document.getElementById("age-form");

if (form) {
  form.addEventListener("submit", onSubmit);
}

function onSubmit(event) {
  event.preventDefault();

  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const day = isElementExist(dayInput, () => parseInt(dayInput?.value));
  const month = isElementExist(monthInput, () => parseInt(monthInput?.value));
  const year = isElementExist(yearInput, () => parseInt(yearInput?.value));

  const errorMessage = document.querySelector(".error-message");
  const yearsOutput = document.getElementById("years");
  const monthsOutput = document.getElementById("months");
  const daysOutput = document.getElementById("days");

  errorMessage.textContent = "";
  yearsOutput.textContent = "";
  monthsOutput.textContent = "";
  daysOutput.textContent = "";

  if (!day || !month || !year) {
    showFormErrorMessage(errorMessage, "You must fill all fields");
    return;
  } else if (day < 1 || day > 31) {
    showFormErrorMessage(errorMessage, "Must be a valid day");
    return;
  } else if (month < 1 || month > 12) {
    showFormErrorMessage(errorMessage, "Must be a valid month");
    return;
  }

  const today = new Date();
  const enteredDate = new Date(year, month - 1, day);

  if (enteredDate > today) {
    errorMessage.textContent = "must be in past";
    return;
  }

  const [ageYear, ageMonth, ageDay] = handleCalculateTheDifferenceDate(year, month, day, today)

  yearsOutput.textContent = `${ageYear} Years`;
  monthsOutput.textContent = `${ageMonth} Months `;
  daysOutput.textContent = `${ageDay} Days`;
}

function isElementExist(element, callBack) {
  return element ? callBack() : null;
}

function showFormErrorMessage(element, message) {
  isElementExist(element, () => (element.textContent = message));
}

function handleCalculateTheDifferenceDate(year, month, day, today) {
  let ageYear = today.getFullYear() - year;
  let ageMonth = today.getMonth() - (month - 1);
  let ageDay = today.getDate() - day;


  if (ageDay < 0) {
    ageDay += daysInMonth(today.getMonth(), today.getFullYear());
    ageMonth--;
}

if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
}

  return [ageYear, ageMonth, ageDay]
}

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
