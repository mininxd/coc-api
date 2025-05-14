import { logs } from "./lib/warInfo.js";

(async () => {
  const info = await logs();
  const warLogList = document.getElementById("warLogList");
  const totalWarlogs = document.getElementById("totalWarlogs");
  
  let j = 0;
  let lose = 0;
  let win = 0;
  for(let i = 0; i < info.items.length; i++) {
  win++;
  let result = "bg-success text-success-content";
  let textColor = ""
  let hideUndefinedOpponent = "";
  
  if(info.items[i].result !== "win") {
    result = "bg-error";
    textColor = "text-error-content"
    lose++;
  }
  
  if(!info.items[i].opponent.name) {
    hideUndefinedOpponent = "hidden";
    j++;
  }
    totalWarlogs.innerHTML = `${win - lose - j}/${lose - j}`
    
    
  warLogList.innerHTML += `
  <div class="flex justify-between bg-base-100 shadow-sm rounded-box ${result} ${hideUndefinedOpponent} my-1 px-2">
  
  <div class="w-full flex justify-start">
   <img src="${info.items[i].clan.badgeUrls.small}" class="w-[32px] h-[32px] mt-4 ml-[2px]">
    <li class="list-row">
    <div class="list-col-grow">
      <div class="text-medium ${textColor}">
        ${info.items[i].clan.name}
      </div>
      <div class="text-xs ${textColor} opacity-60">
      <i class="ri-star-fill"></i> ${info.items[i].clan.stars} 
      <span class="mx-[2px]"></span>
      <i class="ri-sword-fill"></i>  ${info.items[i].clan.destructionPercentage.toFixed(2)}%
      </div>
    </div>
    </li>
    </div>
    
  <div class="w-full flex justify-end">
    <li class="list-row">
      <div class="list-col-grow">
        <div class="text-medium ${textColor} text-right">
        ${info.items[i].opponent.name}
        </div>
      <div class="text-xs text-right ${textColor} opacity-60">
        <i class="ri-star-fill"></i> ${info.items[i].opponent.stars} 
        <span class="mx-[2px]"></span>
        <i class="ri-sword-fill"></i>         ${info.items[i].opponent.destructionPercentage.toFixed(2)}%
      </div>
    </li>
      <img src="${info.items[i].opponent.badgeUrls.small}" class="w-[32px] h-[32px] mt-4 mr-[4px]">
    </div>
  
    
  </div>
`
  }
})()