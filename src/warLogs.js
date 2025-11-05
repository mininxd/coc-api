import { logs } from "./lib/warInfo.js";
import time from "./lib/libTime.js";
(async () => {
  const info = await logs();
  const warLogList = document.getElementById("warLogList");
  const totalWarlogs = document.getElementById("totalWarlogs");
 
  let fontDesktop = "";
  let lose = 0;
  let win = 0;

  if (!navigator.userAgent.includes("Mobile")) {
    fontDesktop = "text-lg";
  }

  for (let i = 0; i < info.items.length; i++) {
    if (!info.items[i].opponent?.name) {
      continue; // Skip undefined opponents completely
    }

    let result = "border-2 border-success-content/20 bg-success text-success-content";
    let contentColor = "text-success-content";

    if (info.items[i].result === "win") {
      win++;
    } else {
      result = "border-2 border-error-content/20 bg-error text-error-content";
      contentColor = "text-error-content";
      lose++;
    }

    warLogList.innerHTML += `
      <div class="bg-base-100 shadow-lg rounded-box ${result} my-1 px-2">
        <div class="flex justify-between mt-1 text-lg">
          <span class="text-white text-clash-bold text-clash-shadow-sm text-sm ${fontDesktop}">${info.items[i].clan.name}</span>

          <span class="text-white text-clash-bold text-clash-shadow-sm text-sm ${fontDesktop}">${info.items[i].opponent.name}</span>
        </div>

        <div class="flex justify-between mt-2">
          <div class="w-full flex justify-start mt-[-5px]">
            <img class="h-[32px] w-[32px]" src="${info.items[i].clan.badgeUrls.medium}">
            <div class="font-bold text-3xl px-1 ${contentColor}">
              ${info.items[i].clan.stars}
            </div>
          </div>
    ${info.items[i].teamSize}v${info.items[i].teamSize}
          <div class="w-full flex justify-end mt-[-5px]">
            <div class="font-bold text-3xl px-1 ${contentColor}">
              ${info.items[i].opponent.stars}
            </div>
            <img src="${info.items[i].opponent.badgeUrls.medium}" class="w-[32px] h-[32px]">
          </div>
        </div>
      

       <div class="flex justify-between">
       <div>
        <span class="text-xs">
        <i class="ri-sword-fill"></i>
        ${info.items[i].clan.destructionPercentage.toFixed(2)}%</span>
       </div>
        <div class="flex">
        <span class="text-xs">${time(info.items[i].endTime)}</span>
       </div>
       <div>
        <span class="text-xs">
        ${info.items[i].opponent.destructionPercentage.toFixed(2)}%
         <i class="ri-sword-fill"></i>
        </span>
       </div>
      </div>
      </div>
    `;
  }

  totalWarlogs.innerHTML = `${win}/${lose}`;
})();