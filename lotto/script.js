const button = document.querySelector("button");
const result = document.querySelector("#result");
const textResult = document.querySelector("#textresult");
const generate = document.querySelector("#generate");
const storageBtn = document.querySelector("#storageButton");
const closeBtn = document.querySelector("#close-btn");
const modal = document.querySelector("#storage-modal");
const storageGenerate = document.querySelector("#storageGenerate");
const storage = document.querySelector("#storage");

//로컬스토리지 저장

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
    let remainingNumbers = new Set();
    for (let i = 1; i <= maxNumber; i++) {
      if (!sortedNumbers.includes(i)) {
        remainingNumbers.add(i);
      }
    }
    let remainingArray = [...remainingNumbers];
    let bonusNumber =
      remainingArray[Math.floor(Math.random() * remainingArray.length)];
    const numbers = sortedNumbers.join(", ");

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
      localStorage.setItem("numbers", numbers);
    });

    // 추가 번호
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

// 모달창 나오기

const modalContent = document.querySelector("#storage-modal-content");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
storageGenerate.addEventListener("click", () => {
  modal.style.display = "block";
});

// document.addEventListener("DOMContentLoaded", () => {
//   const storedData = JSON.parse(localStorage.getItem("storedData"));
//   if (storedData) {
//     // 저장된 데이터를 사용하여 모달창 내용 생성
//     // 예시: 모달창에 저장된 숫자와 보너스 번호를 표시
//     const storedNumbers = storedData.numbers;
//     const storedBonus = storedData.bonus;

//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const storgedWrap = document.createElement("div");
  const delStorged = document.createElement("i");
  const storedData = JSON.parse(localStorage.getItem("storedData"));
  console.log(storedData);
  if (storedData) {
    const storedNumbers = storedData.numbers;
    const storedBonus = storedData.bonus;
    storedNumbers.forEach((number) => {
      const span = document.createElement("span");
      span.textContent = number;
      // 숫자 범위에 따른 배경색 적용
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
      storgedWrap.appendChild(span); // 또는 특정 요소에 추가
    });
    const bonusSpan = document.createElement("span");
    bonusSpan.textContent = "+" + storedBonus;
    bonusSpan.style.backgroundColor = "#fbc400";
    storgedWrap.appendChild(bonusSpan);
    delStorged.textContent = "x";
    storgedWrap.appendChild(delStorged);
    modalContent.appendChild(storgedWrap);
  }
});

// 저장 및 삭제
storageBtn.addEventListener("click", () => {
  const storedNumbers = localStorage.getItem("numbers").split(", ");
  const storedBonus = localStorage.getItem("bonus");
  const storgedWrap = document.createElement("div");
  const delStorged = document.createElement("i");

  const dataToStore = {
    numbers: localStorage.getItem("numbers").split(", "),
    bonus: localStorage.getItem("bonus"),
  };
  localStorage.setItem("storedData", JSON.stringify(dataToStore));

  storedNumbers.forEach((number) => {
    const span = document.createElement("span");
    span.textContent = number;
    // 숫자 범위에 따른 배경색 적용
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
    storgedWrap.appendChild(span); // 또는 특정 요소에 추가
  });
  const bonusSpan = document.createElement("span");
  bonusSpan.textContent = "+" + storedBonus;
  bonusSpan.style.backgroundColor = "#fbc400";
  storgedWrap.appendChild(bonusSpan);
  delStorged.textContent = "x";
  storgedWrap.appendChild(delStorged);
  modalContent.appendChild(storgedWrap);
  modal.style.display = "block";
  delStorged.addEventListener("click", () => {
    storgedWrap.parentNode.removeChild(storgedWrap);
  });
});
