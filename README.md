# cloudflare-worker-ai

- Uses an object detection model to distinguish between cars in the footage
```
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		if (request.method === "POST") {
			// Read the image data from the request
			const imageData = await request.arrayBuffer();

			if (!imageData || imageData.byteLength === 0) {
				return new Response("No image data received", { status: 400 });
			}

			// Convert image data into a Uint8Array
			const inputs = {
				image: [...new Uint8Array(imageData)], // The image data from ESP32
			};

			// Run AI model (example using DEtection model)
			const response = await env.AI.run(
				"@cf/facebook/detr-resnet-50",
				inputs
			);

			// Respond with the AI result
			return new Response(JSON.stringify({ inputs, response }), {
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response("Invalid Request", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
```
