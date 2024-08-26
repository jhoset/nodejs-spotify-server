export interface RefreshTokenAuthOptions {
    url: string;
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
    data: {
        grant_type: string;
        refresh_token: string;
    };
}