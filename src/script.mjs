import { getUserIds, calculateRevisionDates } from "./common.mjs";
import { addData, getData } from "../data/storage.mjs";

const selectUser = document.getElementById("select-user");
const formTopic = document.getElementById("topic-form");
const topicInput = document.getElementById("revision-topic");
const dateInput = document.getElementById("start-date");
const agendaContainer = document.getElementById("agenda-container");
const agendaList = document.getElementById("agenda-list");
const agendaMsg = document.getElementById("agenda-msg");

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

function renderAgenda(data) {
  agendaList.innerHTML = "";
  agendaMsg.textContent = "";

  if (!data || data.length === 0) {
    agendaMsg.textContent = `No revision agenda for this user!`;
    return;
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  sortedData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = ` ${item.topic} - ${item.date}`;
    agendaList.appendChild(li);
  });

  agendaContainer.appendChild(agendaList);
}

selectUser.addEventListener("change", (e) => {
  const userId = e.target.value;

  if (!userId) return;

  const data = getData(userId);
  renderAgenda(data);
});

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
  const updatedData = getData(userId);
  renderAgenda(updatedData);

  formTopic.reset();
  selectUser.selectedIndex = 0;
  dateToday();
});

populateUserSelector();
dateToday();
