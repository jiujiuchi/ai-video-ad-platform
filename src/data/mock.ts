export interface MotionStyle {
  id: string;
  name: string;
  description: string;
  intensity: "light" | "medium" | "strong";
  bestFor: string;
  icon: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  recommendedIntensity: "light" | "medium" | "strong";
}

export interface Template {
  id: string;
  name: string;
  industry: string;
  scene: string;
  motionStyle: string;
  ctrLift: number;
  previewLabel: string;
}

export interface QualityScores {
  contentAccuracy: number;
  motionSmoothness: number;
  colorConsistency: number;
  overall: number;
  status: "ready" | "needs_review" | "failed";
}

export interface HistoryItem {
  id: string;
  thumbnail: string;
  scene: string;
  score: number;
  status: "ready" | "generating" | "failed";
  createdAt: string;
}

export interface ChartDataPoint {
  week: string;
  generations: number;
}

export interface SceneCTRData {
  scene: string;
  aiVideoCTR: number;
  traditionalVideoCTR: number;
}

// --- Motion Styles ---
export const motionStyles: MotionStyle[] = [
  {
    id: "slow-zoom",
    name: "镜头缓推",
    description: "镜头缓慢向前推进，营造电影感",
    intensity: "light",
    bestFor: "头图、Banner",
    icon: "ZoomIn",
  },
  {
    id: "parallax",
    name: "背景视差",
    description: "主体与背景分层运动，增强空间感",
    intensity: "medium",
    bestFor: "开屏、头图",
    icon: "Layers",
  },
  {
    id: "float",
    name: "元素浮动",
    description: "画面元素轻微上下浮动，活泼自然",
    intensity: "light",
    bestFor: "Banner、商品展示",
    icon: "Waves",
  },
  {
    id: "light-flow",
    name: "光影流转",
    description: "光影在产品表面流动，突出质感",
    intensity: "medium",
    bestFor: "3C、美妆、珠宝",
    icon: "Sparkles",
  },
  {
    id: "drift",
    name: "画面漂移",
    description: "整体画面轻微平移，配合景深虚化",
    intensity: "strong",
    bestFor: "开屏广告",
    icon: "Move",
  },
  {
    id: "assemble",
    name: "元素汇聚",
    description: "分散元素从四周汇聚到画面中心",
    intensity: "strong",
    bestFor: "新品首发、促销",
    icon: "Combine",
  },
];

// --- Scenes ---
export const scenes: Scene[] = [
  {
    id: "splash",
    name: "开屏广告",
    description: "全屏沉浸式，用户打开App首屏展示",
    recommendedIntensity: "strong",
  },
  {
    id: "header",
    name: "头图/Banner",
    description: "页面顶部横幅，快速吸引注意力",
    recommendedIntensity: "medium",
  },
  {
    id: "feed",
    name: "信息流",
    description: "混入内容流的原生广告形态",
    recommendedIntensity: "light",
  },
];

// --- Templates ---
export const templates: Template[] = [
  {
    id: "t1",
    name: "白底商品展示",
    industry: "电商零售",
    scene: "信息流",
    motionStyle: "slow-zoom",
    ctrLift: 18,
    previewLabel: "简约白底 + 镜头缓推",
  },
  {
    id: "t2",
    name: "氛围感美妆",
    industry: "美妆护肤",
    scene: "开屏广告",
    motionStyle: "light-flow",
    ctrLift: 27,
    previewLabel: "光影流转 + 特写镜头",
  },
  {
    id: "t3",
    name: "数码产品特写",
    industry: "3C数码",
    scene: "头图/Banner",
    motionStyle: "float",
    ctrLift: 15,
    previewLabel: "暗色背景 + 元素浮动",
  },
  {
    id: "t4",
    name: "食品摆盘俯拍",
    industry: "餐饮外卖",
    scene: "信息流",
    motionStyle: "parallax",
    ctrLift: 22,
    previewLabel: "俯拍视角 + 背景视差",
  },
  {
    id: "t5",
    name: "大促倒计时",
    industry: "通用",
    scene: "开屏广告",
    motionStyle: "assemble",
    ctrLift: 35,
    previewLabel: "动态汇聚 + 紧迫感",
  },
  {
    id: "t6",
    name: "服饰模特展示",
    industry: "服装鞋帽",
    scene: "头图/Banner",
    motionStyle: "drift",
    ctrLift: 20,
    previewLabel: "模特走秀 + 画面漂移",
  },
];

// --- Quality Score (mock) ---
export const mockQualityScores: QualityScores = {
  contentAccuracy: 92,
  motionSmoothness: 88,
  colorConsistency: 95,
  overall: 91,
  status: "ready",
};

// --- History ---
export const mockHistory: HistoryItem[] = [
  {
    id: "h1",
    thumbnail: "/placeholder.svg",
    scene: "开屏广告",
    score: 91,
    status: "ready",
    createdAt: "2026-06-15 14:30",
  },
  {
    id: "h2",
    thumbnail: "/placeholder.svg",
    scene: "头图/Banner",
    score: 87,
    status: "ready",
    createdAt: "2026-06-15 11:20",
  },
  {
    id: "h3",
    thumbnail: "/placeholder.svg",
    scene: "信息流",
    score: 0,
    status: "generating",
    createdAt: "2026-06-15 10:05",
  },
  {
    id: "h4",
    thumbnail: "/placeholder.svg",
    scene: "头图/Banner",
    score: 94,
    status: "ready",
    createdAt: "2026-06-14 16:45",
  },
  {
    id: "h5",
    thumbnail: "/placeholder.svg",
    scene: "开屏广告",
    score: 78,
    status: "failed",
    createdAt: "2026-06-14 09:15",
  },
  {
    id: "h6",
    thumbnail: "/placeholder.svg",
    scene: "信息流",
    score: 90,
    status: "ready",
    createdAt: "2026-06-13 20:00",
  },
];

// --- Chart Data ---
export const weeklyTrend: ChartDataPoint[] = [
  { week: "W17", generations: 42 },
  { week: "W18", generations: 58 },
  { week: "W19", generations: 71 },
  { week: "W20", generations: 69 },
  { week: "W21", generations: 95 },
  { week: "W22", generations: 120 },
  { week: "W23", generations: 148 },
  { week: "W24", generations: 176 },
];

export const sceneCTRData: SceneCTRData[] = [
  { scene: "开屏", aiVideoCTR: 4.2, traditionalVideoCTR: 3.2 },
  { scene: "头图", aiVideoCTR: 2.8, traditionalVideoCTR: 2.4 },
  { scene: "Banner", aiVideoCTR: 1.9, traditionalVideoCTR: 1.6 },
  { scene: "信息流", aiVideoCTR: 3.1, traditionalVideoCTR: 2.5 },
];

// --- Landing page stats ---
export const landingStats = [
  { label: "CTR 提升", value: "5–30%", suffix: "vs 传统视频" },
  { label: "制作成本降低", value: "80%", suffix: "单条广告" },
  { label: "制作周期缩短", value: "3–5天→0.5天", suffix: "从上传到投放" },
];

// --- Generation phases ---
export const generationPhases = [
  {
    label: "分析主体特征",
    detail: "正在使用视觉模型识别商品主体与背景区域",
    icon: "Scan",
  },
  {
    label: "构建运动路径",
    detail: "为你匹配最佳镜头运动轨迹",
    icon: "Route",
  },
  {
    label: "渲染视频帧",
    detail: "逐帧生成视频画面，当前进度 67%",
    icon: "Film",
  },
  {
    label: "质检评分",
    detail: "正在评估内容准确性与动作连贯性",
    icon: "CheckCircle",
  },
];
