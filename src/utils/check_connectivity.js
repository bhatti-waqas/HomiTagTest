export async function checkConnectivity () {
    try {
      const res = await fetch('https://google.com');
      if (res.status === 200) return true;
    } catch (e) {
        console.log('erooror');
      return false;
    }
    return false;
  };

  export async function connectivityPromise () {
      new Promise(async function(resolve, reject) {
        try {
            const res = await fetch('https://google.com');
          if (res.status === 200) return resolve(true);
        } catch (e) {
          resolve(false);
        }
        resolve(false);
      });
  };
