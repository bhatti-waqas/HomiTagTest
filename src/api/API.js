import Toast from 'react-native-root-toast';

// BASE_URL = "http://13.55.178.56/"  //production
// BASE_URL = "http://192.168.1.157:3000" //local

TMDB_URL =  "https://api.themoviedb.org/3"
TMDB_IMG_URL =  "https://image.tmdb.org/t/p"
TMDB_API_KEY = "ecef14eac236a5d4ec6ac3a4a4761e8f"


export default class Api {
  static apiCall(path, method, options, headers = {'Accept': 'application/json','Content-Type': 'application/json'}) {
    let responseHeaders = null;
    let requestOptions = {
      method: method,
      headers: headers
    }
    // console.log('headers');
    console.log(headers);
    if(method != "GET")
      requestOptions = Object.assign(requestOptions, {body: JSON.stringify(options)})
    return fetch(TMDB_URL+path, requestOptions).then((response) => {
      responseHeaders = response.headers;
      return response.json();
    })
      .then((responseJson) => {


      if (responseJson.errors)
        Toast.show(responseJson.errors.full_messages || responseJson.errors, {
          duration: 5000,
          position: Toast.positions.BOTTOM,
          opacity: 0.8,
          visible: true
        });

        return {headers: responseHeaders, body: responseJson, status: responseJson.status, errors: responseJson.errors};

      })
      .catch((error) => {
        console.error(error);
        return {error: error}
      });
  }

};
