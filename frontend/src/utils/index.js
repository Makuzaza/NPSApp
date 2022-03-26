import { useContext, createContext } from "react";

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, expiryDate) {
  document.cookie = `${name}=${value}; expires=${expiryDate}`;
}

function calculateNPS(data) {
  return data.reduce(
    (acc, { score, day }, index, arr) => {
      acc["detractors"] =
        score <= 6 ? acc["detractors"] + 1 : acc["detractors"];
      acc["passives"] =
        score <= 8 && score > 6 ? acc["passives"] + 1 : acc["passives"];
      acc["promoters"] = score > 8 ? acc["promoters"] + 1 : acc["promoters"];
      acc["nps"] = Math.round(
        100 * (acc["promoters"] / arr.length - acc["detractors"] / arr.length)
      );
      acc["day"] = day;
      return acc;
    },
    {
      detractors: 0,
      passives: 0,
      promoters: 0,
      day: "",
      nps: 0,
    }
  );
}



const formatDate = (date = new Date()) => {
  const utc = date.toUTCString();
  let final = utc.split(",")[1].split(" ");
  return `${final[2]} ${final[1]} - ${final[3]}`;
};

const formatSummary = (data)=> {
  let final = [];
  const formated = data.map((x) => ({
    ...x,
    day: formatDate(new Date(+x.created_at)),
  }));
  const collections = formated.reduce((acc, elm) => {
    acc[elm.day] = acc[elm.day]
      ? [...acc[elm.day], { ...elm, day: elm.day.split("-")[0] }]
      : [{ ...elm, day: elm.day.split("-")[0] }];
    return acc;
  }, {});

  for (let collection in collections) {
    final.push(calculateNPS(collections[collection]));
  }
  const info = final.reduce(
    (acc, elm) => {
      acc["detractors"] += elm.detractors;
      acc["passives"] += elm.passives;
      acc["promoters"] += elm.promoters;
      return acc;
    },
    {
      detractors: 0,
      passives: 0,
      promoters: 0,
    }
  );
  const finalInfo = Object.keys(info)
    .map((key) =>
      key === "promoters"
        ? { promoters: info[key], name: key }
        : key === "passives"
        ? { passives: info[key], name: key }
        : key === "detractors" && { detractors: info[key], name: key }
    )
    .filter((elm) => elm);
    return {
      finalInfo,
      final,
      info,
      netPromotersScore: calculateNPS(data).nps,
    };
}

export {
  authContext,
  useAuth,
  getCookie,
  setCookie,
  calculateNPS,
  formatDate,
  formatSummary,
};
