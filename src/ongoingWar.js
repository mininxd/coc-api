import ongoingWar from "./lib/ongoingWarInfo.js";

(async () => {
  try {
  const info = await ongoingWar();

  ongoingWarState.innerHTML = info.state;
  
  ongoingWarVersus.innerHTML = `
  <div class="w-full flex justify-start gap-2 font-medium">
      <img src="${info.clanBadge.small}" class="w-[32px] h-[32px]">
    
    <li class="list-row">
    <div class="list-col-grow">
        ${info.clanName}
      <div class="text-xs">
    <div class="tooltip" data-tip="total stars">
      <i class="ri-star-line"></i> ${info.clanStars}
    </div>
      -
    <div class="tooltip" data-tip="total attacks">
      <i class="ri-sword-line"></i> ${info.clanAttacks}
    </div>
    
      </div>
    </div>
    </li>
  </div>
        
    <div class="w-full flex justify-end gap-2 font-medium">
    <li class="list-row">
      <div class="list-col-grow">
        ${info.opponentName}
      <div class="text-xs flex justify-end">
    <div class="tooltip" data-tip="total stars">
      <i class="ri-star-line"></i> ${info.opponentStars}
    </div>
      - 
    <div class="tooltip" data-tip="total attacks">
    <i class="ri-sword-line"></i> ${info.opponentAttacks}
    </div>
      </div>
    </div>
    </li>
          <img src="${info.opponentBadge.small}" class="w-[32px] h-[32px]">
        </div>
  `
  } catch(e) {
    
  }
})()