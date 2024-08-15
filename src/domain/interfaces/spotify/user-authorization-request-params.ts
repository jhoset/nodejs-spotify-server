export interface UserAuthorizationRequestParams {
    client_id: string;
    response_type: string;
    redirect_uri: string;
    state?: string;
    scope?: string;
    show_dialog?: boolean;
}