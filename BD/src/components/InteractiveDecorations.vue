<script setup>
import { onMounted, ref } from 'vue';

// 粒子效果
const particles = ref([]);

onMounted(() => {
  particles.value = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 5 + 2,
    speed: Math.random() * 0.5 + 0.1,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
    angle: Math.random() * Math.PI * 2
  }));

  // 动画循环
  const animate = () => {
    particles.value.forEach(p => {
      p.angle += p.speed * 0.01;
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;

      if (p.x < 0 || p.x > window.innerWidth) p.angle = Math.PI - p.angle;
      if (p.y < 0 || p.y > window.innerHeight) p.angle = -p.angle;

    });
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<template>
  <div class="interactive-decorations">
    <!-- 粒子 -->
    <div v-for="(p, i) in particles" :key="i" class="particle" :style="{
      left: `${p.x}px`,
      top: `${p.y}px`,
      width: `${p.size}px`,
      height: `${p.size}px`,
      backgroundColor: p.color,
      opacity: 0.3 + Math.random() * 0.4
    }"></div>

  </div>
</template>

<style scoped>
.interactive-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.particle:hover {
  transform: scale(1.5);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}
</style>
