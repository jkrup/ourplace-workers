const time = require('../utils/time');

class Session {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const { headers } = request;
    const auth = headers.get('Authorization');

    if (!auth) {
      return new Response('Unauthorized', { status: 401 });
    }

    const session = await this.env.session.get(auth);

    if (!session) {
      return new Response('Session not found', { status: 404 });
    }

    session.lastUpdate = time.getCurrentTimestamp();
    await this.env.session.put(auth, session);

    return new Response('Session updated', { status: 200 });
  }
}

export default {
  async fetch(request, env) {
    return await new Session(DurableObjectState, env).fetch(request);
  }
}