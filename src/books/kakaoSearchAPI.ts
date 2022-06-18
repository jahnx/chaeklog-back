import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const kakaoApiKey = process.env.KAKAO_API_KEY;

const KakaoAPI = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${kakaoApiKey}`,
  },
});

export default KakaoAPI;
