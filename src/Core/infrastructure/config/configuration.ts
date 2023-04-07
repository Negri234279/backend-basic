export default (): EnvVar => ({
    APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_TOKEN: process.env.JWT_TOKEN,
})

export interface EnvVar {
    APP_PORT: number
    MONGODB_URI: string
    JWT_TOKEN: string
}
