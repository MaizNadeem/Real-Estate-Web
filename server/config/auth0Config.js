import { auth } from 'express-oauth2-jwt-bearer '

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: env("ISSUER_BASE_URL"),
    tokenSigningAlg: "RS256",
})

export default jwtCheck