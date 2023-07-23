const validate = require('../utils/validate');
const Pixel = require('../durableObjects/pixel');

async function handleRequest(request) {
  const { pixelId, color } = validate(request);

  if (!pixelId || !color) {
    return new Response('Invalid request', { status: 400 });
  }

  const pixel = new Pixel(pixelId);
  const result = await pixel.setColor(color);

  if (result) {
    return new Response('Pixel color updated', { status: 200 });
  } else {
    return new Response('Failed to update pixel color', { status: 500 });
  }
}

module.exports = handleRequest;