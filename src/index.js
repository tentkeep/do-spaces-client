const aws = require('aws-sdk')

const spacesEndpoint = new aws.Endpoint(`${process.env.DIGITALOCEAN_REGION}.digitaloceanspaces.com`)

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DIGITALOCEAN_SPACE_KEY,
  secretAccessKey: process.env.DIGITALOCEAN_SPACE_SECRET
})

const signedRequest = (key, contentType, acl) => {
  var params = {
    Bucket: process.env.DIGITALOCEAN_SPACE_NAME,
    Expires: 20,
    Key: key
  }

  if (contentType) {
    params.ContentType = contentType
    params.ACL = acl || 'private'
  }

  const operation = contentType ? 'putObject' : 'getObject'

  const url = s3.getSignedUrl(operation, params)

  return {
    url,
    options: !contentType ? undefined : {
      headers: {
        'x-amz-acl': params.ACL,
        'Content-Type': contentType
      }
    }
  }
}

module.exports = {
  signedRequest
}
