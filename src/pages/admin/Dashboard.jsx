// src/pages/admin/Dashboard.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Row, Col, Card, Button, Table, Spinner } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    BarElement, LineElement, PointElement,
    Tooltip, Legend, Filler
} from "chart.js";
import UptimeRobotDashboard from "./UptimeRobotDashboard";
import { fetchSignupRange, fetchStatsKpis, fetchDauRange, fetchRecentLogins, fetchUptimeRobot } from "../../api/statsApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler);

// UI bits
const Metric = ({ title, value, hint, loading }) => (
    <Card className="h-100" style={{ borderRadius: 12 }}>
        <Card.Body style={{ padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, minHeight: 52 }}>
                {loading ? <Spinner size="sm" /> : <div style={{ fontSize: 28, fontWeight: 800 }}>{value}</div>}
            </div>
            {hint && <div style={{ fontSize: 11, color: "#666" }}>{hint}</div>}
        </Card.Body>
    </Card>
);

const Section = ({ title, right, children }) => (
    <Card style={{ borderRadius: 12 }}>
        <Card.Header style={{ padding: "10px 12px", background: "transparent", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{title}</strong>
                {right}
            </div>
        </Card.Header>
        <Card.Body style={{ padding: 12 }}>{children}</Card.Body>
    </Card>
);

const Dashboard = () => {
    const __DEV__ = import.meta.env.DEV;
    // states
    const [kpis, setKpis] = useState(null);                  // {todayDau, mau30d, todaySignups, activeUsers}
    const [signupsRange, setSignupsRange] = useState(null);  // [{day, count}]
    const [dauRange, setDauRange] = useState(null);          // [{day, count}]
    const [recentUsers, setRecentUsers] = useState(null);    // [{id, email, nickname, lastLoginAt}]
    const [uptimeRobotJson, setUptimeRobotJson] = useState();// UptimeRobot 원본 JSON

    const loading = !kpis || !signupsRange || !dauRange || !recentUsers;

    const loadAll = useCallback(async () => {
        const end = new Date();
        const start = new Date(end); start.setDate(end.getDate() - 6); // 최근 7일
        const toISO = (d) => d.toISOString().slice(0, 10);

        try {
            const t0 = performance.now();
            const [kpisRes, suRes, dauRes, recentRes] = await Promise.all([
                fetchStatsKpis(true),
                fetchSignupRange({ startDate: toISO(start), endDate: toISO(end) }),
                fetchDauRange({ startDate: toISO(start), endDate: toISO(end), excludeInternal: true }),
                fetchRecentLogins({ sinceHours: 24, limit: 20 }),
            ]);

            if (__DEV__) {
                console.groupCollapsed(
                    "[Dashboard] loadAll",
                    { start: toISO(start), end: toISO(end) }
                );
                console.log("kpis (status,url):", kpisRes.status, kpisRes.config?.url);
                console.dir(kpisRes.data);

                console.log("signupsRange (status,url):", suRes.status, suRes.config?.url);
                // 배열은 table로 보기 좋게
                console.table((suRes.data ?? []).map(x => ({ day: x.day, count: x.count })));

                console.log("dauRange (status,url):", dauRes.status, dauRes.config?.url);
                console.table((dauRes.data ?? []).map(x => ({ day: x.day, count: x.count })));

                console.log("recentUsers (status,url):", recentRes.status, recentRes.config?.url);
                console.table((recentRes.data ?? []).map(x => ({
                    id: x.id, email: x.email, nickname: x.nickname, lastLoginAt: x.lastLoginAt
                })));

                console.log("duration(ms):", (performance.now() - t0).toFixed(1));
                console.groupEnd();
            }

            setKpis(kpisRes.data);
            setSignupsRange(suRes.data);
            setDauRange(dauRes.data);
            setRecentUsers(recentRes.data);
        } catch (err) {
            console.error("[Dashboard] loadAll failed:", err);
        }
    }, []);

    const loadUptimeRobot = useCallback(async () => {
        const res = await fetchUptimeRobot(); // 기본 logs/responseTimes=true (컨트롤러 default)
        setUptimeRobotJson(res.data);
    }, []);

    useEffect(() => {
        loadAll();
        loadUptimeRobot();
    }, [loadAll, loadUptimeRobot]);

    // charts
    const signupData = useMemo(() => {
        if (!signupsRange) return null;
        const labels = signupsRange.map(d => new Date(d.day).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" }));
        const values = signupsRange.map(d => d.count);
        return {
            labels,
            datasets: [{
                label: "가입",
                data: values,
                borderColor: "#ff8a00",
                backgroundColor: "rgba(255,138,0,.15)",
                tension: 0.35, fill: true, pointRadius: 0,
            }],
        };
    }, [signupsRange]);

    const dauData = useMemo(() => {
        if (!dauRange) return null;
        const labels = dauRange.map(d => new Date(d.day).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" }));
        const values = dauRange.map(d => d.count);
        return {
            labels,
            datasets: [{
                label: "DAU",
                data: values,
                backgroundColor: "#4f46e5",
                borderRadius: 6,
                barThickness: 14,
            }],
        };
    }, [dauRange]);

    const commonOpts = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { intersect: false, mode: "index" } },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: "rgba(0,0,0,.06)" }, ticks: { font: { size: 11 } }, beginAtZero: true },
        },
    };

    return (
        <main style={{ padding: "12px 12px 20px", maxWidth: 1440, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h6 style={{ margin: 0, fontWeight: 800 }}>관리자 대시보드</h6>
                <div className="d-flex gap-2">
                    <Button size="sm" variant="outline-secondary" onClick={loadUptimeRobot}>Uptime 새로고침</Button>
                    <Button size="sm" variant="primary" onClick={loadAll} disabled={loading && !kpis}>데이터 새로고침</Button>
                </div>
            </div>

            {/* KPI */}
            <Row className="g-2">
                <Col xs={6} sm={6} md={3}>
                    <Metric title="활성 회원(총)" value={kpis?.activeUsers ?? "-"} loading={!kpis} />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <Metric title="오늘 가입" value={kpis?.todaySignups ?? "-"} loading={!kpis} />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <Metric title="오늘 DAU" value={kpis?.todayDau ?? "-"} hint="내부 트래픽 제외" loading={!kpis} />
                </Col>
                <Col xs={6} sm={6} md={3}>
                    <Metric title="MAU(최근 30일)" value={kpis?.mau30d ?? "-"} loading={!kpis} />
                </Col>
            </Row>

            {/* Charts */}
            <Row className="g-2" style={{ marginTop: 8 }}>
                <Col md={6}>
                    <Section title="최근 7일 가입 추이">
                        <div style={{ height: 260 }}>
                            {!signupData
                                ? <div className="d-flex align-items-center justify-content-center h-100"><Spinner size="sm" /></div>
                                : <Line data={signupData} options={commonOpts} />
                            }
                        </div>
                    </Section>
                </Col>
                <Col md={6}>
                    <Section title="최근 7일 DAU">
                        <div style={{ height: 260 }}>
                            {!dauData
                                ? <div className="d-flex align-items-center justify-content-center h-100"><Spinner size="sm" /></div>
                                : <Bar data={dauData} options={commonOpts} />
                            }
                        </div>
                    </Section>
                </Col>
            </Row>

            {/* Recent users */}
            <Row className="g-2" style={{ marginTop: 8 }}>
                <Col md={12}>
                    <Section title="최근 로그인 사용자 (24h)">
                        {!recentUsers
                            ? <div className="d-flex align-items-center justify-content-center" style={{ height: 140 }}><Spinner size="sm" /></div>
                            : (
                                <div className="table-responsive">
                                    <Table hover size="sm" className="mb-0 align-middle">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>이름</th>
                                                <th className="text-end">마지막 로그인</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentUsers.map((u, idx) => (
                                                <tr key={`${u.id}-${u.lastLoginAt ?? idx}`}>
                                                    <td>{u.id}</td>
                                                    <td>{u.username}</td>
                                                    <td className="text-end">
                                                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("ko-KR") : "-"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )
                        }
                    </Section>
                </Col>
            </Row>

            {/* UptimeRobot */}
            <Row className="g-2" style={{ marginTop: 8 }}>
                <Col>
                    <Section title="시스템 상태 (UptimeRobot)">
                        <UptimeRobotDashboard data={uptimeRobotJson} />
                    </Section>
                </Col>
            </Row>
        </main>
    );
};

export default Dashboard;
