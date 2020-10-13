const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const TABLE_NAME = 'Cards';

exports.handler = async (event) => {
  console.log('Received : ', JSON.stringify(event, null, 2));

  try {
    const request = documentClient.scan({ TableName: TABLE_NAME });
    const cards = await request.promise();
    console.log(cards);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(cards),
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
