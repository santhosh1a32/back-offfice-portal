export function getDataWithParam(ctrl, method, params) {
  return new Promise((resolve, reject) => {
    window[ctrl][method](
      params,
      function(result) {
        resolve(result);
      },
      { escape: false, timeout: 120000 }
    );
  });
}

export function getDataWithoutParam(ctrl, method) {
  return new Promise((resolve, reject) => {
    window[ctrl][method](
      function(result) {
        resolve(result);
      },
      { escape: false, timeout: 120000 }
    );
  });
}
export function saveDataWithParam(ctrl, method, params) {
  return new Promise((resolve, reject) => {
    window[ctrl][method](
      params,
      function(result) {
        resolve(result);
      },
      { escape: false, timeout: 120000 }
    );
  });
}