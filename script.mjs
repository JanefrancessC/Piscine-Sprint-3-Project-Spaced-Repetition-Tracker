import { getUserIds, calculateRevisionDates } from "./common.mjs";

const selectUser = document.getElementById("select-user");

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

populateUserSelector();
window.checkDates = calculateRevisionDates;
