import axios from 'axios';

export const myaxios = axios.create({
    baseURL: 'https://ws-pdv.herokuapp.com/'
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