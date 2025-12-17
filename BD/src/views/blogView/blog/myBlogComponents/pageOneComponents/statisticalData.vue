<script setup>
import { ref, onMounted } from 'vue';

const weather = ref(null);
const locationName = ref('');
const selectedCity = ref('auto'); // 'auto' 表示自动定位，其他为城市 key

// 预设中国主要城市（含广东）
const CITIES = {
  auto: { name: '自动定位', lat: null, lon: null },
  gz: { name: '广州', lat: 23.13, lon: 113.29 },
  bj: { name: '北京', lat: 39.9042, lon: 116.4074 },
  sh: { name: '上海', lat: 31.2304, lon: 121.4737 },
  sz: { name: '深圳', lat: 22.5431, lon: 114.0579 },
  cd: { name: '成都', lat: 30.5728, lon: 104.0668 },
  xa: { name: '西安', lat: 34.3416, lon: 108.9398 },
  wh: { name: '武汉', lat: 30.5928, lon: 114.3055 },
  hz: { name: '杭州', lat: 30.2741, lon: 120.1551 },
  nj: { name: '南京', lat: 32.0603, lon: 118.7969 }
};

// 获取天气的通用函数
async function fetchWeather(lat, lon, cityName) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Asia/Shanghai`;
    const res = await fetch(url);
    const data = await res.json();
    weather.value = data.current_weather;
    locationName.value = cityName;
  } catch (err) {
    console.error('天气获取失败:', err);
    weather.value = null;
    locationName.value = '加载失败';
  }
}

// 处理城市切换
async function handleCityChange() {
  const cityKey = selectedCity.value;
  if (cityKey === 'auto') {
    // 执行自动定位逻辑
    locationName.value = '定位中...';
    weather.value = null;

    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (!ipRes.ok) throw new Error('IP 服务不可用');
      const ipData = await ipRes.json();

      if (ipData.latitude && ipData.longitude) {
        fetchWeather(CITIES.gz.lat, CITIES.gz.lon, '广州');
      } else {
        throw new Error('无效坐标');
      }
    } catch (err) {
      console.warn('自动定位失败，使用广州');
      fetchWeather(CITIES.gz.lat, CITIES.gz.lon, '广州');
    }
  } else {
    const city = CITIES[cityKey];
    fetchWeather(city.lat, city.lon, city.name);
  }
}

// 页面加载时默认触发一次（自动定位）
onMounted(() => {
  handleCityChange();
});
</script>

<template>
  <div class="myBlog2">
    <!-- 城市选择下拉框 -->
    <div class="city-selector">
      <label for="city-select">选择城市：</label>
      <select id="city-select" v-model="selectedCity" @change="handleCityChange">
        <option v-for="(city, key) in CITIES" :key="key" :value="key">
          {{ city.name }}
        </option>
      </select>
    </div>

    <!-- 天气显示区域 -->
    <div v-if="weather" class="weather-info">
      <h2>当前天气 - {{ locationName }}</h2>
      <p>温度: {{ weather.temperature }} ℃</p>
      <p>风速: {{ weather.windspeed }} km/h</p>
      <p>天气:
        <span v-if="weather.weathercode === 0">晴</span>
        <span v-else-if="[1, 2, 3].includes(weather.weathercode)">多云/阴</span>
        <span v-else-if="[61, 63, 65].includes(weather.weathercode)">雨</span>
        <span v-else-if="[71, 73, 75].includes(weather.weathercode)">雪</span>
        <span v-else-if="weather.weathercode === 95">雷暴</span>
        <span v-else>其他</span>
      </p>
    </div>
    <div v-else class="loading">
      <h2>{{ locationName || '正在加载天气...' }}</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.myBlog2 {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0 auto;

  .city-selector {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-weight: 600;
      color: #2d3e50;
    }

    select {
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      background: white;
      outline: none;
      cursor: pointer;
    }
  }

  .weather-info h2,
  .loading h2 {
    color: #2d3e50;
    margin-bottom: 16px;
    font-size: 20px;
  }

  p {
    margin: 8px 0;
    color: #4a5568;
    font-size: 16px;
  }
}
</style>
