export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // Forward the request to the external API
    const response = await fetch(
      "http://hqz209bb9k9kmqnlmstwc2y6ry12zt.sdpl.in.net/auth/login",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    return Response.json({ authtoken: data.authtoken });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
