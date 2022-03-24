import { useContext, createContext } from 'react';

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, expiryDate) {
  document.cookie = `${name}=${value}; expires=${expiryDate}`;
}

function calculateNPS(data) {
  let detractors = 0;
  // eslint-disable-next-line
  let passives = 0;
  let promoters = 0;
  let totalCount = 0;
  // eslint-disable-next-line
  data.map((submission) => {
    if (submission.score <= 6) {
      detractors++;
    } else if (submission.score <= 8) {
      passives++;
    } else {
      promoters++;
    }
    totalCount++;
  });
  const npsScore = 100 * (promoters / totalCount - detractors / totalCount);
  return Math.ceil(npsScore);
}

export { authContext, useAuth, getCookie, setCookie, calculateNPS };
