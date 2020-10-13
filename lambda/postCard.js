const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TABLE_NAME = 'Cards';

exports.handler = async (event) => {
  console.log('Received : ', JSON.stringify(event, null, 2));

  try {
    const id = event.requestContext.requestId;
    const body = JSON.parse(event.body);

    const result = await documentClient.put({
      TableName: TABLE_NAME,
      Item: {
        id,
        title: body.title,
        category: body.category,
      },
    }).promise();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ id }),
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
