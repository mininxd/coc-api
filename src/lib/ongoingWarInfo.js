import axios from "axios";
const baseURL = import.meta.env.VITE_APIURL;
const savedTag = encodeURIComponent(localStorage.getItem("clanTag"));

async function ongoingWar() {
  try {
    const { data } = await axios.get(`${baseURL}/war?tag=${savedTag}`);

    return {
      state: data.state,
      teamSize: data.teamSize,
      clanName: data.clan.name,
      opponentName: data.opponent.name,
      clanTag: data.clan.tag,
      opponentTag: data.opponent.tag,
      clanBadge: data.clan.badgeUrls,
      opponentBadge: data.opponent.badgeUrls,
      clanStars: data.clan.stars,
      opponentStars: data.opponent.stars,
      clanDestruction: data.clan.destructionPercentage,
      opponentDestruction: data.opponent.destructionPercentage,
      clanAttacks: data.clan.attacks,
      opponentAttacks: data.opponent.attacks,
      clanMember: data.clan.members,
      opponentMember: data.opponent.members,
    }
   
    
  } catch(e) {
      return "";
    }
}


export default ongoingWar;