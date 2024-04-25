import { BASE_URL } from '@constants/index.ts';
import axios from 'axios';

export const api = axios.create({
    baseURL: BASE_URL,
});
