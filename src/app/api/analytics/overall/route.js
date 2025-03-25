export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const authToken = request.headers.get("authtoken");
    const url = new URL(request.url);
    const analyticsKeys = url.searchParams.get("for");

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

    if (!analyticsKeys) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Query parameter 'for' is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch data from the external API
    const response = await fetch(
      `http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/analytics/overall?for=${analyticsKeys}`,
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
      JSON.stringify({
        success: false,
        error: "Failed to fetch analytics data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
