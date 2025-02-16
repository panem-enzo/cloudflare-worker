export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Only POST requests are allowed", { status: 405 });
		}

		const blob = await request.arrayBuffer();
		const inputs = {
			image: [...new Uint8Array(blob)], // Convert to Uint8Array
		};

		const response = await env.AI.run(
			"@cf/facebook/detr-resnet-50",
			inputs
		);

		return new Response(JSON.stringify({ response }));
	},
} satisfies ExportedHandler<Env>;
