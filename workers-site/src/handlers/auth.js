const validate = require('../utils/validate');
const session = require('../durableObjects/session');

async function handleRequest(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 });
  }

  const sessionId = validate(authHeader);
  if (!sessionId) {
    return new Response('Invalid session', { status: 401 });
  }

  const sessionObj = session.get(sessionId);
  const isActive = await sessionObj.fetch('/isActive');

  if (!isActive) {
    return new Response('Session expired', { status: 401 });
  }

  return new Response('Authenticated', { status: 200 });
}

module.exports = handleRequest;