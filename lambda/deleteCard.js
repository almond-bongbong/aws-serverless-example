const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TABLE_NAME = 'Cards';

exports.handler = async (event) => {
  console.log('Received : ', JSON.stringify(event, null, 2));

  try {
    const id = event.pathParameters.id;
    const result = await documentClient.delete({
      TableName: TABLE_NAME,
      Key: { id },
    }).promise();

    console.log('Result : ', JSON.stringify(result));

    return {
      statusCode: 204,
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        Message: e,
      }),
    }
  }
};
