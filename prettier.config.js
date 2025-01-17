/** @type {import('prettier').Config} */
const config = {
    plugins: ['prettier-plugin-tailwindcss', '@shufo/prettier-plugin-blade'],
    overrides: [
        {
            files: ['*.blade.php'],
            options: {
                parser: 'blade',
                tabWidth: 4,
                wrapAttributes: 'auto',
                sortTailwindcssClasses: true,
                sortHtmlAttributes: 'code-guide',
                noPhpSyntaxCheck: false,
            },
        },
    ],
    tailwindConfig: './tailwind.config.js',
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
};

export default config;
