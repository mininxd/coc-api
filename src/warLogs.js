import { logs } from "./lib/warInfo.js";

(async () => {
  const info = await logs();
  const warLogList = document.getElementById("warLogList");
  const totalWarlogs = document.getElementById("totalWarlogs");
  
  let fontDesktop = "";
  let j = 0;
  let lose = 0;
  let win = 0;
  for(let i = 0; i < info.items.length; i++) {
  win++;
  let result = "border-success-content bg-success text-success-content";
  let hideUndefinedOpponent = "";
  
  if(!navigator.userAgent.includes("Mobile")) {
  fontDesktop = "text-lg"
  }
  if(info.items[i].result !== "win") {
    result = "border-error-content bg-error text-error-content";
    lose++;
  }
  
  if(!info.items[i].opponent.name) {
    hideUndefinedOpponent = "hidden";
    j++;
  }
    totalWarlogs.innerHTML = `${win - lose - j}/${lose - j}`
    
    
warLogList.innerHTML += `
  <div class="bg-base-100 shadow-md border rounded-box ${result} ${hideUndefinedOpponent} my-1 px-2">
    <div class="flex justify-between mt-2 px-1 text-xs opacity-60">
      <span class="copy">${info.items[i].clan.tag}</span>
      <span class="copy">${info.items[i].opponent.tag}</span>
    </div>

    <div class="flex justify-between mt-[-5px]">
    
      <!-- Clan -->
      <div class="w-full flex justify-start mt-[-5px]">
        <img src="${info.items[i].clan.badgeUrls.small}" class="w-[32px] h-[32px] mt-5 ml-[2px]">
        <li class="list-row">
          <div class="list-col-grow">
            <div class="text-white text-clash-bold ${fontDesktop}">
              ${info.items[i].clan.name}
            </div>
            <div class="text-xs opacity-80">
              <i class="ri-star-fill"></i> ${info.items[i].clan.stars}
              <span class="mx-[2px]"></span>
              <i class="ri-sword-fill"></i> ${info.items[i].clan.destructionPercentage.toFixed(2)}%
            </div>
          </div>
        </li>
      </div>

      <!-- Opponent -->
      <div class="w-full flex justify-end mt-[-5px]">
        <li class="list-row">
          <div class="list-col-grow">
            <div class="text-white text-clash-bold text-right ${fontDesktop}">
              ${info.items[i].opponent.name}
            </div>
            <div class="text-xs text-right opacity-80">
              <i class="ri-star-fill"></i> ${info.items[i].opponent.stars}
              <span class="mx-[2px]"></span>
              <i class="ri-sword-fill"></i> ${info.items[i].opponent.destructionPercentage.toFixed(2)}%
            </div>
          </div>
        </li>
        <img src="${info.items[i].opponent.badgeUrls.small}" class="w-[32px] h-[32px] mt-5 mr-[4px]">
      </div>
    </div>
  </div>
`;

  }
})()