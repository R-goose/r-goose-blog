import { supabase } from '@/lib/supabaseClient'

export const timerApi = {
  // 获取使用记录列表
  getList: async () => {
    const { data, error } = await supabase
      .from('records')
      .select('*')
      .order('used_time', { ascending: false })
    if (error) throw error
    return data
  },

  // 新增计时器使用记录
  postUseRecord: async (data) => {
    const { error } = await supabase
      .from('records')
      .insert([
        {
          name: data.name,
          value: data.value,
          used_time: data.used_time // 注意：字段名要和数据库一致！
        }
      ])
    if (error) throw error
  },

  // 删除计时器使用记录
  deleteUsedRecord: async (id) => {
    const { error } = await supabase
      .from('records')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // 获取预设按钮时间列表
  getPreSetTimeList: async () => {
    const { data, error } = await supabase
      .from('pre_set_time') // 表名是下划线！
      .select('*')
    if (error) throw error
    return data
  },

  // 查找预设按钮时间
  findPreSetTime: async (id) => {
    const { data, error } = await supabase
      .from('pre_set_time')
      .select('*')
      .eq('id', id)
      .single() // 只返回一条
    if (error) throw error
    return data
  },

  // 添加预设按钮时间
  addPreSetTime: async (data) => {
    const { error } = await supabase
      .from('pre_set_time')
      .insert([
        {
          name: data.name,
          value: data.value
        }
      ])
    if (error) throw error
  },

  // 修改预设按钮时间
  updatePreSetTime: async (id, data) => {
    const { error } = await supabase
      .from('pre_set_time')
      .update({
        name: data.name,
        value: data.value
      })
      .eq('id', id)
    if (error) throw error
  },

  // 获取上次使用的倒计时时间（我们约定 id = 'current'）
  getLastUsedTime: async () => {
    const { data, error } = await supabase
      .from('last_used_time')
      .select('*')
      .eq('id', 'f47ac10b-58cc-4372-a567-0e02b2c3d479')
    if (error) throw error
    // 返回第一条，或空对象
    return data.length > 0 ? data[0] : null
  },

  // 修改上次使用的倒计时时间
  updateLastUsedTime: async (data) => {
    const { error } = await supabase
      .from('last_used_time')
      .upsert({
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // 固定 ID，方便管理
        hours: data.hours,
        minutes: data.minutes,
        seconds: data.seconds
      })
    if (error) throw error
  }
}
