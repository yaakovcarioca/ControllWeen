module.exports = {
    apps: [
      {
        name: 'api',
        script: './index.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
        env: {
          NODE_ENV: 'production',
          PORT: 3000,
        },
      },
    ],
  };
  