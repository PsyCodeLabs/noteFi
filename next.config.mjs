/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    }
}
export default nextConfig;
