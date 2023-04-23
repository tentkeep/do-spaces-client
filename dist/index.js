import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const s3Client = new S3({
    forcePathStyle: false,
    endpoint: `https://${process.env.DIGITALOCEAN_REGION}.digitaloceanspaces.com`,
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.DIGITALOCEAN_SPACE_KEY,
        secretAccessKey: process.env.DIGITALOCEAN_SPACE_SECRET,
    },
});
export const signedGetRequest = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.DIGITALOCEAN_SPACE_NAME,
        Key: key,
    });
    const options = { expiresIn: 20 };
    const url = await getSignedUrl(s3Client, command, options);
    return { url };
};
export const signedPutRequest = async (key, contentType, acl) => {
    const command = new PutObjectCommand({
        Bucket: process.env.DIGITALOCEAN_SPACE_NAME,
        Key: key,
        ContentType: contentType,
        ACL: acl ?? 'private',
    });
    const options = { expiresIn: 20 };
    const url = await getSignedUrl(s3Client, command, options);
    return {
        url,
        options: {
            method: 'put',
            headers: {
                'x-amz-acl': command.input.ACL,
                'Content-Type': contentType,
            },
        },
    };
};
export default {
    signedGetRequest,
    signedPutRequest,
};
//# sourceMappingURL=index.js.map