import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'solditime',
  tagline: 'The modern open-source time-tracker',
  favicon: 'img/favicon.ico',

  plugins: [require.resolve('docusaurus-lunr-search')],

  // Set the production url of your site here
  url: 'https://docs.solidtime.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og_image.png',
    navbar: {
      title: 'solidtime',
      items: [
        {
          type: 'doc',
          docId: 'user-guide/intro',
          position: 'left',
          label: 'User guide',
        },
        {
          type: 'doc',
          docId: 'self-hosting/intro',
          position: 'left',
          label: 'Self-hosting',
        },
        {
          href: 'https://www.solidtime.io',
          label: 'Homepage',
          position: 'right',
        },
        {
          href: 'https://github.com/solidtime-io/solidtime',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/solidtime-io/solidtime',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} solidtime.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
