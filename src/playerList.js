import clanInfo from "./lib/clanInfo.js";

(async () => {
  const playerList = document.getElementById("playerList");
  const info = await clanInfo();
  
  
  for(let i = 0; i < info.member.length; i++ ) {
  let memberRole = "member";
  if(info.member[i].role == "leader") { memberRole = "leader" } else if(info.member[i].role == "coLeader") {
    memberRole = "co leader" 
  } else if(info.member[i].role == "admin") {
    memberRole = "elder"
  }
  
  playerList.innerHTML += `
    <li class="p-2 pb-2 flex w-full my-1 bg-base-100 shadow-sm rounded-box">
      <img src="
      ${info.member[i].league.iconUrls.small}"
      class="w-[32px] h-[32px] mr-3">
      <div class="list-col-grow w-full">
        <div class="text-bold flex justify-between">
        <span>${info.member[i].name}</span>
        <span class="badge badge-xs badge-outline badge-ghost uppercase">${memberRole}</span>
        </div>
        <div class="text-xs opacity-60">
         ${info.member[i].tag} - ${info.member[i].league.name} (<i class="ri-trophy-line"></i> ${info.member[i].trophies})
        </div>
      </div>
    </li>
  `
  }
})()