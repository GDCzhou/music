import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = "http://localhost:3000/"
const TIMEOUT = 5000

const createInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout:TIMEOUT
  })

  return instance
}

interface instance extends AxiosInstance {
  (config:AxiosRequestConfig): Promise<any>
}

const request:instance = createInstance()

export default request