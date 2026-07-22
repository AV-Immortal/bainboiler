import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. 自动开放 Public 权限
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        // 我们要开放读取权限的 API 列表
        const apisToOpen = [
          'api::page-config.page-config',
          'api::site-setting.site-setting',
          'api::product.product',
          'api::solution.solution',
          'api::project.project',
          'api::article.article',
          'api::video.video',
          'api::download.download'
        ];

        for (const apiUID of apisToOpen) {
          // 查找是否已经有这些权限记录
          const existingPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
            where: {
              role: publicRole.id,
              action: {
                $in: [`${apiUID}.find`, `${apiUID}.findOne`]
              }
            }
          });

          // 如果没有 find 权限，则创建
          if (!existingPermissions.find(p => p.action === `${apiUID}.find`)) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: `${apiUID}.find`,
                role: publicRole.id,
              }
            });
          }

          // 如果没有 findOne 权限，则创建
          if (!existingPermissions.find(p => p.action === `${apiUID}.findOne`)) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: `${apiUID}.findOne`,
                role: publicRole.id,
              }
            });
          }
        }
        strapi.log.info('✅ Public permissions automatically granted.');
      }
    } catch (err) {
      strapi.log.error('❌ Failed to set public permissions', err);
    }

    // 2. 自动注入首页测试数据 (仅在没有首页配置时注入)
    try {
      const existingHome = await strapi.db.query('api::page-config.page-config').findOne({
        where: { slug: 'home' }
      });

      if (!existingHome) {
        strapi.log.info('⏳ Seeding initial homepage data...');
        
        // 创建中文版首页配置
        const zhHome = await strapi.entityService.create('api::page-config.page-config', {
          data: {
            title: '首页',
            slug: 'home',
            locale: 'zh-Hans',
            publishedAt: new Date(), // 必须发布
            modules: [
              {
                __component: 'modules.hero-video',
                title: '赋能全球重工产业',
                subtitle: 'BAIN BOILER 提供世界级的工业锅炉解决方案与卓越的服务',
                videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40142-424754716_large.mp4',
                primaryCtaText: '联系我们',
                primaryCtaLink: '/contact',
                secondaryCtaText: '探索解决方案',
                secondaryCtaLink: '/solutions'
              },
              {
                __component: 'modules.brand-stats',
                items: [
                  { label: '全球客户', value: '500+' },
                  { label: '专利技术', value: '120' },
                  { label: '行业经验', value: '30年' }
                ]
              }
            ]
          }
        });

        // 尝试创建英文本地化版本 (如果 i18n 插件启用了的话)
        try {
          await strapi.entityService.create('api::page-config.page-config', {
            data: {
              title: 'Home',
              slug: 'home',
              locale: 'en',
              localizations: [zhHome.id],
              publishedAt: new Date(),
              modules: [
                {
                  __component: 'modules.hero-video',
                  title: 'Empowering Global Heavy Industry',
                  subtitle: 'BAIN BOILER delivers world-class industrial boiler solutions and excellence in service.',
                  videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40142-424754716_large.mp4',
                  primaryCtaText: 'Contact Us',
                  primaryCtaLink: '/contact',
                  secondaryCtaText: 'Explore Solutions',
                  secondaryCtaLink: '/solutions'
                },
                {
                  __component: 'modules.brand-stats',
                  items: [
                    { label: 'Global Clients', value: '500+' },
                    { label: 'Patented Tech', value: '120' },
                    { label: 'Years Experience', value: '30' }
                  ]
                }
              ]
            }
          });
          strapi.log.info('✅ Initial homepage data seeded successfully (zh & en).');
        } catch (enErr) {
          strapi.log.info('✅ Initial homepage data seeded successfully (zh only - i18n might need manual setup first).');
        }
      }
    } catch (err) {
      strapi.log.error('❌ Failed to seed homepage data. Ensure content types are created.', err);
    }
  },
};
