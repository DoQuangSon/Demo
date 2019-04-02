import { HOST } from './api-port.constants';

export const QL_NGUOI_DUNG = {
    CREATE_USER: HOST + '/api/users',
    GET_ALL_USER_BY_DMBHXH: HOST + '/api/users/get-all-by-dmbhxh',
    GET_CHUC_DANH_OF_BHXH: HOST + '/api/d-m-chuc-danh-users/get-chuc-danh-of-bhxh',
    SEARCH_USER: HOST + '/api/users/search-user',
    CHECK_EXITST: HOST + '/api/users/check-exists'
};
