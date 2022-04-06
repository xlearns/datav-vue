import { ref,onUnmounted } from "vue"

import {useIntervalFn} from './useIntervalFn'

// 解析object
function resolveNestedOptions(options){
  //不存在初始化
  if (options === true) return {} 
  return options
}

export function useWebSocket(url,options = {}){
  // 重连 retries：从连次数。delay：间隔。delay：onFailed：连接失败钩子。
  // autoReconnect = {retries，delay ,onFailed}  
  const {
      // connect钩子 第一个参数为ws
      onConnected,
      // close钩子 第一个参数为ws，第二个为关闭信息
      onDisconnected,
      // error钩子 第一个参数为ws，第二个为错误信息
      onError,
      // message钩子 第一个参数为ws，第二个参数为data
      onMessage,
      // 
      immediate = true,
      // 
      autoClose = true,
      // 指定ws可接受的子协议。
      protocols = [],
    }  = options

    //数据
    const data = ref(null)
    //连接状态
    const status = ref('CONNECTING')
    //ws
    const wsRef = ref()

    // 心跳检测
    let heartbeatPause
    let heartbeatResume
    // 关闭ws
    let explicitlyClosed = false
    // 重连次数
    let retried = 0

    //存放buffer数据
    let bufferedData = []  
    const close = (code = 1000, reason) => {
    }
    const _sendBuffer = () => {
      // 只有在open的状态才可以发送 
      // 发送没有绑定的数据
      if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
        for (const buffer of bufferedData) wsRef.value.send(buffer)
        bufferedData = []
      }
    }

    const send = (data, useBuffer = true) => {
      // 未绑定ws【open之前】调用send
      if (!wsRef.value || status.value !== 'OPEN') {
        if (useBuffer) bufferedData.push(data)
        return false
      }
      //绑定了ws【open之后】调用send
      _sendBuffer()
      wsRef.value.send(data)
      return true
    }

    const _init = () => {
      const ws = new WebSocket(url, protocols)
      wsRef.value = ws
      status.value = 'CONNECTING' 
      explicitlyClosed = false 
      ws.onopen = () => {
        status.value = 'OPEN'
        // connect函数钩子
        onConnected?.(ws)
        // 恢复 心跳检测
        heartbeatResume?.()
        _sendBuffer()
      }
      ws.onmessage = (e)=>{
        data.value = e.data
        onMessage?.(ws, e)
      }
      ws.onclose = (ev)=>{
        status.value = 'CLOSED'
        wsRef.value = undefined
        onDisconnected?.(ws, ev)
        if (!explicitlyClosed && options.autoReconnect) {
          const {
            retries = -1,
            delay = 1000,
            onFailed,
          } = resolveNestedOptions(options.autoReconnect)
          retried += 1
  
          if (typeof retries === 'number' && (retries < 0 || retried < retries))
            setTimeout(_init, delay)
          else if (typeof retries === 'function' && retries())
            setTimeout(_init, delay)
          else{
            onFailed?.()
          }
        }
      }
      ws.onerror = (e)=>{
        onError?.(ws, e)
      }
    }

    //是否开启心跳
    if (options.heartbeat) {
      const {
        // 发送的消息
        message = 'ping',
        // 每次发送的间隔
        interval = 1000,
      } = resolveNestedOptions(options.heartbeat)

      const { pause, resume } = useIntervalFn(
        () => send(message, false),
        interval,
        { immediate: false },
      )
      heartbeatPause = pause
      heartbeatResume = resume
    }
    //直接运行
    if (immediate) _init()
    //自动关闭
    if (autoClose) {
      window.addEventListener("beforeunload",()=>{
        close()
      })
      onUnmounted(()=>{
        close()
      })
    }
    // 重新打开ws 【确保只能运行一个ws】 
    const open = () => {
      close()
      retried = 0
      _init()
    }

    return {
      // 数据
      data,
      // 状态
      status,
      // 关闭函数
      close,
      // 发送函数
      send,
      // 打开函数
      open,
      // ws对象
      ws: wsRef,
    }
  }