import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Boxes,
  Cable,
  Droplets,
  Fan,
  Gauge,
  LayoutDashboard,
  Radio,
  ShieldCheck,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";
import type { EChartsOption } from "echarts";
import { EChart } from "./EChart";
import tunnelBg from "../assets/utility-tunnel-bg.jpg";

type PageKey = "overview" | "environment" | "energy" | "security" | "equipment" | "maintenance";

const nav = [
  { key: "overview", label: "综合态势总览", to: "/", icon: LayoutDashboard },
  { key: "environment", label: "环境监测中心", to: "/environment", icon: Thermometer },
  { key: "energy", label: "能源管线监管", to: "/energy", icon: Zap },
  { key: "security", label: "安全预警联控", to: "/security", icon: ShieldCheck },
  { key: "equipment", label: "设备运行管理", to: "/equipment", icon: Boxes },
  { key: "maintenance", label: "智能运维调度", to: "/maintenance", icon: Wrench },
] as const;

const axis = { axisLine: { lineStyle: { color: "rgba(132,224,255,.25)" } }, axisLabel: { color: "#9bc6d7" }, splitLine: { lineStyle: { color: "rgba(132,224,255,.08)" } } };
const tooltip = { trigger: "axis" as const, backgroundColor: "rgba(3,20,31,.92)", borderColor: "#16d9ff", textStyle: { color: "#e7faff" } };
const legend = { top: 8, right: 8, textStyle: { color: "#b7dfeb" } };
const palette = ["#19e6ff", "#58ffb5", "#ffcc4d", "#ff5c96", "#776bff"];

const lineOption: EChartsOption = {
  color: palette, tooltip, legend: { ...legend, data: ["温度", "湿度", "氧含量"] },
  grid: { left: 44, right: 20, top: 52, bottom: 30 },
  xAxis: { type: "category", data: ["00", "04", "08", "12", "16", "20", "24"], ...axis },
  yAxis: { type: "value", ...axis },
  series: [
    { name: "温度", type: "line", smooth: true, data: [22, 23, 22, 26, 25, 24, 23], areaStyle: { opacity: .16 }, symbolSize: 7 },
    { name: "湿度", type: "line", smooth: true, data: [46, 51, 48, 57, 54, 49, 47], symbolSize: 7 },
    { name: "氧含量", type: "line", smooth: true, data: [20, 21, 20, 19, 20, 21, 21], symbolSize: 7 },
  ],
};

const barOption: EChartsOption = {
  color: palette, tooltip, legend: { ...legend, data: ["用电", "节能"] },
  grid: { left: 45, right: 20, top: 52, bottom: 30 },
  xAxis: { type: "category", data: ["一舱", "二舱", "三舱", "四舱", "五舱", "六舱"], ...axis },
  yAxis: { type: "value", ...axis },
  series: [{ name: "用电", type: "bar", data: [82, 64, 91, 72, 56, 78], barWidth: 14 }, { name: "节能", type: "bar", data: [18, 24, 13, 28, 31, 22], barWidth: 14 }],
};

const pieOption: EChartsOption = {
  color: palette, tooltip: { trigger: "item" }, legend: { bottom: 4, textStyle: { color: "#b7dfeb" } },
  series: [{ type: "pie", radius: ["52%", "72%"], center: ["50%", "43%"], label: { color: "#dff9ff", formatter: "{d}%" }, data: [{ value: 62, name: "正常" }, { value: 18, name: "维护" }, { value: 12, name: "离线" }, { value: 8, name: "告警" }] }],
};

const radarOption: EChartsOption = {
  color: palette, legend: { ...legend, data: ["当前", "基准"] },
  radar: { radius: "62%", indicator: [{ name: "供电", max: 100 }, { name: "通风", max: 100 }, { name: "排水", max: 100 }, { name: "消防", max: 100 }, { name: "通信", max: 100 }, { name: "安防", max: 100 }], axisName: { color: "#b7dfeb" }, splitArea: { areaStyle: { color: ["rgba(25,230,255,.02)", "rgba(25,230,255,.07)"] } }, splitLine: { lineStyle: { color: "rgba(25,230,255,.2)" } } },
  series: [{ type: "radar", data: [{ value: [92, 81, 88, 94, 76, 90], name: "当前", areaStyle: { opacity: .2 } }, { value: [80, 80, 80, 80, 80, 80], name: "基准", lineStyle: { type: "dashed" } }] }],
};

const statsByPage: Record<PageKey, Array<[string, string, string, typeof Activity]>> = {
  overview: [["在线设备", "2,846", "99.2%", Radio], ["管廊总长", "128.6", "km", Cable], ["今日告警", "12", "较昨日 -8", AlertTriangle], ["综合评分", "96.8", "优秀", ShieldCheck]],
  environment: [["平均温度", "23.8", "℃", Thermometer], ["平均湿度", "48.2", "%RH", Droplets], ["氧含量", "20.7", "%", Activity], ["通风效率", "94.6", "%", Fan]],
  energy: [["实时负荷", "3.82", "MW", Zap], ["今日用电", "46.7", "MWh", Gauge], ["峰谷比", "1.36", "稳定", Activity], ["节能率", "18.4", "%", ShieldCheck]],
  security: [["安全运行", "186", "天", ShieldCheck], ["待处置", "7", "项", AlertTriangle], ["消防在线", "100", "%", Activity], ["巡检覆盖", "98.6", "%", Radio]],
  equipment: [["设备总数", "2,846", "台", Boxes], ["运行中", "2,792", "台", Activity], ["保养到期", "23", "台", Wrench], ["健康指数", "93.5", "分", Gauge]],
  maintenance: [["今日工单", "38", "单", Wrench], ["处理中", "9", "单", Activity], ["平均响应", "4.2", "min", Radio], ["闭环率", "97.8", "%", ShieldCheck]],
};

const pageInfo: Record<PageKey, [string, string]> = {
  overview: ["综合态势", "全域管廊运行态势与风险实时感知"], environment: ["环境监测", "多舱环境因子与通风系统联动分析"],
  energy: ["能源管线", "电力负荷、能耗结构与输配状态"], security: ["安全预警", "风险事件分级研判与联动处置"],
  equipment: ["设备管理", "全生命周期设备健康状态追踪"], maintenance: ["智能运维", "工单、班组与巡检任务协同调度"],
};

function Glass({ title, code, children, className = "" }: { title: string; code?: string; children: React.ReactNode; className?: string }) {
  return <section className={`glass-panel group ${className}`}><div className="panel-heading"><div><span className="panel-dot" />{title}</div>{code && <span>{code}</span>}</div>{children}</section>;
}

function StatCards({ page }: { page: PageKey }) {
  return <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{statsByPage[page].map(([label, value, unit, Icon], i) => <div className="stat-card" key={label}><div><p>{label}</p><strong>{value}</strong><small>{unit}</small></div><Icon className={`stat-icon tone-${i}`} /><i /></div>)}</div>;
}

const rows = [
  ["GL-A01", "东区电力舱", "温度传感器", "23.6 ℃", "正常"], ["GL-B07", "北区综合舱", "排水泵组", "运行中", "正常"],
  ["GL-C12", "南区燃气舱", "甲烷探测器", "18 ppm", "关注"], ["GL-D03", "西区通信舱", "光纤环网", "8.2 Gbps", "正常"],
  ["GL-F16", "核心控制段", "智能井盖", "低电量", "告警"],
];

function DataTable({ title = "关键设施实时状态" }: { title?: string }) {
  return <Glass title={title} code="LIVE DATA"><div className="overflow-x-auto"><table className="data-table"><thead><tr><th>编号</th><th>区域</th><th>监测对象</th><th>实时值</th><th>状态</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}>{r.slice(0, 4).map((v) => <td key={v}>{v}</td>)}<td><span className={`status ${r[4] === "正常" ? "ok" : r[4] === "关注" ? "warn" : "danger"}`}>{r[4]}</span></td></tr>)}</tbody></table></div></Glass>;
}

function Overview() { return <><StatCards page="overview" /><div className="grid gap-3 xl:grid-cols-[1.35fr_.8fr_.8fr]"><Glass title="全域环境趋势" code="24H"><EChart option={lineOption} className="h-72" /></Glass><Glass title="系统能力画像"><EChart option={radarOption} className="h-72" /></Glass><Glass title="设备状态分布"><EChart option={pieOption} className="h-72" /></Glass></div><div className="grid gap-3 xl:grid-cols-[1.2fr_1fr]"><DataTable /><Glass title="实时事件流" code="AUTO REFRESH"><EventFeed /></Glass></div></>; }
function Environment() { return <><StatCards page="environment" /><div className="grid gap-3 xl:grid-cols-[1fr_1.55fr]"><Glass title="环境达标率"><EChart option={pieOption} className="h-80" /></Glass><Glass title="多因子 24H 变化曲线"><EChart option={lineOption} className="h-80" /></Glass></div><div className="grid gap-3 xl:grid-cols-3"><MetricGauge label="硫化氢 H₂S" value="0.008" max="10 ppm" percent={12} /><MetricGauge label="一氧化碳 CO" value="3.2" max="30 ppm" percent={28} /><MetricGauge label="可燃气体 LEL" value="1.4" max="25 %" percent={18} /></div><DataTable title="环境监测点位清单" /></>; }
function Energy() { return <><StatCards page="energy" /><div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]"><Glass title="分舱能耗对比" code="MWh"><EChart option={barOption} className="h-80" /></Glass><Glass title="能源结构占比"><EChart option={pieOption} className="h-80" /></Glass></div><div className="grid gap-3 xl:grid-cols-[.8fr_1.2fr]"><Glass title="管线负载拓扑"><PipelineFlow /></Glass><DataTable title="能源计量节点" /></div></>; }
function Security() { return <><StatCards page="security" /><div className="grid gap-3 xl:grid-cols-[.75fr_1.25fr]"><Glass title="风险等级分布"><RiskStack /></Glass><Glass title="预警频次趋势"><EChart option={lineOption} className="h-80" /></Glass></div><div className="grid gap-3 xl:grid-cols-[1.2fr_.8fr]"><DataTable title="待处置安全事件" /><Glass title="联动响应状态"><EventFeed /></Glass></div></>; }
function Equipment() { return <><StatCards page="equipment" /><div className="grid gap-3 xl:grid-cols-[1fr_1fr_1fr]"><Glass title="设备健康雷达"><EChart option={radarOption} className="h-72" /></Glass><Glass title="运行状态分布"><EChart option={pieOption} className="h-72" /></Glass><Glass title="故障类型统计"><EChart option={barOption} className="h-72" /></Glass></div><DataTable title="重点设备健康档案" /></>; }
function Maintenance() { return <><StatCards page="maintenance" /><div className="grid gap-3 xl:grid-cols-[1.25fr_.75fr]"><Glass title="工单处理效能"><EChart option={barOption} className="h-80" /></Glass><Glass title="班组负载"><TeamLoad /></Glass></div><div className="grid gap-3 xl:grid-cols-[.85fr_1.15fr]"><Glass title="今日调度时间轴"><EventFeed /></Glass><DataTable title="智能巡检任务" /></div></>; }

function EventFeed() { return <div className="event-feed">{[["02:38", "北区排水泵自动启停", "自动联动"], ["02:31", "C12 点位气体浓度波动", "重点关注"], ["02:22", "巡检机器人通过节点 08", "任务正常"], ["02:08", "照明回路执行节能策略", "节能 12%"]].map(([t, x, s], i) => <div key={t}><time>{t}</time><i className={`tone-${i}`} /><p>{x}<small>{s}</small></p></div>)}</div>; }
function MetricGauge({ label, value, max, percent }: { label: string; value: string; max: string; percent: number }) { return <Glass title={label}><div className="metric-gauge"><strong>{value}</strong><span>{max}</span><div><i style={{ width: `${percent}%` }} /></div><small>浓度处于安全区间</small></div></Glass>; }
function PipelineFlow() { return <div className="pipeline-flow"><div className="node source"><Zap />主变电站</div><i /><div className="node"><Cable />环网柜</div><i /><div className="node"><Boxes />分舱节点</div><i /><div className="node target"><Activity />末端设备</div></div>; }
function RiskStack() { return <div className="risk-stack">{[["一级 / 紧急", 2, "danger"], ["二级 / 重要", 5, "warn"], ["三级 / 一般", 16, "cyan"], ["四级 / 提示", 32, "green"]].map(([x, n, c]) => <div key={String(x)}><span className={String(c)}>{n}</span><p>{x}<small>较昨日下降 6%</small></p></div>)}</div>; }
function TeamLoad() { return <div className="team-load">{[["机电一组", 82], ["管线二组", 64], ["应急小组", 91], ["机器人组", 48]].map(([x, n]) => <div key={String(x)}><div><span>{x}</span><b>{n}%</b></div><p><i style={{ width: `${n}%` }} /></p></div>)}</div>; }

export function PipeDashboard({ page }: { page: PageKey }) {
  const [title, subtitle] = pageInfo[page];
  const content = { overview: <Overview />, environment: <Environment />, energy: <Energy />, security: <Security />, equipment: <Equipment />, maintenance: <Maintenance /> }[page];
  return <div className="dashboard-shell"><img src={tunnelBg} width={1920} height={1080} alt="蓝色地下综合管廊内部" className="tunnel-bg" /><div className="scene-shade" /><header className="top-nav"><nav>{nav.slice(0, 3).map((item) => <NavItem key={item.key} item={item} active={page === item.key} />)}</nav><div className="brand"><small>URBAN UTILITY TUNNEL</small><h1>城市地下管廊智慧监管平台</h1><span><i />全域在线 · 实时感知</span></div><nav>{nav.slice(3).map((item) => <NavItem key={item.key} item={item} active={page === item.key} />)}</nav></header><main><div className="page-heading"><div><span>CONTROL / {page.toUpperCase()}</span><h2>{title}</h2><p>{subtitle}</p></div><div className="live-clock"><i /><span>系统运行正常</span><b>2026.09.23&nbsp;&nbsp;10:39:28</b></div></div><div className="space-y-3">{content}</div></main><footer><span>数据更新延迟 28ms</span><span>在线节点 128 / 128</span><span>GIS 坐标 31.2304°N · 121.4737°E</span></footer></div>;
}

function NavItem({ item, active }: { item: typeof nav[number]; active: boolean }) { const Icon = item.icon; return <Link to={item.to} className={`nav-item ${active ? "active" : ""}`}><Icon /><span>{item.label}</span></Link>; }