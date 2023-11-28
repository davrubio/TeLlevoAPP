import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.tellevoapp',
  appName: 'TeLlevoAPP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile','email'],
      serverClientId: '1080604287465-lfs4jki8ndrab9691svqklt0emebebja.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
