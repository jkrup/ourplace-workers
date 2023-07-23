class Pixel {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const { pixelId, color } = request;
    this.state.pixelId = pixelId;
    this.state.color = color;
    this.state.lastUpdate = new Date().toISOString();
    return new Response('Pixel updated successfully', { status: 200 });
  }
}

export default {
  async fetch(request, env, ctx) {
    return await ctx.bindings.pixel.fetch(request);
  }
}