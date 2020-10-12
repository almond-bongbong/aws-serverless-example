const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TABLE_NAME = 'Cards';

exports.handler = async (event) => {
  console.log('Received : ', JSON.stringify(event, null, 2));

  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    const result = await documentClient.update({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set #c = :c, #t = :t',
      ExpressionAttributeNames: {
        '#c': 'category',
        '#t': 'title',
      },
      ExpressionAttributeValues: {
        ':c': body.category,
        ':t': body.title,
      },
    }).promise();

    console.log('Result : ', JSON.stringify(result));

    return { statusCode: 200 };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        Message: e,
      }),
    }
  }
};
