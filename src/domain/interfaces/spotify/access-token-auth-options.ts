export interface AccessTokenAuthOptions {
    url: string;
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
    data: {
        grant_type: string;
        code: string;
        redirect_uri: string;
    };
}