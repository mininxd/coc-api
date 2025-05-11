import axios from "axios";
const baseURL = import.meta.env.VITE_APIURL;

async function clanInfo() {
  try {
    const { data } = await axios.get(baseURL);

    return {
      tag: data.tag,
      name: data.name,
      type: data.type,
      description: data.description,
      label: data.labels,
      location: data.location,
      badges: data.badgeUrls,
      clanLevel: data.clanLevel,
      clanPoints: data.clanPoints,
      warLeague: data.warLeague,
      builderPoints: data.builderBasePoints || data.builderPoints,
      capitalPoints: data.clanCapitalPoints || data.capitalPoints,
      capitalLeague: data.clanCapitalPoints || data.capitalLeague,
      totalMember: data.members,
      member: data.memberList || data.membersList || [],
      language: data.language?.name || data.chatLanguage?.name || ""
    };

  } catch (err) {
    console.error("Failed to fetch clan data:", err.message);
    return null;
  }
}

export default clanInfo;