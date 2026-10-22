import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.clinpharm.hospital",
  appName: "ClinPharm Hospital",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#0b3433",
      showSpinner: false,
    },
  },
};

export default config;
