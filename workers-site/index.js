import { handleRequest } from './src/handlers/api.js';
import { validate } from './src/utils/validate.js';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const { request } = event;
  const { url } = request;

  let response;
  if (url.includes('/api')) {
    if (!validate(request)) {
      return new Response('Invalid session', { status: 403 });
    }
    response = await handleRequest(request);
  } else {
    response = new Response('Not found', { status: 404 });
  }

  return response;
}