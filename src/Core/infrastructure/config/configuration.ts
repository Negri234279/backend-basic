export default (): EnvVar => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_TOKEN: process.env.JWT_TOKEN,
})

export interface EnvVar {
    PORT: number
    MONGODB_URI: string
    JWT_TOKEN: string
}
