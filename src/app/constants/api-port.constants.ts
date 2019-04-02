// import { environment } from 'environments/environment';

export const DEV_HOST = location.hostname;
export const PROD_HOST = location.hostname;
export const DEV_PORT = location.hostname;
export const PROD_PORT = location.hostname;

// export const HOST = (environment.production ? DEV_HOST : PROD_HOST);
// export const PORT = (environment.production ? DEV_PORT : PROD_PORT);

// export const API_URL = '//' + HOST + ':' + PORT;

export const PORT = 8080;
// export const PORT = 8085;
// export const PORT = 83;

export const HOST = '//' + location.hostname + ':' + PORT;
// export const HOST = '//' + '118.70.177.86' + ':' + PORT;
// export const HOST = '//' + '172.16.10.16' + ':' + PORT;
// export const HOST = '//' + 'localhost' + ':' + '4200';
// export const HOST = '//' + '172.16.100.14' + ':' + PORT;
// export const HOST = 'http://172.16.10.31:8888/';
//  export const HOST = 'https://ttkt.baohiemxahoi.gov.vn';
export const API = {
  auth: {
    login: '',
    logout: '',
    refreshToken: '',
    checkToken: ''
  }
};
