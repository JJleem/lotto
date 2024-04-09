const button = document.querySelector("button");
const result = document.querySelector("#result");
const textResult = document.querySelector("#textresult");
const generate = document.querySelector("#generate");
const storageBtn = document.querySelector("#storageButton");
const closeBtn = document.querySelector("#close-btn");
const modal = document.querySelector("#storage-modal");
const storageGenerate = document.querySelector("#storageGenerate");
generate.addEventListener("click", () => {
  textResult.style.opacity = "0";
  storage.style.opacity = "0";
  result.innerHTML = "";
  const luckyNumber = {
    digitCount: 6,
    maxNumber: 45,
  };
  const lottoPlay = () => {
    const { digitCount, maxNumber } = luckyNumber;
    const myNumber = new Set();

    while (myNumber.size < digitCount) {
      myNumber.add(Math.floor(Math.random() * maxNumber) + 1);
    }
    // 작은 순서대로 나열
    let sortedNumbers = [...myNumber].sort((a, b) => a - b);
    // 추가 번호 생성
    const bonusNumber = Math.floor(Math.random() * maxNumber) + 1;
    const numbers = sortedNumbers.join(" ");

    // 번호값에따른 배경색 변경
    sortedNumbers.forEach((number) => {
      const span = document.createElement("span");
      span.textContent = number + " ";
      span.style.opacity = "0";

      if (number < 11) {
        span.style.backgroundColor = "#e4a716";
      } else if (number < 21) {
        span.style.backgroundColor = "#1993da";
      } else if (number < 31) {
        span.style.backgroundColor = "#e96353";
      } else if (number < 41) {
        span.style.backgroundColor = "#8f8f8f";
      } else if (number < 46) {
        span.style.backgroundColor = "#5ab545";
      }
      result.appendChild(span);
      localStorage.setItem("numbers", [span]);
    });

    // 추가 번호 배경색 변경
    const plus = document.createElement("span");
    plus.textContent = "+";
    plus.style.backgroundColor = "transparent";
    plus.style.fontWeight = "bold";
    plus.style.color = "#000";

    result.appendChild(plus);

    let bonusSpan = document.createElement("span");
    bonusSpan.textContent = bonusNumber;
    bonusSpan.style.backgroundColor = "#fbc400";

    result.appendChild(bonusSpan);
    const bonus = bonusNumber.toString();
    localStorage.setItem("bonus", bonus);
    setTimeout(() => {
      textResult.style.opacity = "1";
      storage.style.opacity = "1";
    }, 2000);
  };

  lottoPlay();
  return;
});

const modalContent = document.querySelector("#storage-modal-content");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
storageGenerate.addEventListener("click", () => {
  modal.style.display = "block";
});

// 번호와 추가 번호를 문자열로 변환하여 저장

storageBtn.addEventListener("click", () => {
  const storedNumbers = localStorage.getItem("numbers");
  const storedBonus = localStorage.getItem("bonus");
  const storgedWrap = document.createElement("div");
  const storged = document.createElement("span");
  const delStorged = document.createElement("i");
  console.log(storedNumbers);
  // storged.forEach((e) => {
  //   console.log(e);
  // });

  storged.textContent = storedNumbers + "+" + storedBonus;
  delStorged.textContent = "삭제";
  storgedWrap.appendChild(storged);
  storgedWrap.appendChild(delStorged);
  modalContent.appendChild(storgedWrap);
  modal.style.display = "block";
});
