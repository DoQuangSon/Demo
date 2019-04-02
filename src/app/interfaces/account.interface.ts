export interface IPermission {
    id: number;
    text: string;
    path: string;
    api: string;
    method?: any;
    actived: boolean;
    type: number;
    group?: number;
    permissionParent: IPermission;
    authorities?: any;
}

export interface IUser {
    id: number;
    login: string;
    tenHienThi: string;
    phoneNumber: string;
    chucDanhId: number;
    chucDanh: string;
    donViId: string;
    donVi: string;
    maDonVi: string;
    dmTinhHuyenId: number;
    tenTinhHuyen: string;
    maTinhHuyen: string;
    email: string;
    imageUrl?: any;
    validFromDate?: any;
    validToDate?: any;
    activated: boolean;
    groupUserId: number;
    groupUserName: string;
    permissions: Array<string>;
}