import { getUserIds } from "./common.mjs";

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

populateUserSelector();
