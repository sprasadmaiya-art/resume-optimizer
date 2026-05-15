import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DashboardOverview() {
  // Directly redirect to the working optimization feature to completely bypass DB errors
  redirect("/dashboard/optimize");
}
