export type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'Patch'

export interface AxiosRequestConfig {
    url: string
    method?: Method
    data?:any
    params?:any
}