import { getUserIds, calculateRevisionDates } from "./common.mjs";

const selectUser = document.getElementById("select-user");
const formTopic = document.getElementById("topic-form");
const dateInput = document.getElementById("start-date");

// DEFAULT DATE = TODAY
dateInput.value = new Date().toISOString().split("T")[0];

const populateUserSelector = function () {
  const ids = getUserIds();

  ids.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    selectUser.appendChild(option);
  });
};

selectUser.addEventListener("change", (e) => {
  const selectedUser = e.target.value;
  return selectedUser;
});

formTopic.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectUser.value) {
    alert("Select a user first!");
    return;
  }
});

populateUserSelector();
window.checkDates = calculateRevisionDates;
