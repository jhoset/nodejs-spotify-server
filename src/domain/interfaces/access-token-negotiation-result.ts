export interface AccessTokenNegotiationResult {
    accessToken?: string;
    expiresIn?: number;
    refreshToken?: string;
    error?: string;
}