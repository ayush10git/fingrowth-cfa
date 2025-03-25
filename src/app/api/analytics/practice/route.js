export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Extract authToken from request headers
    const authToken = request.headers.get("authtoken");
    const url = new URL(request.url);
    const analyticsKeys = url.searchParams.get("for");
    // console.log("analyticsKeys", analyticsKeys);

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
      `http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/analytics/practice?for=${analyticsKeys}`,
      {
        headers: {
          authtoken: authToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    // Get the response data
    const responseData = await response.json();

    // Return data in the exact format expected by the client
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in proxy:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch practice analytics data",
        data: null,
      },
      { status: 500 }
    );
  }
}
