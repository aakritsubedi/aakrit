import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const dataFastApiUrl = "https://datafa.st/api/v1/analytics";

type DataFastMetricResponse = {
  data?: Array<{ visitors?: unknown }>;
};

function getVisitors(payload: DataFastMetricResponse): number {
  const visitors = payload.data?.[0]?.visitors;
  return typeof visitors === "number" && Number.isFinite(visitors)
    ? visitors
    : 0;
}

function addWebsiteId(params: URLSearchParams, apiKey: string) {
  if (!apiKey.startsWith("dft_")) return true;

  const websiteId = process.env.DATAFAST_WEBSITE_ID?.trim();
  if (!websiteId) return false;

  params.set("websiteId", websiteId);
  return true;
}

export async function GET() {
  const apiKey = process.env.DATAFAST_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "DataFast analytics is not configured" },
      { status: 503 }
    );
  }

  const realtimeParams = new URLSearchParams({ fields: "visitors" });
  // Omitting startAt/endAt makes DataFast return the all-time total.
  const allTimeParams = new URLSearchParams({ fields: "visitors" });

  if (
    !addWebsiteId(realtimeParams, apiKey) ||
    !addWebsiteId(allTimeParams, apiKey)
  ) {
    return NextResponse.json(
      { error: "DataFast website configuration is missing" },
      { status: 503 }
    );
  }

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const [realtimeResponse, overviewResponse] = await Promise.all([
      fetch(`${dataFastApiUrl}/realtime?${realtimeParams}`, {
        cache: "no-store",
        headers,
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`${dataFastApiUrl}/overview?${allTimeParams}`, {
        cache: "no-store",
        headers,
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    if (!realtimeResponse.ok || !overviewResponse.ok) {
      return NextResponse.json(
        { error: "DataFast analytics is unavailable" },
        { status: 502 }
      );
    }

    const [realtime, overview] = (await Promise.all([
      realtimeResponse.json(),
      overviewResponse.json(),
    ])) as [DataFastMetricResponse, DataFastMetricResponse];

    return NextResponse.json(
      {
        online: getVisitors(realtime),
        updatedAt: new Date().toISOString(),
        visitorsTotal: getVisitors(overview),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "DataFast analytics is unavailable" },
      { status: 502 }
    );
  }
}
