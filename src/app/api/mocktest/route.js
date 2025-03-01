export const dynamic = "force-dynamic"; 

export async function GET(request) {
  try {
    // Get the authToken from the request headers
    const authToken = request.headers.get("authtoken");
    console.log(authToken);
    

    const response = await fetch(
      "http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/mocktest",
      {
        headers: {
          authtoken: authToken,
        },
      }
    );

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
