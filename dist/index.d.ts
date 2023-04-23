export declare const signedGetRequest: (key: any) => Promise<{
    url: string;
}>;
export declare const signedPutRequest: (key: any, contentType: any, acl?: any) => Promise<{
    url: string;
    options: {
        method: string;
        headers: {
            'x-amz-acl': string | undefined;
            'Content-Type': any;
        };
    };
}>;
declare const _default: {
    signedGetRequest: (key: any) => Promise<{
        url: string;
    }>;
    signedPutRequest: (key: any, contentType: any, acl?: any) => Promise<{
        url: string;
        options: {
            method: string;
            headers: {
                'x-amz-acl': string | undefined;
                'Content-Type': any;
            };
        };
    }>;
};
export default _default;
