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

document.addEventListener("DOMContentLoaded", () => {
  let storedData = JSON.parse(localStorage.getItem("storedData")) || [];

  const displayStoredData = () => {
    // modalContent가 저장된 데이터를 표시하는 컨테이너라고 가정
    modalContent.innerHTML = "";
    storedData.forEach((data) => {
      const storgedWrap = document.createElement("div");
      const delStorged = document.createElement("i");

      data.numbers.forEach((number) => {
        const span = document.createElement("span");
        span.textContent = number;
        // 숫자 에 따른 배경색 적용
        if (number < 11) span.style.backgroundColor = "#e4a716";
        else if (number < 21) span.style.backgroundColor = "#1993da";
        else if (number < 31) span.style.backgroundColor = "#e96353";
        else if (number < 41) span.style.backgroundColor = "#8f8f8f";
        else if (number < 46) span.style.backgroundColor = "#5ab545";
        storgedWrap.appendChild(span);
      });

      const bonusSpan = document.createElement("span");
      bonusSpan.textContent = "+" + data.bonus;
      bonusSpan.style.backgroundColor = "#fbc400";
      storgedWrap.appendChild(bonusSpan);

      delStorged.textContent = "x";
      storgedWrap.appendChild(delStorged);
      modalContent.appendChild(storgedWrap);

      delStorged.addEventListener("click", () => {
        storgedWrap.parentNode.removeChild(storgedWrap);
        // 이 데이터를 storedData에서 제거하고 localStorage 업데이트
        storedData = storedData.filter((item) => item !== data);
        localStorage.setItem("storedData", JSON.stringify(storedData));
      });
    });
  };

  // 초기에 저장된 데이터 표시
  displayStoredData();

  // 저장 버튼 클릭 이벤트 리스너
  storageBtn.addEventListener("click", () => {
    const numbers = localStorage.getItem("numbers").split(", ").map(Number);
    const bonus = localStorage.getItem("bonus");
    const dataToStore = { numbers, bonus };
    // 새 데이터를 storedData에 추가하고 localStorage에 저장
    storedData.push(dataToStore);
    localStorage.setItem("storedData", JSON.stringify(storedData));
    modal.style.display = "block";
    displayStoredData();
  });
});
