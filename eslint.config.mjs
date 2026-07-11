import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  // Directories that should never be linted
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  // Next.js recommended rules (Core Web Vitals) + TypeScript rules
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default eslintConfig;
