import axios from 'axios';
import * as config from 'config';

const kakaoConfig = config.get('kakao');

const KakaoAPI = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${kakaoConfig.apikey}`,
  },
});

export default KakaoAPI;
