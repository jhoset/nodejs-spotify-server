export interface AccessTokenRequest {
    grant_type: string;
    code: string;
    redirect_uri: string;
}