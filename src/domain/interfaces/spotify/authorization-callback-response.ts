export interface AuthorizationCallbackResponse {
    code?: string;
    error?: string;
    state: string;
}