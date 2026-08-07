import { RevealOnView } from "@/components/reveal";

type GlobalPresenceProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  locale: "zh" | "en";
};

/* ------------------------------------------------------------------ */
/* 地球坐标 → SVG 投影（orthographic 简版）                              */
/* 视点中心：约 100°E / 30°N，让中国区域处于画面偏右上、视觉醒目位置        */
/* ------------------------------------------------------------------ */
const VIEW_CENTER_LNG = 100;
const VIEW_CENTER_LAT = 30;
const GLOBE_RADIUS = 170;

function project(lng: number, lat: number): { x: number; y: number } {
  const dx = ((lng - VIEW_CENTER_LNG) * Math.PI) / 180;
  const cosLat = Math.cos((lat * Math.PI) / 180);
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const cosCenter = Math.cos((VIEW_CENTER_LAT * Math.PI) / 180);

  // 球面到平面的正交投影：跳过背面点
  const inner = cosLat * Math.sin(dx);
  if (inner < -1 || inner > 1) {
    // 经度方向超出可视半球
    const cosC = cosLat * Math.cos(dx) * cosCenter + sinLat * Math.sin((VIEW_CENTER_LAT * Math.PI) / 180);
    if (cosC < 0) return { x: -9999, y: -9999 }; // 背面
  }
  const x = 200 + GLOBE_RADIUS * cosLat * Math.sin(dx);
  const y = 200 - GLOBE_RADIUS * (sinLat * cosCenter - cosLat * Math.cos(dx) * Math.sin((VIEW_CENTER_LAT * Math.PI) / 180));
  return { x, y };
}

/* 主要城市/区域点位（用作"全球网络"暗示） */
const NETWORK_POINTS: Array<{ lng: number; lat: number; size: number }> = [
  // 中国（突出）
  { lng: 116.4, lat: 39.9, size: 1 }, // 北京
  { lng: 121.5, lat: 31.2, size: 1 }, // 上海
  { lng: 113.3, lat: 23.1, size: 1 }, // 广州
  { lng: 104.1, lat: 30.7, size: 1 }, // 成都
  { lng: 87.6, lat: 43.8, size: 1 }, // 乌鲁木齐
  // 亚洲周边
  { lng: 139.7, lat: 35.7, size: 1 }, // 东京
  { lng: 126.9, lat: 37.6, size: 1 }, // 首尔
  { lng: 100.5, lat: 13.7, size: 1 }, // 曼谷
  { lng: 103.8, lat: 1.4, size: 1 }, // 新加坡
  { lng: 106.7, lat: 10.8, size: 1 }, // 胡志明
  { lng: 72.9, lat: 19.1, size: 1 }, // 孟买
  { lng: 55.3, lat: 25.3, size: 1 }, // 迪拜
  { lng: 51.4, lat: 35.7, size: 1 }, // 德黑兰
  // 大洋洲
  { lng: 151.2, lat: -33.9, size: 1 }, // 悉尼
  { lng: 144.9, lat: -37.8, size: 1 }, // 墨尔本
  // 欧洲
  { lng: 12.5, lat: 41.9, size: 1 }, // 罗马
  { lng: 2.3, lat: 48.9, size: 1 }, // 巴黎
  { lng: 4.9, lat: 52.4, size: 1 }, // 阿姆斯特丹
  { lng: -0.1, lat: 51.5, size: 1 }, // 伦敦
  { lng: 13.4, lat: 52.5, size: 1 }, // 柏林
  { lng: 30.5, lat: 50.4, size: 1 }, // 基辅
  // 非洲
  { lng: 31.2, lat: 30.0, size: 1 }, // 开罗
  { lng: 3.4, lat: 6.5, size: 1 }, // 拉各斯
  { lng: 18.4, lat: -33.9, size: 1 }, // 开普敦
];

/* 中国定位主标记点 */
const CHINA_MARKER = { lng: 110, lat: 34, x: 0, y: 0 };
CHINA_MARKER.x = project(CHINA_MARKER.lng, CHINA_MARKER.lat).x;
CHINA_MARKER.y = project(CHINA_MARKER.lng, CHINA_MARKER.lat).y;

export function GlobalPresence(props: GlobalPresenceProps) {
  return (
    <section
      id="global-presence"
      className="bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          {/* 文本区 */}
          <RevealOnView variant="fade-up" as="div" className="anim-stagger">
            <p className="text-xs font-semibold tracking-[0.34em] text-sky-300">
              {props.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
              {props.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {props.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2">
              {props.stats.map((s) => (
                <div
                  key={`${s.label}-${s.value}`}
                  className="card-hover border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-2xl font-semibold text-white">{s.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnView>

          {/* 地球动画 */}
          <RevealOnView
            variant="fade-in"
            as="div"
            className="relative mx-auto w-full max-w-md"
          >
            <Globe />
          </RevealOnView>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Globe 子组件：纯 SVG，零运行时依赖                                    */
/* ------------------------------------------------------------------ */
function Globe() {
  // 预计算纬度线
  const latitudeLines = [-60, -30, 0, 30, 60].map((lat) => {
    const r = GLOBE_RADIUS * Math.cos((lat * Math.PI) / 180);
    const cy = 200 - GLOBE_RADIUS * Math.sin((lat * Math.PI) / 180);
    return { lat, r, cy };
  });

  // 预计算经度线
  const longitudeLines = [-60, -30, 0, 30, 60].map((lng) => {
    const r = GLOBE_RADIUS * Math.cos((lng * Math.PI) / 180);
    return { lng, r };
  });

  return (
    <div className="globe-wrap relative aspect-square w-full">
      {/* 外圈柔光 */}
      <div className="globe-halo absolute inset-0 rounded-full bg-sky-500/10 blur-3xl" aria-hidden />

      <svg
        viewBox="0 0 400 400"
        className="globe-svg relative h-full w-full select-none"
        aria-label="Global presence map centered on China"
        role="img"
      >
        <defs>
          {/* 球体填充：左上偏亮，营造光感 */}
          <radialGradient id="globe-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
            <stop offset="55%" stopColor="rgba(15,23,42,0.85)" />
            <stop offset="100%" stopColor="rgba(2,6,23,1)" />
          </radialGradient>
          {/* 中国标记柔光 */}
          <radialGradient id="marker-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.55)" />
            <stop offset="60%" stopColor="rgba(56,189,248,0.15)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
          {/* 标记中心高光 */}
          <radialGradient id="marker-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="50%" stopColor="rgba(125,211,252,1)" />
            <stop offset="100%" stopColor="rgba(56,189,248,1)" />
          </radialGradient>
        </defs>

        {/* 球体底盘 */}
        <circle
          cx="200"
          cy="200"
          r={GLOBE_RADIUS}
          fill="url(#globe-fill)"
          stroke="rgba(56,189,248,0.35)"
          strokeWidth="1"
        />

        {/* 纬度线（横向椭圆） */}
        <g aria-hidden>
          {latitudeLines.map((l) => (
            <ellipse
              key={`lat-${l.lat}`}
              cx="200"
              cy={l.cy}
              rx={l.r}
              ry={Math.max(2, l.r * 0.04)}
              fill="none"
              stroke="rgba(125,211,252,0.22)"
              strokeWidth="0.6"
            />
          ))}
        </g>

        {/* 经度线（纵向椭圆） */}
        <g aria-hidden>
          {longitudeLines.map((l) => (
            <ellipse
              key={`lng-${l.lng}`}
              cx="200"
              cy="200"
              rx={l.r}
              ry={GLOBE_RADIUS}
              fill="none"
              stroke="rgba(125,211,252,0.22)"
              strokeWidth="0.6"
            />
          ))}
        </g>

        {/* 球面高光弧 */}
        <ellipse
          cx="160"
          cy="120"
          rx="100"
          ry="40"
          fill="rgba(125,211,252,0.05)"
          aria-hidden
        />

        {/* 网络点位：极弱底色，仅作"全球分布"暗示 */}
        <g className="network-points" aria-hidden>
          {NETWORK_POINTS.map((p, i) => {
            const { x, y } = project(p.lng, p.lat);
            if (x < 0 || x > 400 || y < 0 || y > 400) return null;
            // 简单视域裁剪：在球内
            const dx = x - 200;
            const dy = y - 200;
            if (dx * dx + dy * dy > GLOBE_RADIUS * GLOBE_RADIUS) return null;
            return (
              <circle
                key={`net-${i}`}
                cx={x}
                cy={y}
                r={1.4}
                fill="rgba(148,163,184,0.7)"
                className="net-dot"
                style={{ animationDelay: `${(i % 8) * 0.2}s` }}
              />
            );
          })}
        </g>

        {/* 中国主标记层 */}
        <g
          className="china-marker"
          style={{
            transformOrigin: `${CHINA_MARKER.x}px ${CHINA_MARKER.y}px`,
            transformBox: "fill-box",
          }}
        >
          {/* 柔光晕（持续呼吸） */}
          <circle
            cx={CHINA_MARKER.x}
            cy={CHINA_MARKER.y}
            r="46"
            fill="url(#marker-halo)"
            className="marker-halo"
          />

          {/* 脉冲扩散环（3 圈错开） */}
          <g
            style={{
              transformOrigin: `${CHINA_MARKER.x}px ${CHINA_MARKER.y}px`,
            }}
          >
            <circle
              cx={CHINA_MARKER.x}
              cy={CHINA_MARKER.y}
              r="6"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              className="pulse-ring pulse-ring-1"
            />
            <circle
              cx={CHINA_MARKER.x}
              cy={CHINA_MARKER.y}
              r="6"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              className="pulse-ring pulse-ring-2"
            />
            <circle
              cx={CHINA_MARKER.x}
              cy={CHINA_MARKER.y}
              r="6"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.5"
              className="pulse-ring pulse-ring-3"
            />
          </g>

          {/* 中心实心点 */}
          <circle
            cx={CHINA_MARKER.x}
            cy={CHINA_MARKER.y}
            r="6.5"
            fill="url(#marker-core)"
            className="marker-core"
          />
          <circle
            cx={CHINA_MARKER.x}
            cy={CHINA_MARKER.y}
            r="2.5"
            fill="#0F3460"
          />

          {/* 引线 + 标签 */}
          <line
            x1={CHINA_MARKER.x}
            y1={CHINA_MARKER.y}
            x2={CHINA_MARKER.x + 30}
            y2={CHINA_MARKER.y - 32}
            stroke="rgba(125,211,252,0.55)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <g
            transform={`translate(${CHINA_MARKER.x + 32}, ${CHINA_MARKER.y - 56})`}
            className="marker-label"
          >
            <text
              fill="#f8fafc"
              fontSize="13"
              fontWeight="700"
              letterSpacing="0.18em"
            >
              CHINA
            </text>
            <text
              y="16"
              fill="rgba(186,230,253,0.75)"
              fontSize="9"
              letterSpacing="0.22em"
            >
              HEADQUARTERS · 100°E
            </text>
          </g>
        </g>

        {/* 顶部扫描光带（缓慢横扫，强化"实时定位"感） */}
        <g className="scan-arc" aria-hidden>
          <path
            d="M 30 200 A 170 170 0 0 1 370 200"
            fill="none"
            stroke="url(#globe-fill)"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
}
