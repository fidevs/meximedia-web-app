import axios from 'axios';

export const myaxios = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const types = 
{
    MODULES : '/configurations/modules',
    PERMISSIONS : '/configurations/permissions',
    ROLES : '/configurations/roles',
    COMPANIES : '/company',
    WAREHOUSES : '/company/$X/warehouse',
    BRANDS : '/company/$X/admin/brands',
    TAXES : '/taxes',
    PRODUCTS : '/company/$X/warehouse/$Z/products',
    SALES : '/sales',
    USERS : '/users',
    COMPANY_ADDRESS : '/company/$X/address',
    LOGIN : '/users/login/$X/$Z'
}

export const methods =
{
    POST : 'post',
    GET : 'get',
    PUT : 'put',
    DELETE : 'delete'
}

export const textOver = {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour : "2-digit",
    minute : "2-digit",
    second : "2-digit"
}

export const CID = "b6a68ee9-0d3e-4561-8bd4-0211ea2c5672"

export const CAID = "964c9ccc-5795-468d-976a-8507a55058a7"

export const WID = "897e7772-38b7-4c6c-b453-3da9eb209de7"

export const CREATEDBY = "5ffd38a6-5512-4fd9-9470-0210be711a2b"

export const CUSTID = "user-uid-customer"