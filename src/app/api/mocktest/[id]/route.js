export async function GET(request, { params }) {
  try {
    // Extract authToken from request headers
    const authToken = request.headers.get("authtoken");

    // Extract `id` from the request URL params
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch data from the external API with the extracted `id`
    const response = await fetch(
      `http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/mocktest/${id}`,
      {
        headers: {
          authtoken: authToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in proxy:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
