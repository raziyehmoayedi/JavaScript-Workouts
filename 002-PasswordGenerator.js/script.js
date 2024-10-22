const yourPassword = document.querySelector(".your-pass");
const lableDescribPowerOfPassword = document.querySelector(
  ".label-describe-power-of-pas"
);
const passwordImage = document.querySelector(".pictures-of-password img");
const copyPassBtn = document.querySelector(".btn-copy-pass button");
const lengthPass = document.querySelector(".line-range");
const lengthPassNumber = document.querySelector(".label-settings span");
const decreaseNumberOfLeghtPass = document.querySelector(".decrease");
const increaseNumberOfLeghtPass = document.querySelector(".increase");
const newRandomPass = document.querySelector(".fa-repeat");
const uppercasePass = document.getElementById("uppercase");
const lowercasePass = document.getElementById("lowercase");
const numbersPass = document.getElementById("numbers");
const symbolsPass = document.getElementById("symbols");
const tooltip = document.querySelector(".tooltip");
const passwordStatus = [
  { min: 3, max: 5, label: "Very Weak", color: "#eb4d4b", imgIndex: 1 },
  { min: 5, max: 8, label: "Weak", color: "#f0932b", imgIndex: 2 },
  { min: 8, max: 10, label: "Good", color: "#f6e58d", imgIndex: 3 },
  { min: 10, max: 12, label: "Strong", color: "#badc58", imgIndex: 4 },
  { min: 12, max: 32, label: "Very Strong", color: "#6ab04c", imgIndex: 5 },
];

let leght = lengthPass.value;

////////////////Password length: X

function updatPasswordStatus(leght) {
  lengthPassNumber.textContent = lengthPass.value;
  const strength = passwordStatus.find(
    (status) => leght >= status.min && leght < status.max
  );

  if (leght >= strength.min && leght < strength.max) {
    passwordImage.src = `./images/${strength.imgIndex}.png`;
    lableDescribPowerOfPassword.textContent = strength.label;
    lableDescribPowerOfPassword.style.backgroundColor = strength.color;
  }
}

lengthPass.addEventListener("input", function () {
  updatPasswordStatus(lengthPass.value);
  console.log(passwordImage.src);

  createRandomPassword();
});

//////////////////////////////-+

function adjustPasswordLength(increment) {
  const newValue = parseInt(lengthPass.value) + increment;
  if (newValue >= 3 && newValue <= 32) {
    lengthPass.value = newValue;
    lengthPass.dispatchEvent(new Event("input"));
  }
}

// decreaseNumberOfLeghtPass.addEventListener("click", function () {
//   if (lengthPass.value > 3) {
//     lengthPass.value--;
//     lengthPass.dispatchEvent(new Event("input"));
//   }
// });
// increaseNumberOfLeghtPass.addEventListener("click", function () {
//   if (lengthPass.value < 32) {
//     lengthPass.value++;
//     lengthPass.dispatchEvent(new Event("input"));
//   }
// });

///////////////////////////Characters used:

function createRandomPassword() {
  if (
    !uppercasePass.checked &&
    !lowercasePass.checked &&
    !numbersPass.checked &&
    !symbolsPass.checked
  ) {
    lowercasePass.checked = true;
    createRandomPassword();
    return;
  }

  const leght = lengthPass.value;
  const characturs = [
    uppercasePass.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    lowercasePass.checked ? "abcdefghijklmnopqrstuvwxyz" : "",
    numbersPass.checked ? "0123456789" : "",
    symbolsPass.checked ? "!@#$%^&*()_+{}[]<>?" : "",
  ].join("");

  let yourPass = "";
  for (let i = 0; i < leght; i++) {
    const randomIndex = Math.floor(Math.random() * characturs.length);
    yourPass += characturs[randomIndex];
  }

  yourPassword.textContent = yourPass;

  console.log(yourPass);
}

decreaseNumberOfLeghtPass.addEventListener("click", () =>
  adjustPasswordLength(-1)
);
increaseNumberOfLeghtPass.addEventListener("click", () =>
  adjustPasswordLength(1)
);

newRandomPass.addEventListener("click", function () {
  createRandomPassword();
});

[uppercasePass, lowercasePass, numbersPass, symbolsPass].forEach((checkbox) => {
  checkbox.addEventListener("change", createRandomPassword);
});

copyPassBtn.addEventListener("click", function () {
  console.log("copy");

  tooltip.classList.add("show");
  setTimeout(() => {
    tooltip.classList.remove("show");
  }, 5000);
});

lengthPass.dispatchEvent(new Event("input"));
