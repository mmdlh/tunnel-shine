import { createFileRoute } from "@tanstack/react-router";
import { PipeDashboard } from "../components/PipeDashboard";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "综合态势｜城市地下管廊智慧监管平台" }, { name: "description", content: "城市地下综合管廊运行态势、环境、能源与安全风险综合监控平台。" }, { property: "og:title", content: "城市地下管廊智慧监管平台" }, { property: "og:description", content: "全域管廊运行态势与风险实时感知。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <PipeDashboard page="overview" />;
}
