export async function GET(request) {
  try {
    // Extract authToken from request headers
    const authToken = request.headers.get("authtoken");

    if (!authToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Authentication token is required",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch data from the external API
    const response = await fetch(
      "http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/subject",
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
      JSON.stringify({ success: false, error: "Failed to fetch subject data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
