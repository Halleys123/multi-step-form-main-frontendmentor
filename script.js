const btn1 = document.querySelector(".pageTwoBtn1");
const btn2 = document.querySelector(".pageTwoBtn2");
const btn3 = document.querySelector(".pageTwoBtn3");

let userData = [
  {
    info: { name: "", mail: "", phone: "" },
    plan: 0,
    planName: "",
    duration: "",
    addOnsNames: ["Online  service", "Large storage", "Customizable Profile"],
    addOns: [],
    addOnsPrice: [1, 2, 2],
  },
];
let selected = 0;
btn1.addEventListener("click", (e) => {
  e.preventDefault();
  btn1.classList.add("selected");
  btn2.classList.remove("selected");
  btn3.classList.remove("selected");
  document.querySelectorAll(".pageTwoBtn").forEach((element) => {
    element.classList.remove("invalid");
  });
  selected = 1;
});

btn2.addEventListener("click", (e) => {
  e.preventDefault();
  btn2.classList.add("selected");
  btn1.classList.remove("selected");
  btn3.classList.remove("selected");
  selected = 2;
  document.querySelectorAll(".pageTwoBtn").forEach((element) => {
    element.classList.remove("invalid");
  });
});

btn3.addEventListener("click", (e) => {
  e.preventDefault();
  btn3.classList.add("selected");
  btn2.classList.remove("selected");
  btn1.classList.remove("selected");
  selected = 3;
  document.querySelectorAll(".pageTwoBtn").forEach((element) => {
    element.classList.remove("invalid");
  });
});

const checkbox = document.querySelectorAll(".threeCheck");
const checkboxParent = document.querySelectorAll(".firstElementThirdPage");
checkbox.forEach((element) => {
  element.addEventListener("click", (e) => {
    // console.log();
    if (e.target.checked)
      e.srcElement.parentElement.parentElement.classList.add("checked");
    else e.srcElement.parentElement.parentElement.classList.remove("checked");
  });
});
checkboxParent.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    document.querySelector(`.check${index + 1}`).click();
  });
});
const confirm = document.querySelector(".confirm");

//------------------Functionality------------------//
let currentPage = 1;
function nextPage() {
  document.getElementById(`${currentPage}`).classList.add("hide");
  document.getElementById(`step${currentPage}`).classList.remove(`active`);
  currentPage++;
  document.getElementById(`${currentPage}`).classList.remove("hide");
  document.getElementById(`step${currentPage}`).classList.add(`active`);
  console.log(currentPage);
}
function previousPage() {
  document.getElementById(`${currentPage}`).classList.add("hide");
  document.getElementById(`step${currentPage}`).classList.remove(`active`);
  currentPage--;
  document.getElementById(`${currentPage}`).classList.remove("hide");
  document.getElementById(`step${currentPage}`).classList.add(`active`);
  userData[0].addOns = [];
}
const frontBtn = document.querySelectorAll(".firstBtn");
const backBtn = document.querySelectorAll(".backButton");
frontBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.parentElement.parentElement.id == "1") {
      let invalid = 3;
      if (document.querySelector(".phoneNumber").value == "")
        document.querySelector(".phoneNumber").classList.add("invalid");
      if (document.querySelector(".name").value == "")
        document.querySelector(".name").classList.add("invalid");
      else document.querySelector(".name").classList.remove("invalid");
      if (document.querySelector(".email").value == "")
        document.querySelector(".email").classList.add("invalid");

      if (
        document.querySelector(".phoneNumber").classList.contains("invalid")
      ) {
        document
          .querySelector(".one2")
          .parentElement.classList.add("errorMessageShow");
        invalid++;
      } else {
        document
          .querySelector(".one2")
          .parentElement.classList.remove("errorMessageShow");
        invalid--;
      }
      if (document.querySelector(".email").classList.contains("invalid")) {
        document
          .querySelector(".one1")
          .parentElement.classList.add("errorMessageShow");
        invalid++;
      } else {
        document
          .querySelector(".one1")
          .parentElement.classList.remove("errorMessageShow");
        invalid--;
      }
      if (document.querySelector(".name").classList.contains("invalid")) {
        document
          .querySelector(".one3")
          .parentElement.classList.add("errorMessageShow");
        invalid++;
      } else {
        document
          .querySelector(".one3")
          .parentElement.classList.remove("errorMessageShow");
        invalid--;
      }

      if (invalid == 0) {
        console.log(invalid);
        userData[0].info.name = document.querySelector(".name").value;
        userData[0].info.mail = document.querySelector(".email").value;
        userData[0].info.phone = document.querySelector(".phoneNumber").value;
        nextPage();
      }
    } else if (e.target.parentElement.parentElement.id == "2") {
      if (selectPlan()) nextPage();
    } else if (e.target.parentElement.parentElement.id == "3") {
      addOns();
      nextPage();
      finalize();
    } else if (e.target.parentElement.parentElement.id == "4") {
      nextPage();
    }
  });
});
backBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    previousPage();
  });
});
function getKey() {
  document.addEventListener("keydown", (event) => {
    return event.key;
  });
}
function phoneNumberFormatterAndValidator(e) {
  const validChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];
  if (e.target.value.length == 3 || e.target.value.length == 9) {
    if (e.target.value[e.target.value.length - 1] != "-") {
      e.target.value =
        e.target.value.slice(0, e.target.value.length - 1) +
        "-" +
        e.target.value[e.target.value.length - 1];
    }
  }
  if (e.target.value.length == 15) {
    e.target.value = e.target.value.slice(0, 14);
  }
  if (!validChars.includes(e.target.value[e.target.value.length - 1])) {
    e.target.classList.add("invalid");
    e.target.classList.remove("valid");
  } else {
    if (e.target.value.length != 3 && e.target.value.length != 9) {
      e.target.classList.remove("invalid");
      e.target.classList.add("valid");
    } // if () e.target.classList.remove("invalid");
  }
  if (e.target.value == "") e.target.classList.add("invalid");
}
document.querySelector(".phoneNumber").addEventListener("input", (e) => {
  phoneNumberFormatterAndValidator(e);
});
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
document.querySelector(".name").addEventListener("input", (e) => {
  if (e.target.value != "") e.target.classList.add("valid");
  else e.target.classList.remove("valid");
});
document.querySelector(".email").addEventListener("input", (e) => {
  if (e.target.value == "") {
    e.target.classList.remove("invalid");
  }
  if (!validateEmail(e.target.value)) {
    e.target.classList.add("invalid");
  } else {
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");
  }
});
function selectPlan() {
  if (selected == 0) {
    document.querySelectorAll(".pageTwoBtn").forEach((element) => {
      element.classList.add("invalid");
    });
    return 0;
  }
  if (selected == 1) {
    userData[0].planName = "Arcade";
    userData[0].plan = 9;
  } else if (selected == 2) {
    userData[0].planName = "Advanced";
    userData[0].plan = 12;
  } else if (selected == 3) {
    userData[0].planName = "Pro";
    userData[0].plan = 15;
  }
  if (document.querySelector(".checkbox").checked) {
    userData[0].plan *= 10;
    userData[0].duration = "Yearly";
    userData[0].addOnsPrice.forEach((element, index) => {
      userData[0].addOnsPrice[index] *= 10;
    });
  } else {
    userData[0].plan *= 1;
    userData[0].duration = "Monthly";
  }
  return 1;
}

function addOns() {
  if (document.querySelector(".check1").checked) {
    userData[0].addOns[0] = true;
  } else {
    userData[0].addOns[0] = false;
  }
  if (document.querySelector(".check2").checked) {
    userData[0].addOns[1] = true;
  } else {
    userData[0].addOns[1] = false;
  }
  if (document.querySelector(".check3").checked) {
    userData[0].addOns[2] = true;
  } else {
    userData[0].addOns[2] = false;
  }
}
function finalize() {
  let finalPrice = 0;
  document.querySelector(
    ".finalHead"
  ).innerHTML = `${userData[0].planName} (${userData[0].duration}) `;
  document.querySelector(".finalPrice").innerHTML = `$${userData[0].plan}${
    userData[0].duration == "Yearly" ? "/yr" : "/mo"
  }`;
  document.querySelector(".bottomFinal").innerHTML = "";
  userData[0].addOnsNames.forEach((element, index) => {
    if (userData[0].addOns[index]) {
      const html = `
    <div class="firstLine">
      <p class="firstLineText">${element}</p>
      <p class="firstLineText lastPrice">+$${userData[0].addOnsPrice[index]}${
        userData[0].duration == "Yearly" ? "/yr" : "/mo"
      }</p>
  </div>`;
      finalPrice += userData[0].addOnsPrice[index];
      document
        .querySelector(".bottomFinal")
        .insertAdjacentHTML("beforeend", html);
    }
  });
  document.querySelector(".last").innerHTML = `Total (per ${
    userData[0].duration == "Yearly" ? "year" : "month"
  })`;
  finalPrice += userData[0].plan;
  document.querySelector(".finalRate").innerHTML = `$${finalPrice}${
    userData[0].duration == "Yearly" ? "/yr" : "/mo"
  }`;
}
document.addEventListener("onload", () => {
  phoneNumberFormatterAndValidator();
});

document.querySelector(".checkbox").addEventListener("click", (e) => {
  if (e.target.checked == true) {
    document.querySelector(".circle").style.right = 0;
    document.querySelector(".circle").style.left = "90%";
    document.querySelector(".circle").style.transform = "translateX(-90%)";
    document
      .querySelector(".monthly")
      .classList.remove("currentlySelectedPlan");
    document.querySelector(".yearly").classList.add("currentlySelectedPlan");
    document.querySelectorAll(".yearlyMessage").forEach((element) => {
      element.classList.remove("hidden");
      element.classList.add("hiddenNot");
    });
  } else {
    document.querySelector(".circle").style.right = "90%";
    document.querySelector(".circle").style.transform = "translateX(10%)";
    document.querySelector(".circle").style.left = 0;
    document.querySelector(".monthly").classList.add("currentlySelectedPlan");
    document.querySelector(".yearly").classList.remove("currentlySelectedPlan");
    document.querySelectorAll(".yearlyMessage").forEach((element) => {
      element.classList.add("hidden");
      element.classList.remove("hiddenNot");
    });
  }
});
document.querySelector(".link").addEventListener("click", (e) => {
  e.preventDefault();
  previousPage();
  previousPage();
  userData[0].planName = "";
  selected = 0;
  btn1.classList.remove("selected");
  btn2.classList.remove("selected");
  btn3.classList.remove("selected");
});
//IntersectionObserver help
document.addEventListener("DOMContentLoaded", () => {
  if (screen.width <= 375) {
    document.querySelector(".back").style.display = "none";
  }
});
