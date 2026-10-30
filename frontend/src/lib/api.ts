export interface ApodData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string | null;
  media_type: "image" | "video" | string;
  thumbnail_url?: string | null;
  copyright?: string | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * Fetch the NASA Astronomy Picture of the Day from the AstroDaily FastAPI backend.
 *
 * @param date Optional ISO date string (YYYY-MM-DD). If omitted, returns today's APOD.
 * @returns Promise resolving to ApodData
 */
export async function getApod(date?: string): Promise<ApodData> {
  const url = new URL("/api/apod", API_BASE_URL);
  if (date) {
    url.searchParams.set("date", date);
  }

  try {
    const res = await fetch(url.toString(), {
      // Revalidate hourly or cache as appropriate
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      let errorMessage = `Failed to fetch APOD (${res.status} ${res.statusText})`;
      try {
        const errorData = await res.json();
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {
        // If not JSON, use default status text
      }

      throw new Error(errorMessage);
    }

    const data: ApodData = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected network error occurred while connecting to AstroDaily API.");
  }
}
