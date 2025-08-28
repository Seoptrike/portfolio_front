// src/components/admin/UptimeRobotDashboard.jsx
import React, { useMemo } from "react";
import {
    ResponsiveContainer, LineChart, Line,
    XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import "./uptime-theme.css"

const UptimeRobotDashboard = ({ data }) => {
    const monitors = data?.monitors ?? [];
    if (data?.stat !== "ok") return <div className="alert alert-danger">UptimeRobot 응답 오류</div>;
    if (!monitors.length) return <div className="text-muted">모니터가 없습니다.</div>;
    return (
        <div className="d-flex flex-column gap-4">
            {monitors.map(m => <MonitorCard key={m.id} monitor={m} />)}
        </div>
    );
};
export default UptimeRobotDashboard;

/* ---------- utils ---------- */
const toKST = (unixSec) =>
    new Date(unixSec * 1000).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

const toKSTShort = (unixSec) =>
    new Date(unixSec * 1000).toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    });

const statusClass = (s) => {
    switch (Number(s)) {
        case 2: return { text: "UP", cls: "status-pill status-up" };
        case 8: return { text: "DOWN?", cls: "status-pill status-warn" };
        case 9: return { text: "DOWN", cls: "status-pill status-down" };
        case 0: return { text: "PAUSED", cls: "status-pill status-paused" };
        default: return { text: String(s), cls: "status-pill status-paused" };
    }
};
const logTypeBadge = (t) => {
    switch (Number(t)) {
        case 1: return { text: "DOWN", cls: "badge-soft badge-down" };
        case 2: return { text: "UP", cls: "badge-soft badge-up" };
        case 98: return { text: "START", cls: "badge-soft badge-start" };
        case 99: return { text: "PAUSE", cls: "badge-soft badge-pause" };
        default: return { text: String(t), cls: "badge-soft badge-pause" };
    }
};
const parseUptimeRatio = (s = "") => {
    const [d7, d30, d90] = s.split("-").map(Number);
    return { d7, d30, d90 };
};

/* ---------- card ---------- */
function MonitorCard({ monitor }) {
    const st = statusClass(monitor.status);
    const { d7, d30, d90 } = parseUptimeRatio(monitor.custom_uptime_ratio || "");
    const avgMs = Math.round(Number(monitor.average_response_time || 0));

    const chartData = useMemo(() => {
        const arr = (monitor.response_times || []).slice().sort((a, b) => a.datetime - b.datetime);
        const trimmed = arr.slice(-60);
        return trimmed.map(rt => ({ t: rt.datetime, time: toKSTShort(rt.datetime), ms: rt.value }));
    }, [monitor.response_times]);

    const logs = (monitor.logs || []).slice(0, 10);

    return (
        <div className="uptime-card p-3">
            {/* header */}
            <div className="uptime-header mb-3">
                <div>
                    <div className="uptime-title">{monitor.friendly_name}</div>
                    <a href={monitor.url} target="_blank" rel="noreferrer" className="uptime-url">
                        {monitor.url}
                    </a>
                </div>
                <span className={st.cls}><span className="status-dot" />{st.text}</span>
            </div>

            {/* KPI row */}
            <div className="kpi-row">
                <div className="kpi">
                    <div className="label">평균 응답</div>
                    <div className="value">{isNaN(avgMs) ? "-" : `${avgMs} ms`}</div>
                </div>
                <div className="kpi">
                    <div className="label">업타임</div>
                    <div className="d-flex gap-2">
                        <span className="chip"><span className="dot dot-7" />7d {isFinite(d7) ? `${d7.toFixed(2)}%` : "-"}</span>
                        <span className="chip"><span className="dot dot-30" />30d {isFinite(d30) ? `${d30.toFixed(2)}%` : "-"}</span>
                        <span className="chip"><span className="dot dot-90" />90d {isFinite(d90) ? `${d90.toFixed(2)}%` : "-"}</span>
                    </div>
                </div>
                <div className="kpi">
                    <div className="label">체크 주기</div>
                    <div className="value">{monitor.interval ? `${monitor.interval}s` : "-"}</div>
                </div>
            </div>

            {/* chart */}
            <div className="chart-wrap">
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" minTickGap={30} tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} width={60} allowDecimals={false}
                            label={{ value: "ms", angle: -90, position: "insideLeft", offset: 10 }} />
                        <Tooltip
                            formatter={(value) => [`${value} ms`, "응답시간"]}
                            labelFormatter={(label, payload) =>
                                payload?.[0]?.payload?.t ? toKST(payload[0].payload.t) : label
                            }
                        />
                        <Line type="monotone" dataKey="ms" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* logs */}
            <div className="text-muted small mb-1">최근 로그</div>
            <div className="table-responsive">
                <table className="table table-sm align-middle table-logs">
                    <thead>
                        <tr>
                            <th>시간(KST)</th>
                            <th>타입</th>
                            <th>상세</th>
                            <th className="text-end">지속(초)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(l => {
                            const lt = logTypeBadge(l.type);
                            const reason = `${l.reason?.code || ""} ${l.reason?.detail || ""}`.trim();
                            return (
                                <tr key={l.id}>
                                    <td className="text-nowrap">{toKST(l.datetime)}</td>
                                    <td><span className={lt.cls}>{lt.text}</span></td>
                                    <td>{reason || "-"}</td>
                                    <td className="text-end">{Number(l.duration || 0)}</td>
                                </tr>
                            );
                        })}
                        {!logs.length && <tr><td colSpan="4" className="text-muted">로그 없음</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
