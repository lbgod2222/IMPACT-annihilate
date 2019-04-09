module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'hotel-bg', // 项目名
      script: './server/index.js', // 执行文件
      instances: 0,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      ignore_watch: [ // 不用监听的文件
        'node_modules',
        'logs'
      ],
      autorestart: true, // 默认为true, 发生异常的情况下自动重启
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      },
      instance_var: 'INSTANCE_ID' // 添加这一行
    }
  ]
}
