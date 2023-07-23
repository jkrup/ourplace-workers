const validate = (request) => {
  const { headers } = request;
  const session = headers.get('session');

  if (!session) {
    throw new Error('No session provided');
  }

  const { pixelId, color } = request.body;

  if (!pixelId || !color) {
    throw new Error('Missing parameters: pixelId and color are required');
  }

  return { session, pixelId, color };
};

module.exports = validate;