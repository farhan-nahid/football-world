const displayAllTeamContainer = document.getElementById("display__all__team");
const apiKey = 1;

const collectTeams = () => {
  fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/all_leagues.php`)
    .then((res) => res.json())
    .then((team) => displayTeam(team.leagues));
};

collectTeams();

const displayTeam = (allTeams) => {
  displayAllTeamContainer.textContent = "";
  for (const team of allTeams) {
    const { strLeague, strSport, idLeague } = team;
    const teamDiv = document.createElement("div");
    teamDiv.setAttribute("class", "card");
    teamDiv.innerHTML = ` 
        <h1>${strLeague}</h1>
        <h3>Type: ${strSport}</h3>
        <button onclick=displayDetails(${idLeague})>Details</button> 
    `;
    displayAllTeamContainer.appendChild(teamDiv);
  }
};

const displayDetails = (id) => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookupleague.php?id=${id}`
  )
    .then((res) => res.json())
    .then((team) => openModal(team.leagues[0]));
};

// open modal & show details
const modalContainer = document.getElementById("team__detail");
const openModal = (team) => {
  console.log(team);
  const {
    strBanner,
    strDescriptionEN,
    strGender,
    strFanart1,
    strFanart2,
    strFanart3,
    strFanart4,
    strSport,
    strCurrentSeason,
    strCountry,
    dateFirstEvent,
    strTvRights,
  } = team;
  modalContainer.style.display = "block";
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.innerHTML = `
        <div class="modal__image">
          <button id="cross__icon">&times;</button>
          <img src="${strBanner}" alt="" />
        </div>
        <div class="modal__content">
          <h4>${strCountry}</h4>
          <h4>Details</h4>
          <p>${strDescriptionEN}</p>  
          <h4>Category: ${strSport} </h4>   
          <h4>Season: ${strCurrentSeason}</h4> 
          <h4>Achievements</h4>
          <div class="achievements">
            <img src="${strFanart1}" alt="" />
            <img src="${strFanart2}" alt="" />
            <img src="${strFanart3}" alt="" />
            <img src="${strFanart4}" alt="" />
          </div>
          <h4>Invent: ${dateFirstEvent} </h4>
          <h4>Tv Rights: ${strTvRights} </h4>
          <h4>Gender: ${strGender} </h4>  
          <p class="copyright">&copy; Copyright All Right Reserved By Farhan</p>
        </div>
  `;

  modalContainer.appendChild(modal);

  // hide modal
  document.getElementById("cross__icon").addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalContainer.textContent = "";
  });
};
