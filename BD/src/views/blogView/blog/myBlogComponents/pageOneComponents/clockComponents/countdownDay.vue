<script setup>
import { ref, computed, onMounted } from 'vue'

// 倒数日项类型定义（非强制，仅作参考）
// { id: string, name: string, targetDate: string (YYYY-MM-DD) }

const countdowns = ref([])
const newCountdown = ref({ name: '', date: '' })
const editingId = ref(null)
const editForm = ref({ name: '', date: '' })

// 从 localStorage 加载数据
const loadCountdowns = () => {
  const saved = localStorage.getItem('countdownDays')
  if (saved) {
    countdowns.value = JSON.parse(saved)
  }
}

// 保存到 localStorage
const saveCountdowns = () => {
  localStorage.setItem('countdownDays', JSON.stringify(countdowns.value))
}

// 计算剩余天数
const calculateDaysLeft = (targetDateStr) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(targetDateStr)
  const diffTime = target - today
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// 格式化显示文本
const formatCountdownText = (days) => {
  if (days > 0) {
    return `还有 ${days} 天`
  } else if (days === 0) {
    return '就是今天！🎉'
  } else {
    return `${Math.abs(days)} 天前`
  }
}

// 添加倒数日
const addCountdown = () => {
  if (!newCountdown.value.name.trim() || !newCountdown.value.date) {
    alert('请输入名称和日期')
    return
  }
  const id = Date.now().toString()
  countdowns.value.push({
    id,
    name: newCountdown.value.name.trim(),
    targetDate: newCountdown.value.date,
  })
  saveCountdowns()
  newCountdown.value = { name: '', date: '' }
}

// 开始编辑
const startEdit = (item) => {
  editingId.value = item.id
  editForm.value = { name: item.name, date: item.targetDate }
}

// 保存编辑
const saveEdit = () => {
  const index = countdowns.value.findIndex((item) => item.id === editingId.value)
  if (index !== -1) {
    countdowns.value[index].name = editForm.value.name.trim()
    countdowns.value[index].targetDate = editForm.value.date
    saveCountdowns()
  }
  cancelEdit()
}

// 取消编辑
const cancelEdit = () => {
  editingId.value = null
  editForm.value = { name: '', date: '' }
}

// 删除倒数日
const deleteCountdown = (id) => {
  if (confirm('确定要删除这个倒数日吗？')) {
    countdowns.value = countdowns.value.filter((item) => item.id !== id)
    saveCountdowns()
    if (editingId.value === id) cancelEdit()
  }
}

// 清空所有
const clearAll = () => {
  if (confirm('确定要清空所有倒数日吗？')) {
    countdowns.value = []
    saveCountdowns()
    cancelEdit()
  }
}

// 按剩余天数排序（可选）
const sortedCountdowns = computed(() => {
  return [...countdowns.value].sort((a, b) => {
    const daysA = calculateDaysLeft(a.targetDate)
    const daysB = calculateDaysLeft(b.targetDate)
    return daysA - daysB // 即将到来的排前面
  })
})

onMounted(() => {
  loadCountdowns()
})
</script>

<template>
  <div class="countdown-page">
    <h2>📅 倒数日管理</h2>

    <!-- 添加表单 -->
    <div class="form-section">
      <h3>➕ 添加倒数日</h3>
      <div class="input-group">
        <input
          v-model="newCountdown.name"
          type="text"
          placeholder="事件名称（如：高考）"
          maxlength="30"
        />
        <input
          v-model="newCountdown.date"
          type="date"
          :min="new Date().toISOString().split('T')[0]"
        />
        <button @click="addCountdown" class="btn primary">添加</button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list-section">
      <div class="list-header">
        <h3>📋 我的倒数日</h3>
        <button v-if="countdowns.length" @click="clearAll" class="btn danger">清空全部</button>
      </div>

      <div v-if="sortedCountdowns.length === 0" class="empty">暂无倒数日，快去添加一个吧！</div>

      <div v-for="item in sortedCountdowns" :key="item.id" class="countdown-item">
        <div v-if="editingId !== item.id" class="item-display">
          <div class="item-info">
            <strong>{{ item.name }}</strong>
            <span class="date">{{ item.targetDate }}</span>
          </div>
          <div class="item-countdown">
            {{ formatCountdownText(calculateDaysLeft(item.targetDate)) }}
          </div>
          <div class="item-actions">
            <button @click="startEdit(item)" class="btn small">编辑</button>
            <button @click="deleteCountdown(item.id)" class="btn small danger">删除</button>
          </div>
        </div>

        <!-- 编辑表单 -->
        <div v-else class="item-edit">
          <div class="input-group inline">
            <input v-model="editForm.name" type="text" placeholder="名称" />
            <input v-model="editForm.date" type="date" />
          </div>
          <div class="edit-actions">
            <button @click="saveEdit" class="btn primary small">保存</button>
            <button @click="cancelEdit" class="btn secondary small">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.countdown-page {
  // padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  .form-section,
  .list-section {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
  }

  .input-group {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    flex-wrap: wrap;

    &.inline {
      width: 100%;
      margin-bottom: 0.6rem;
    }

    input {
      padding: 0.5rem 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;

      &[type='text'] {
        flex: 1;
        min-width: 120px;
      }

      &[type='date'] {
        width: 140px;
      }
    }

    .btn {
      white-space: nowrap;
    }
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
    }
  }

  .empty {
    text-align: center;
    color: #888;
    padding: 1.5rem;
  }

  .countdown-item {
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.8rem;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .item-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    .item-info {
      flex: 1;
      min-width: 150px;

      strong {
        font-size: 1.1rem;
        color: #2c3e50;
      }

      .date {
        display: block;
        font-size: 0.85rem;
        color: #777;
        margin-top: 0.2rem;
      }
    }

    .item-countdown {
      font-weight: bold;
      color: #e74c3c;
      min-width: 90px;
      text-align: center;
    }

    .item-actions {
      display: flex;
      gap: 0.5rem;
    }

    .item-edit {
      .edit-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    }
  }

  .btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;

    &.primary {
      background: #3498db;
      color: white;

      &:hover {
        background: #2980b9;
      }
    }

    &.danger {
      background: #e74c3c;
      color: white;

      &:hover {
        background: #c0392b;
      }
    }

    &.secondary {
      background: #95a5a6;
      color: white;

      &:hover {
        background: #7f8c8d;
      }
    }

    &.small {
      padding: 0.3rem 0.6rem;
      font-size: 0.85rem;
    }
  }
}
</style>
