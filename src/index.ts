export interface Env {
    AI: Ai;
}

export default {
    async fetch(request, env): Promise<Response> {
        // ESP32 Camera Stream URL
        const esp32_url = "http://172.20.10.10/"; // Change this to ESP32 IP

        // Fetch latest frame
        const esp_response = await fetch(esp32_url);
        const imageBlob = await esp_response.arrayBuffer();

        // Send image to AI Model
        const inputs = {
            image: [...new Uint8Array(imageBlob)],
        };

        const response = await env.AI.run("@cf/facebook/detr-resnet-50", inputs);

        return new Response(JSON.stringify({ response }));
    },
} satisfies ExportedHandler<Env>;
