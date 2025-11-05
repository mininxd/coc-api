import axios from "axios";
import { formatDate } from "./lib/libTime.js";

// Wait for DOM to be ready and ensure all required elements exist
if (typeof window !== 'undefined' && window.document) {
  document.addEventListener('DOMContentLoaded', async function() {
    try {
      const baseURL = import.meta.env.VITE_APIURL;
      const savedTag = localStorage.getItem("clanTag");
      
      if (!savedTag) {
        capitalRaidList.innerHTML = `<div class="text-center">No clan tag found. Please log in first.</div>`;
        return;
      }
      
      // Encode the tag for use in URL
      const encodedTag = encodeURIComponent(savedTag);
      
      // Make the API call
      const { data } = await axios.get(`${baseURL}/clans/${encodedTag}/capitalraidseasons`);
      
      if (!data.items || data.items.length === 0) {
        capitalRaidList.innerHTML = `<div class="text-center">No latest raid season.</div>`;
        return;
      }

      // Get the first (latest) season from the API response
      const latestSeason = data.items[0];
      const startTime = formatDate(latestSeason.startTime);
      const endTime = formatDate(latestSeason.endTime);

      // Ensure members exist and sort them
      const members = latestSeason.members || [];
      const sortedMembers = [...members].sort((a, b) => (b.capitalResourcesLooted || 0) - (a.capitalResourcesLooted || 0));

      let leaderboardHtml = `
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Looted</th>
              </tr>
            </thead>
            <tbody>
      `;
      sortedMembers.forEach((member, index) => {
        leaderboardHtml += `
          <tr>
            <th>${index + 1}</th>
            <td>${member.name}</td>
            <td>${(member.capitalResourcesLooted || 0).toLocaleString()}</td>
          </tr>
        `;
      });
      leaderboardHtml += `
            </tbody>
          </table>
        </div>
      `;

      let attackLogHtml = '';
      const attackLog = latestSeason.attackLog || [];

      attackLog.forEach(log => {
        const defender = log.defender || {};
        
        let attackSuccessClass;
        if(log.districtsDestroyed >= log.districtCount) {
          attackSuccessClass = "border-success-content/20 bg-success text-success-content";
        } else {
          attackSuccessClass = "border-error-content/20 bg-error text-error-content";
        }
        
        attackLogHtml += `
          <div class="border-2 ${attackSuccessClass} rounded-box shadow-sm mb-2 px-2 py-2 text-lg">
            <div class="flex justify-between">
              <span class="text-white text-clash-bold text-clash-shadow-sm">${defender.name}</span>
              <span class="text-success-content/50 text-xs">${defender.tag}</span>
            </div>
              <div class="flex justify-start">
                <img src="${defender.badgeUrls?.medium}" class="w-[32px] h-[32px] mr-2" onerror="this.style.display='none'">
                <div>
                  <div class="flex gap-2">
                  <div class="tooltip tooltip-right" data-tip="Attack Count">
                  <span class="font-bold hover:badge hover:badge-outline">
                  <i class="ri-sword-fill"></i>
                  ${log.attackCount}
                  </span>
                  </div>
                  <div class="tooltip tooltip-right" data-tip="Districts Destroyed">
                  <span class="font-bold">
                  <i class="ri-fire-fill"></i>
                  ${log.districtsDestroyed}
                  </span>
                  </div>
                  </div>
                </div>
              </div>
          </div>
        `;
      });
      
      
      
      let defenseLogHtml = '';
      const defenseLog = latestSeason.defenseLog || [];
      defenseLog.forEach(log => {
        const attacker = log.attacker || {};
        
        // Determine if this specific defense was successful (if districtsDestroyed is low)
        let defenseSuccessClass;
        if(log.districtsDestroyed < log.districtCount) {
          defenseSuccessClass = "border-success-content/20 bg-success text-success-content";
        } else {
          defenseSuccessClass = "border-error-content/20 bg-error text-error-content";
        }
        
        defenseLogHtml += `
          <div class="border-2 ${defenseSuccessClass} rounded-box shadow-sm mb-2 px-2 py-2 text-lg">
            <div class="flex justify-between">
              <span class="text-white text-clash-bold text-clash-shadow-sm">${attacker.name}</span>
              <span class="text-success-content/50 text-xs">${attacker.tag}</span>
            </div>
              <div class="flex justify-start">
                <img src="${attacker.badgeUrls?.medium}" class="w-[32px] h-[32px] mr-2" onerror="this.style.display='none'">
                <div>
                  <div class="flex gap-2">
                  <div class="tooltip tooltip-right" data-tip="Attack Count">
                  <span class="font-bold hover:badge hover:badge-outline">
                  <i class="ri-sword-fill"></i>
                  ${log.attackCount}
                  </span>
                  </div>
                  <div class="tooltip tooltip-right" data-tip="Districts Destroyed">
                  <span class="font-bold">
                  <i class="ri-fire-fill"></i>
                  ${log.districtsDestroyed}
                  </span>
                  </div>
                  </div>
                </div>
              </div>
          </div>
        `;
      });

      // Create HTML for the single latest season
      const latestSeasonHtml = `
        <div>
          <div class="card bg-base-100 shadow-md mb-4">
            <div class="px-2 py-2">
              <h2 class="card-title">Raid Summary</h2>
              <div class="tooltip" data-tip="Raid Period">
              <i class="ri-time-fill"></i> ${startTime} — ${endTime}
              </div>
              <div class="flex gap-1">
              <div class="tooltip" data-tip="Total Loot">
              <i class="ri-coin-fill"></i>
              ${(latestSeason.capitalTotalLoot || 0).toLocaleString()}
              </div>
              -
              <div class="tooltip" data-tip="Total Attacks">
              <i class="ri-sword-fill"></i>
              ${latestSeason.totalAttacks || 0}
              </div>
              -
              <div class="tooltip" data-tip="Districts Destroyed">
              <i class="ri-building-2-fill"></i>
              ${latestSeason.enemyDistrictsDestroyed || 0}
              </div>
              </div>
            </div>
          </div>
          <h3 class="text-lg font-bold mb-2 mt-4">Attack Log</h3>
          ${attackLogHtml}
          <h3 class="text-lg font-bold mb-2 mt-4">Defense Log</h3>
          ${defenseLogHtml}
          <h3 class="text-lg font-bold mb-2 mt-4">Leaderboard</h3>
          ${leaderboardHtml}
        </div>
      `;

      capitalRaidList.innerHTML = latestSeasonHtml;
      
      // Update the total capital raid element
      totalCapitalRaid.innerHTML = `${(latestSeason.capitalTotalLoot || 0).toLocaleString()}`;

    } catch (err) {
      console.error("Failed to fetch capital raid season", err);
      let errorMessage = "Failed to fetch data.";
      
      // Check for specific error conditions
      if (err.response) {
        if (err.response.data && err.response.data.reason) {
          errorMessage = err.response.data.reason;
        } else {
          errorMessage = `API Error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "Network error - please check your connection";
      } else {
        errorMessage = `Request setup error: ${err.message}`;
      }
      
      // Safely update the DOM if the element exists
      capitalRaidList.innerHTML = `<div class="text-center">${errorMessage}</div>`;
    }
  });
} else {
  console.warn('DOM not available, running in non-browser environment');
}