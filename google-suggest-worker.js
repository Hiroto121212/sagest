export default {
  async fetch(request) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const hl = url.searchParams.get("hl") || "ja";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (!q.trim()) {
      return json(["", []]);
    }

    const target = new URL("https://suggestqueries.google.com/complete/search");
    target.searchParams.set("client", "firefox");
    target.searchParams.set("hl", hl);
    target.searchParams.set("q", q);

    const res = await fetch(target.toString(), { cf: { cacheTtl: 60, cacheEverything: true } });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        ...corsHeaders(),
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=60"
      }
    });
  }
};

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type"
  };
}

function json(value) {
  return new Response(JSON.stringify(value), {
    headers: { ...corsHeaders(), "content-type": "application/json; charset=utf-8" }
  });
}
