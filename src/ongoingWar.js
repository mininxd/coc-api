import ongoingWar from "./lib/ongoingWarInfo.js";

(async () => {
  try {
  const info = await ongoingWar();
  const ongoingWarState = document.getElementById("ongoingWarState");
  const ongoingWarsPlayers = document.getElementById("ongoingWarsPlayers");
  const ongoingWarVersus = document.getElementById("ongoingWarVersus");
  
let state = info.state;
 if(info.state == "inWar") {
   state = "in war";
 } else if(info.state == "notInWar") {
   state = "not war"
 } else if(info.state == "warEnded") {
   state = "war ended"
 }
 
 let clanName = info.clanName;
 let opponentName = info.opponentName;
 
 if(clanName == undefined) {
   clanName = ""
   opponentName = ""
 }
 
  ongoingWarState.innerHTML = state;
  ongoingWarVersus.innerHTML = `
  <div class="w-full flex justify-between items-center font-medium gap-2">
    <div class="flex items-center gap-2">
      <img src="${info.clanBadge.small}" class="w-[32px] h-[32px]" alt="Clan Badge">
      <div class="list-row">
        <div class="list-col-grow">
          ${clanName}
          <div class="text-xs flex gap-1 mt-1">
            <div class="tooltip" data-tip="total stars">
              <i class="ri-star-line"></i> ${info.clanStars}
            </div>
            <span class="mx-[2px]"></span>
            <div class="tooltip" data-tip="total attacks">
              <i class="ri-sword-line"></i> ${info.clanAttacks}
            </div>
            <span class="mx-[2px]"></span>
            <div class="tooltip" data-tip="total destruction">
              <i class="ri-sparkling-2-line"></i> ${info.clanDestruction}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div class="list-row text-right">
        <div class="list-col-grow">
          ${opponentName}
          <div class="text-xs flex gap-1 justify-end mt-1">
            <div class="tooltip" data-tip="total stars">
              <i class="ri-star-line"></i> ${info.opponentStars}
            </div>
            <span class="mx-[2px]"></span>
            <div class="tooltip" data-tip="total attacks">
              <i class="ri-sword-line"></i> ${info.opponentAttacks}
            </div>
            <span class="mx-[2px]"></span>
            <div class="tooltip" data-tip="total destruction">
              <i class="ri-sparkling-2-line"></i> ${info.opponentDestruction}
            </div>
          </div>
        </div>
      </div>
      <img src="${info.opponentBadge.small}" class="w-[32px] h-[32px]" alt="Opponent Badge">
    </div>
  </div>
`;

ongoingWarProgress.innerHTML = `
  <div class="w-full h-2 flex rounded overflow-hidden">
    <div class="bg-success" style="width: calc(${info.clanDestruction} / (${info.clanDestruction} + ${info.opponentDestruction}) * 100%)"></div>
    <div class="bg-error" style="width: calc(${info.opponentDestruction} / (${info.clanDestruction} + ${info.opponentDestruction}) * 100%)"></div>
  </div>
`;

  
for (let i = 0; i < info.clanMember.length; i++) {
  let clanMemberStars = 0;
  let opponentMemberStars = 0;
  let clanMemberAttacks = 0;
  let opponentMemberAttacks = 0;
  let clanMemberDestruction = 0;
  let opponentMemberDestruction = 0;

  const clanAttacks = info.clanMember[i].attacks || [];
  const opponentAttacks = info.opponentMember[i].attacks || [];

  if (clanAttacks.length > 0) {
    clanMemberAttacks = clanAttacks.length;
    clanMemberStars = clanAttacks.reduce((sum, attack) => sum + (attack.stars || 0), 0);
    clanMemberDestruction = clanAttacks.reduce((sum, attack) => sum + (attack.destructionPercentage || 0), 0);
  }

  if (opponentAttacks.length > 0) {
    opponentMemberAttacks = opponentAttacks.length;
    opponentMemberStars = opponentAttacks.reduce((sum, attack) => sum + (attack.stars || 0), 0);
    opponentMemberDestruction = opponentAttacks.reduce((sum, attack) => sum + (attack.destructionPercentage || 0), 0);
  }

  
  
  ongoingWarsPlayers.innerHTML += `
    <li class="w-full flex justify-between bg-base-100 rounded-box shadow-sm mb-2">
    <div class="flex justify-start gap-2">
      <div class="font-medium list-row w-full">
        <div>
         <span class="opacity-60 text-xs">${info.clanMember[i].tag}</span>
          <div class="text-lg">${info.clanMember[i].name} 
          </div>
          <div class="flex text-xs font-normal">
          <span class="mx-1">
            <i class="ri-star-line"></i>
            ${clanMemberStars}
          </span>
          <span class="mx-1">
            <i class="ri-sword-line"></i>
            ${clanMemberAttacks}
          </span>
          <span class="mx-1">
            <i class="ri-sparkling-2-line"></i>
            ${clanMemberDestruction}%
          </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end">
      <div class="font-medium text-right list-row w-full">
        <div>
        <span class="opacity-60 text-xs">${info.opponentMember[i].tag}</span>
          <div class="text-lg">${info.opponentMember[i].name}</div>
          <div class="text-xs font-normal">
          <span class="mx-1">
            <i class="ri-star-line"></i>
            ${opponentMemberStars}
          </span>
          <span class="mx-1">
            <i class="ri-sword-line"></i>
            ${opponentMemberAttacks}
          </span>
          <span class="mx-1">
            <i class="ri-sparkling-2-line"></i>
            ${opponentMemberDestruction}%
          </span>
            </div>
        </div>
      </div>
    </div>
  </li>
  `
  }
  
  } catch(e) {
    
  }
})()