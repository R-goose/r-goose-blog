import request from '@/utils/request'
export const timergApi = {
  // 获取使用记录列表
  getList: () =>
    request.get('/timer'),

  // 新增计时器使用记录
  postUseRecord: (data) =>
    request.post('/timer', data),

  // 删除计时器使用记录
  deleteUsedRecord: (id) =>
    request.delete(`/timer/${id}`),

  // 获取预设按钮时间列表
  getPreSetTimeList: () =>
    request.get('/preSetTime'),

  //查找预设按钮时间
  findPreSetTime: (id) =>
    request.get(`/preSetTime/${id}`),

  //添加预设按钮时间
  addPreSetTime: (data) =>
    request.post('/preSetTime', data),

  // 修改预设按钮时间
  updatePreSetTime: (id, data) =>
    request.put(`/preSetTime/${id}`, data),

  //获取上次使用的倒计时时间
  getLastUsedTime: () =>
    request.get('/lastUsedTime'),

  //修改上次使用的倒计时时间
  updateLastUsedTime: (id, data) =>
    request.put(`/lastUsedTime/${id}`, data)
}
