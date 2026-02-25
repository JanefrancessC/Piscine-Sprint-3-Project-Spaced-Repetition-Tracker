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

function renderAgenda(data, userId) {
  agendaList.innerHTML = "";
  agendaMsg.textContent = "";

  if (!userId) return;

  const today = new Date().toISOString().split("T")[0];
  const upcomingRevisions = (data || []).filter((item) => item.date >= today);

  if (upcomingRevisions.length === 0) {
    agendaMsg.textContent = `No revision agenda for User ${userId}!`;
    return;
  }

  const sortedData = [...upcomingRevisions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  sortedData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = ` ${item.topic}, ${item.date}`;
    agendaList.appendChild(li);
  });
}

selectUser.addEventListener("change", (e) => {
  const userId = e.target.value;

  if (!userId) {
    agendaList.innerHTML = "";
    agendaMsg.textContent = "";
    return;
  }

  const data = getData(userId);
  renderAgenda(data, userId);
});

formTopic.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = selectUser.value;
  const topic = topicInput.value.trim();
  const startDate = dateInput.value;

  if (!userId) {
    agendaMsg.textContent = `Please select a user to add an agenda!`;
    return;
  }

  agendaMsg.textContent = "";

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
  renderAgenda(updatedData, userId);

  formTopic.reset();
  dateToday();
});

populateUserSelector();
dateToday();
