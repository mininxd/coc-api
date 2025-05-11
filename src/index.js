import clanInfo from "./lib/clanInfo.js";
import 'remixicon/fonts/remixicon.css'
import "./playerList.js";
import "./warLogs.js";
import "./swiper";


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
  clanCountry.innerHTML = `${info.location.name}`
  clanLang.innerHTML = `${info.chatLanguage.name}`
  
  
})()
