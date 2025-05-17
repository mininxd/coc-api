import clanInfo from "./lib/clanInfo.js";
import 'remixicon/fonts/remixicon.css'
import "./playerList.js";
import "./warLogs.js";
import "./ongoingWar.js";
import "./lib/swiper.js";

if(!navigator.userAgent.includes("Mobile")) {
  html.classList.add("px-48");
  document.querySelectorAll(".card").forEach(card => {
    card.classList.replace("w-96", "w-full");
  });
}

const savedTag = localStorage.getItem("clanTag");

if(!savedTag || !savedTag.includes("#")) {
  window.location.href = "/login";
}

// clan top info
(async () => {
  const info = await clanInfo();
  document.title = `Clans stats for ${info.name}`
  const test = document.getElementById("test");
  clanName.append(info.name);
  clanTag.append(info.tag);
  clanBadge.src = info.badges.large;
  description.innerHTML = `${info.description}`
  totalMember.innerHTML = `${info.totalMember}/50`;
  
  
  for(let i = 0; i < info.label.length; i++) {
    clanLabel.innerHTML += `
    <div class="tooltip" data-tip="${info.label[i].name}">
      <img src="${info.label[i].iconUrls.small}" class="w-[42px] h-[42px] rounded">
    </div>
    `
  }
  
  gridInfo.innerHTML = `
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="Clan Language"> <i class="ri-global-line"></i>
     ${info.language}
      </div>
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="Clan Country">  <i class="ri-flag-line"></i>
     ${info.location.name}
      </div>
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="Clan Type"> 
      <i class="ri-lock-line"></i> ${info.type}
      </div>
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="War (Win/Draw/Lose)"> 
      <i class="ri-sword-line"></i> 
      ${info.warWin}/${info.warTie}/${info.warLose}
      </div>
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="War League"> 
      <i class="ri-shield-line"></i> 
      ${info.warLeague.name}
      </div>
      <div class="badge tooltip badge-xs badge-ghost badge-outline" data-tip="Capital League"> 
      <i class="ri-home-8-line"></i> 
      ${info.capitalLeague.name}
      </div>
  `
  joinClan.innerHTML = `
   <a class="flex justify-center w-full mt-2" href="clashofclans://action=OpenClanProfile&tag=${info.tag}">
    <button class="btn btn-neutral rounded-md w-full text-2xl text-clash text-clash-shadow-md text-white shadow-md">Join Clan</button>
   </a> 
  `
  resetBtn.classList.remove("hidden");
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("clanTag");
    window.location.href = "/";
  })
})()


function copyText(text) {
  navigator.clipboard.writeText(text);
}
