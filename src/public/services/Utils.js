const baseUrl = 'https://127.0.0.1:3000/api';
const linesUrl = 'lines';
const timeTableUrl = 'timetable';

const getData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${baseUrl}/${url}`, options);
    const json = await response.json();
    //console.log(json);
    return json;
  } catch (err) {
    console.error('Error fetching data', err);
  }
};

const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split('/');
    let request = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  getLines: async () => {
    return getData(linesUrl);
  },

  getTimeTableForLine: async (line) => {
    return getData(`${timeTableUrl}-${line}`);
  },

  titleCase: (text) => {
    return text
      .replace('-', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  }
};

export default Utils;
