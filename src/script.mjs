import { getUserIds, calculateRevisionDates } from "./common.mjs";
import { addData } from "../data/storage.mjs";

const selectUser = document.getElementById("select-user");
const formTopic = document.getElementById("topic-form");
const topicInput = document.getElementById("revision-topic");
const dateInput = document.getElementById("start-date");

// DEFAULT DATE = TODAY
const dateToday = () =>
  (dateInput.value = new Date().toISOString().split("T")[0]);

const populateUserSelector = function () {
  const ids = getUserIds();

  ids.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    selectUser.appendChild(option);
  });
};

// selectUser.addEventListener("change", (e) => {
//   const selectedUser = e.target.value;
//   return selectedUser;
// });

formTopic.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = selectUser.value;
  const topic = topicInput.value.trim();
  const startDate = dateInput.value;

  if (!userId) {
    alert("Select a user first!");
    return;
  }

  if (!topic || !startDate) return;

  const dates = calculateRevisionDates(startDate);
  const revisionData = dates.map((date) => {
    return {
      topic,
      date,
    };
  });

  addData(userId, revisionData);

  formTopic.reset();
  selectUser.selectedIndex = 0;
  dateToday();

  console.log(`New topics added ${topic} for User ${userId}`);
});

populateUserSelector();
dateToday();
window.checkDates = calculateRevisionDates;
