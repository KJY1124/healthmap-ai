import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Home,
  ListChecks,
  Lock,
  MapPin,
  MapPinned,
  Menu,
  Navigation,
  Phone,
  Ruler,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  User,
} from "lucide-react";

/**
 * 헬스맵 AI 최종 프로토타입
 * - 밝은 화이트/블루 기반 UI
 * - 시작 화면 → 홈 → 1차 탐색 → 추천 조건 → 최종 추천 → 상세 정보 → MY
 * - Vite + React + TailwindCSS 기준으로 바로 실행 가능
 */

const gyms = [
  { id: 1, name: "성수역점 스포애니", type: "헬스장/피트니스", phone: "02-499-9679", area: "성수동2가", address: "서울 성동구 성수이로20길 3", lat: 37.543714, lng: 127.057197, areaSize: "763.8㎡", licenseDate: "2020-04-06" },
  { id: 2, name: "짐박스 피트니스 왕십리점", type: "헬스장/피트니스", phone: "02-2296-4746", area: "행당동", address: "서울 성동구 고산자로 203", lat: 37.557423, lng: 127.034454, areaSize: "589.0㎡", licenseDate: "2025-04-30" },
  { id: 3, name: "투에이치짐", type: "헬스장/피트니스", phone: "02-2295-0119", area: "행당동", address: "서울 성동구 마조로 30", lat: 37.560313, lng: 127.041511, areaSize: "285.0㎡", licenseDate: "2023-02-07" },
  { id: 4, name: "해빗피트니스 옥수점", type: "헬스장/피트니스", phone: "02-2295-0408", area: "옥수동", address: "서울 성동구 매봉길 48", lat: 37.546698, lng: 127.014079, areaSize: "300.3㎡", licenseDate: "2019-10-11" },
  { id: 5, name: "오넥스짐 답십리점", type: "헬스장/피트니스", phone: "02-6456-6808", area: "용답동", address: "서울 성동구 천호대로 320", lat: 37.563665, lng: 127.055316, areaSize: "498.0㎡", licenseDate: "2023-04-18" },
  { id: 6, name: "머슬 휘트니스", type: "헬스장/피트니스", phone: "02-6053-9682", area: "성수동1가", address: "서울 성동구 상원길 26", lat: 37.546806, lng: 127.050444, areaSize: "845.6㎡", licenseDate: "2025-06-02" },
  { id: 7, name: "피지컬100GYM", type: "헬스장/피트니스", phone: "02-6952-0175", area: "상왕십리동", address: "서울 성동구 마장로 137", lat: 37.568064, lng: 127.025952, areaSize: "186.7㎡", licenseDate: "2024-06-24" },
  { id: 8, name: "런앤런 한양대점", type: "헬스장/피트니스", phone: "02-2295-7740", area: "행당동", address: "서울 성동구 왕십리로 223", lat: 37.558916, lng: 127.036938, areaSize: "242.4㎡", licenseDate: "2023-06-26" },
  { id: 9, name: "파크짐 헬스&PT 왕십리역점", type: "PT/퍼스널", phone: "02-2291-8891", area: "도선동", address: "서울 성동구 고산자로 255", lat: 37.562619, lng: 127.035727, areaSize: "263.7㎡", licenseDate: "2025-07-28" },
  { id: 10, name: "피티사관학교 왕십리점", type: "PT/퍼스널", phone: "02-2292-2223", area: "행당동", address: "서울 성동구 왕십리로 315", lat: 37.562262, lng: 127.034608, areaSize: "257.0㎡", licenseDate: "2023-10-12" },
  { id: 11, name: "더바른몸PT", type: "PT/퍼스널", phone: "02-2299-7890", area: "도선동", address: "서울 성동구 왕십리로 320", lat: 37.562344, lng: 127.03437, areaSize: "정보 없음", licenseDate: "2020-03-24" },
  { id: 12, name: "율 메디컬 트레이닝 센터", type: "PT/퍼스널", phone: "070-8158-0726", area: "옥수동", address: "서울 성동구 독서당로 212", lat: 37.543409, lng: 127.014392, areaSize: "230.2㎡", licenseDate: "2019-11-06" },
  { id: 13, name: "온무브 필라테스", type: "필라테스/요가", phone: "02-2297-0706", area: "도선동", address: "서울 성동구 고산자로 269", lat: 37.563172, lng: 127.035406, areaSize: "70.3㎡", licenseDate: "2023-03-22" },
  { id: 14, name: "크로스핏 핏불", type: "크로스핏/기능성", phone: "정보 없음", area: "성수동1가", address: "서울 성동구 상원6길 14", lat: 37.547047, lng: 127.047235, areaSize: "정보 없음", licenseDate: "정보 없음" },
].map((gym) => ({
  ...gym,
  status: "영업/정상",
  detailStatus: "영업중",
  source: "성동구 인허가 데이터",
}));

const outdoorParks = [
  { id: "p1", name: "응봉공원", area: "응봉동", lat: 37.5509, lng: 127.0296, equipmentCount: 201, installPlaces: 25 },
  { id: "p2", name: "달맞이공원", area: "금호동", lat: 37.5497, lng: 127.0208, equipmentCount: 35, installPlaces: 6 },
  { id: "p3", name: "무학봉공원", area: "하왕십리동", lat: 37.5648, lng: 127.0288, equipmentCount: 29, installPlaces: 3 },
  { id: "p4", name: "용답휴식공원", area: "용답동", lat: 37.5639, lng: 127.0546, equipmentCount: 14, installPlaces: 1 },
  { id: "p5", name: "동마장공원", area: "마장동", lat: 37.5668, lng: 127.0434, equipmentCount: 8, installPlaces: 1 },
  { id: "p6", name: "도선공원", area: "도선동", lat: 37.563, lng: 127.0349, equipmentCount: 7, installPlaces: 1 },
].map((park) => ({
  ...park,
  type: "실외운동기구",
  status: "공공시설",
  detailStatus: "야외운동",
  phone: "관리부서: 공원녹지과",
  address: `서울 성동구 ${park.area} ${park.name} 일대`,
  areaSize: `${park.equipmentCount}개`,
  licenseDate: "2025-09-17",
  source: "성동구 실외운동기구 데이터",
}));

const purposes = ["다이어트", "근력", "체력", "재활", "자유운동", "시니어운동"];

const presetLocations = [
  { label: "왕십리역", lat: 37.56135, lng: 127.03805, area: "성동구" },
  { label: "한양대역", lat: 37.55598, lng: 127.04356, area: "성동구" },
  { label: "성수역", lat: 37.54458, lng: 127.05596, area: "성동구" },
  { label: "옥수역", lat: 37.54068, lng: 127.01799, area: "성동구" },
  { label: "마장역", lat: 37.5661, lng: 127.04297, area: "성동구" },
  { label: "금호역", lat: 37.54803, lng: 127.01588, area: "성동구" },
];

const purposeProfiles = {
  다이어트: {
    preferredTypes: ["헬스장/피트니스", "PT/퍼스널", "필라테스/요가"],
    reason: "다이어트 목적은 접근성과 유산소·피트니스 적합성을 반영했습니다.",
  },
  근력: {
    preferredTypes: ["헬스장/피트니스", "PT/퍼스널", "크로스핏/기능성"],
    reason: "근력운동 목적은 웨이트·PT 시설 적합성을 우선 반영했습니다.",
  },
  체력: {
    preferredTypes: ["헬스장/피트니스", "크로스핏/기능성", "PT/퍼스널"],
    reason: "체력 관리는 전신 운동과 지속 방문 가능성을 고려했습니다.",
  },
  재활: {
    preferredTypes: ["PT/퍼스널", "필라테스/요가"],
    reason: "재활 목적은 관리형 PT·필라테스 시설을 우선 반영했습니다.",
  },
  자유운동: {
    preferredTypes: ["헬스장/피트니스", "PT/퍼스널", "필라테스/요가", "크로스핏/기능성"],
    reason: "자유운동은 가까운 거리와 일반 운동시설 적합성을 중심으로 추천했습니다.",
  },
  시니어운동: {
    preferredTypes: ["실외운동기구"],
    reason: "시니어 운동은 부담이 적은 공원 실외운동기구와 설치기구 수를 반영했습니다.",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const softCard =
  "bg-[rgba(255,255,255,0.94)] backdrop-blur-[10px] border border-[#E7ECF6] shadow-[0_10px_28px_rgba(30,64,175,0.08)]";

const pageBg =
  "bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.08),transparent_26%),linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_48%,#F2F7FF_100%)]";

const heroBg =
  "bg-[linear-gradient(135deg,#1E3A8A_0%,#2563EB_52%,#6366F1_100%)]";

const noScrollBar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDistance(km) {
  const m = Math.round(km * 1000);
  if (m < 50) return "50m 이내";
  return m < 1000 ? `${m}m` : `${km.toFixed(1)}km`;
}

function openGoogleDirections(item) {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=walking`,
    "_blank",
    "noopener,noreferrer"
  );
}

function callGym(item) {
  if (item.phone && item.phone !== "정보 없음" && !item.phone.includes("관리부서")) {
    window.open(`tel:${item.phone}`);
  }
}

function getDistanceScore(km) {
  if (km <= 0.5) return 50;
  if (km <= 1) return 43;
  if (km <= 2) return 32;
  if (km <= 3) return 22;
  return 12;
}

function getStatusScore(item) {
  return item.detailStatus === "영업중" || item.detailStatus === "야외운동" ? 25 : 0;
}

function getPurposeScore(item, purpose) {
  const profile = purposeProfiles[purpose];
  if (!profile) return 12;
  return Math.min(25, 8 + (profile.preferredTypes.includes(item.type) ? 17 : 0));
}

function withDistance(items, limit, loc, extra = 0) {
  return items
    .map((item) => {
      const distance = haversineKm(loc, item);
      const walk = Math.max(2, Math.round((distance / 4.5) * 60));
      return { ...item, distance, walk };
    })
    .filter((item) => item.distance <= limit + extra);
}

function enrichItems(items, selectedPurposes, selectedTypes) {
  const purpose = selectedPurposes[0] || "";
  const reasonBase =
    purposeProfiles[purpose]?.reason || "거리와 시설 유형을 중심으로 추천했습니다.";

  return items
    .map((item) => {
      const distanceScore = getDistanceScore(item.distance);
      const statusScore = getStatusScore(item);
      const purposeScore = getPurposeScore(item, purpose);
      const typeBonus =
        selectedTypes.includes(item.type) || selectedTypes.length === 0 ? 0 : -8;
      const score = Math.max(
        0,
        Math.min(100, distanceScore + statusScore + purposeScore + typeBonus)
      );

      const reason =
        item.type === "실외운동기구"
          ? `설치기구 ${item.equipmentCount}개가 있는 공원입니다. ${reasonBase}`
          : `영업상태가 '${item.detailStatus}'로 확인된 체력단련장입니다. ${reasonBase}`;

      return { ...item, score, reason };
    })
    .sort((a, b) => b.score - a.score || a.distance - b.distance);
}

function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F3F7FF] flex items-center justify-center p-4 overflow-hidden">
      <div className="w-[430px] h-[900px] rounded-[2.4rem] relative">
        <div className="relative h-full rounded-[2.4rem] bg-white border border-[#E3EAF8] shadow-[0_30px_70px_rgba(30,64,175,.18)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function Header({ title, onBack, right }) {
  return (
    <div className="h-16 px-6 pt-1 flex items-center justify-between bg-[rgba(255,255,255,0.86)] backdrop-blur-[10px] border-b border-[#EEF2FA]">
      <button
        onClick={onBack}
        className="w-10 h-10 flex items-center justify-center text-[#111827]"
      >
        {onBack ? <ChevronLeft size={28} /> : <span />}
      </button>
      <h2 className="font-black text-2xl tracking-[-0.02em] text-[#111827]">
        {title}
      </h2>
      <div className="w-10 flex justify-end text-[#111827]">{right}</div>
    </div>
  );
}

function BottomTabs({ screen, setScreen }) {
  const tabs = [
    { id: "home", label: "홈", icon: Home },
    { id: "nearby", label: "1차탐색", icon: MapPin },
    { id: "results", label: "추천", icon: ListChecks },
    { id: "my", label: "MY", icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[86px] bg-[rgba(255,255,255,0.82)] backdrop-blur-[10px] border-t border-[rgba(255,255,255,0.50)] px-8 pt-3 flex justify-between">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = screen === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              className={active ? "text-[#3147FF]" : "text-[#8A8F9D]"}
            />
            <span
              className={cx(
                "text-xs font-bold",
                active ? "text-[#3147FF]" : "text-[#8A8F9D]"
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AppTop({ setScreen }) {
  return (
    <div className="px-6 pt-6 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#0B1023] flex items-center justify-center shadow-[0_12px_24px_rgba(11,16,35,.15)]">
          <Dumbbell size={22} className="text-[#8EA2FF]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#151A2D]">헬스맵 AI</h1>
          <p className="text-xs text-[#7C8499] font-bold">성동구 운동시설 추천</p>
        </div>
      </div>
      <button
        onClick={() => setScreen("my")}
        className="w-11 h-11 rounded-2xl flex items-center justify-center"
      >
        <Menu size={28} />
      </button>
    </div>
  );
}

function StackPanel({ children }) {
  return (
    <div className="relative px-5 pb-24">
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function HeroRow({ title, subtitle, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "relative w-full min-h-[108px] rounded-[1.7rem] text-white px-5 overflow-hidden flex items-center justify-between shadow-[0_12px_28px_rgba(18,25,56,.18)]",
        heroBg
      )}
    >
      <div className="absolute -right-8 -top-10 w-36 h-36 rounded-full bg-[#5E73FF]/25 blur-2xl" />

      <div className="relative flex items-center gap-4 text-left">
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
          <Icon size={33} className="text-[#C9D2FF]" />
        </div>
        <div>
          <div className="text-2xl font-black leading-tight">{title}</div>
          <div className="mt-1 text-sm text-white/55 font-bold">{subtitle}</div>
          <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-white/10 text-[11px] font-black text-[#C9D2FF]">
            AI 추천 MVP
          </div>
        </div>
      </div>

      <ChevronRight size={33} className="relative" />
    </button>
  );
}

function StackRow({ icon: Icon, title, subtitle, pill, action, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full min-h-[82px] rounded-[1.45rem] px-5 flex items-center justify-between text-left",
        softCard
      )}
    >
      <div className="flex items-center gap-4 min-w-0">
        <Icon size={31} className="text-[#3147FF]" />
        <div className="min-w-0">
          <div className="text-xl font-black truncate text-[#151A2D]">{title}</div>
          <div className="mt-1 text-sm font-bold truncate text-[#7C8499]">
            {subtitle}
          </div>
        </div>
      </div>

      {pill ? (
        <span
          className={cx(
            "shrink-0 px-4 py-2 rounded-2xl border text-sm font-black",
            action
              ? "bg-[#3147FF] text-white border-[#3147FF]"
              : "bg-white text-[#151A2D] border-[#E2E7F0]"
          )}
        >
          {pill}
        </span>
      ) : (
        <ChevronRight size={24} />
      )}
    </button>
  );
}

function Chip({ active, children, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "h-10 px-4 rounded-2xl border text-sm font-black transition",
        active
          ? color === "green"
            ? "bg-[#22C58B] text-white border-[#22C58B]"
            : "bg-[#3147FF] text-white border-[#3147FF]"
          : "bg-[rgba(255,255,255,0.68)] text-[#5F6880] border-[rgba(255,255,255,0.52)]"
      )}
    >
      {children}
    </button>
  );
}

function CTA({ children, onClick, dark = false }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full min-h-[62px] rounded-[1.35rem] font-black text-lg active:scale-[.99] transition",
        dark
          ? "bg-[#0B1023] text-white shadow-[0_12px_28px_rgba(18,25,56,.18)]"
          : "bg-[linear-gradient(135deg,#3147FF_0%,#3B50FF_100%)] text-white shadow-[0_12px_24px_rgba(59,80,255,.22)]"
      )}
    >
      {children}
    </button>
  );
}

function FacilityCard({ item }) {
  const isPark = item.type === "실외운동기구";

  return (
    <div className={cx("rounded-[1.55rem] p-4", softCard)}>
      <div className="flex items-center gap-4">
        <div
          className={cx(
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            isPark
              ? "bg-[linear-gradient(180deg,#ECFBF5_0%,#F4FFFA_100%)]"
              : "bg-[linear-gradient(180deg,#EEF2FF_0%,#F5F7FF_100%)]"
          )}
        >
          <MapPin
            size={30}
            className={isPark ? "text-[#22C58B]" : "text-[#3147FF]"}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-[#151A2D] text-lg truncate">
              {item.name}
            </h3>
            {isPark && (
              <span className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-[#22C58B] text-white font-black">
                시니어
              </span>
            )}
          </div>

          <p>
            <span className="text-[#3147FF] font-black">
              {formatDistance(item.distance)}
            </span>
            <span className="text-[#7C8499] font-bold"> · 도보 {item.walk}분</span>
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-3 py-1 rounded-full bg-[#EEF1FF] text-[#3550FF] text-xs font-black">
              {item.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E7FAF1] text-[#12A76A] text-xs font-black">
              {item.detailStatus}
            </span>
            {isPark ? (
              <span className="px-3 py-1 rounded-full bg-[#FFF1E7] text-[#F3872F] text-xs font-black">
                기구 {item.equipmentCount}개
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#F6F7FB] text-[#687086] text-xs font-black">
                {item.phone}
              </span>
            )}
          </div>
        </div>

        <ChevronRight size={24} />
      </div>
    </div>
  );
}

function StartScreen({ setScreen }) {
  return (
    <div
      className={cx(
        "h-full relative overflow-hidden px-7 py-8 flex flex-col justify-between",
        pageBg
      )}
    >
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#6366F1]/14 blur-3xl" />
      <div className="absolute bottom-20 -left-24 w-72 h-72 rounded-full bg-[#2DD4BF]/12 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 w-56 h-56 rounded-full bg-[#60A5FA]/10 blur-3xl" />

      <div className="relative flex items-center justify-between text-[#111827]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0B1023] flex items-center justify-center shadow-[0_14px_28px_rgba(30,64,175,.16)]">
            <Dumbbell size={24} className="text-[#93C5FD]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">헬스맵 AI</h1>
            <p className="text-xs text-[#6B7280] font-bold">성동구 운동시설 추천</p>
          </div>
        </div>
        <Sparkles size={25} className="text-[#2563EB]" />
      </div>

      <div className="relative text-[#111827]">
        <div className="inline-flex px-4 py-2 rounded-full bg-white/80 border border-[#E5EAF5] text-[#2563EB] text-xs font-black mb-5 shadow-[0_8px_20px_rgba(30,64,175,.06)]">
          위치 기반 운동시설 추천 MVP
        </div>
        <h2 className="text-[2.85rem] leading-[1.08] font-black tracking-tight">
          가까운 운동시설을
          <br />
          AI가 쉽게 찾아줘요
        </h2>
        <p className="mt-5 text-[#667085] text-base font-bold leading-relaxed">
          현재 위치와 운동 목적을 바탕으로 성동구 헬스장과 시니어 야외운동 공원을 한 번에 추천합니다.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-[1.4rem] bg-white/88 p-4 border border-[#E7ECF6] shadow-[0_10px_28px_rgba(30,64,175,.08)]">
            <MapPin size={24} className="text-[#2563EB] mb-3" />
            <div className="font-black">위치 기반</div>
            <div className="mt-1 text-xs text-[#7C8499] font-bold">
              거리·도보 시간 확인
            </div>
          </div>

          <div className="rounded-[1.4rem] bg-white/88 p-4 border border-[#E7ECF6] shadow-[0_10px_28px_rgba(30,64,175,.08)]">
            <Target size={24} className="text-[#22C58B] mb-3" />
            <div className="font-black">목적 맞춤</div>
            <div className="mt-1 text-xs text-[#7C8499] font-bold">
              근력·체력·시니어
            </div>
          </div>
        </div>
      </div>

      <div className="relative space-y-3">
        <button
          onClick={() => setScreen("home")}
          className="w-full min-h-[64px] rounded-[1.45rem] bg-[linear-gradient(135deg,#2563EB_0%,#6366F1_100%)] text-white text-lg font-black shadow-[0_18px_36px_rgba(37,99,235,.24)] active:scale-[.99] transition"
        >
          헬스맵 AI 시작하기
        </button>
        <p className="text-center text-xs text-[#8A94A6] font-bold">
          공공데이터 기반 프로토타입 · 성동구 운동시설 추천
        </p>
      </div>
    </div>
  );
}

function HomeScreen(props) {
  const {
    setScreen,
    distanceLimit,
    setDistanceLimit,
    currentLocation,
    setCurrentLocation,
    activityMode,
    setActivityMode,
    setSelectedPurposes,
    setSelectedTypes,
  } = props;

  const [text, setText] = useState("");

  const applyText = () => {
    const matched = presetLocations.find(
      (loc) =>
        text &&
        (loc.label.includes(text) || text.includes(loc.label.replace("역", "")))
    );
    if (matched) setCurrentLocation(matched);
  };

  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <AppTop setScreen={setScreen} />

      <StackPanel>
        <HeroRow
          title={activityMode === "senior" ? "시니어 야외운동 추천" : "성동구 헬스장 추천"}
          subtitle={
            activityMode === "senior"
              ? "실외운동기구 많은 공원 중심"
              : "영업중 인허가 데이터 기반"
          }
          icon={MapPinned}
          onClick={() => setScreen("nearby")}
        />

        <div className={cx("rounded-[1.45rem] p-4", softCard)}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-lg font-black text-[#151A2D]">운동 유형</div>
              <div className="text-xs text-[#7C8499] font-bold">
                대상에 맞게 추천 데이터가 바뀝니다
              </div>
            </div>
            <Sparkles size={22} className="text-[#3147FF]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Chip
              active={activityMode === "gym"}
              onClick={() => {
                setActivityMode("gym");
                setSelectedPurposes(["근력"]);
                setSelectedTypes([
                  "헬스장/피트니스",
                  "PT/퍼스널",
                  "필라테스/요가",
                  "크로스핏/기능성",
                ]);
              }}
            >
              헬스장 추천
            </Chip>

            <Chip
              active={activityMode === "senior"}
              color="green"
              onClick={() => {
                setActivityMode("senior");
                setSelectedPurposes(["시니어운동"]);
                setSelectedTypes(["실외운동기구"]);
              }}
            >
              시니어 야외운동
            </Chip>
          </div>
        </div>

        <StackRow
          icon={MapPin}
          title="출발 위치"
          subtitle={currentLocation.area}
          pill={currentLocation.label}
        />

        <div className={cx("rounded-[1.45rem] p-4", softCard)}>
          <div className="grid grid-cols-2 gap-2">
            {presetLocations.map((loc) => (
              <Chip
                key={loc.label}
                active={currentLocation.label === loc.label}
                onClick={() => setCurrentLocation(loc)}
              >
                {loc.label}
              </Chip>
            ))}
          </div>

          <div className="mt-3 h-12 rounded-2xl border border-[#E2E7F0] bg-white px-4 flex items-center gap-2">
            <Search size={18} />
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && applyText()}
              className="flex-1 outline-none bg-transparent"
              placeholder="예: 성수역"
            />
            <button onClick={applyText} className="text-[#3147FF] font-black">
              적용
            </button>
          </div>
        </div>

        <StackRow
          icon={SlidersHorizontal}
          title="거리 범위"
          subtitle="직선거리 기반 MVP"
          pill={`${distanceLimit}km`}
        />

        <div className={cx("rounded-[1.45rem] p-5", softCard)}>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={distanceLimit}
            onChange={(event) => setDistanceLimit(Number(event.target.value))}
            className="w-full accent-[#3147FF]"
          />
        </div>

        <StackRow
          icon={Activity}
          title="1차 탐색"
          subtitle="거리 안 시설 먼저 보기"
          onClick={() => setScreen("nearby")}
        />
      </StackPanel>
    </div>
  );
}

function NearbyScreen({ setScreen, items, distanceLimit, currentLocation, activityMode }) {
  const senior = activityMode === "senior";

  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <Header title="1차 탐색 결과" onBack={() => setScreen("home")} />

      <StackPanel>
        <HeroRow
          title={senior ? "시니어 야외운동 공원" : "성동구 영업중 헬스장"}
          subtitle={`${currentLocation.label} · ${distanceLimit}km · ${items.length}개`}
          icon={Search}
          onClick={() => setScreen("preference")}
        />

        {items.length ? (
          items.map((item) => <FacilityCard key={item.id} item={item} />)
        ) : (
          <div
            className={cx(
              "rounded-[1.45rem] p-6 text-center text-[#7C8499] font-bold",
              softCard
            )}
          >
            거리 범위를 넓혀보세요.
          </div>
        )}

        <CTA dark onClick={() => setScreen("preference")}>
          선호 조건 선택하기
        </CTA>
      </StackPanel>
    </div>
  );
}

function PreferenceScreen({
  setScreen,
  selectedPurposes,
  setSelectedPurposes,
  selectedTypes,
  setSelectedTypes,
}) {
  const types = [
    "헬스장/피트니스",
    "PT/퍼스널",
    "필라테스/요가",
    "크로스핏/기능성",
    "실외운동기구",
  ];

  const toggleType = (type) => {
    setSelectedTypes((previous) =>
      previous.includes(type)
        ? previous.filter((item) => item !== type)
        : [...previous, type]
    );
  };

  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <Header title="추천 조건 선택" onBack={() => setScreen("nearby")} />

      <StackPanel>
        <HeroRow
          title="개인 맞춤 조건"
          subtitle="거리 · 상태 · 목적 반영"
          icon={Target}
          onClick={() => setScreen("loading")}
        />

        <div className={cx("rounded-[1.45rem] p-5", softCard)}>
          <h3 className="text-xl font-black text-[#151A2D] mb-3">선호 업종</h3>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Chip
                key={type}
                active={selectedTypes.includes(type)}
                color="green"
                onClick={() => toggleType(type)}
              >
                {type}
              </Chip>
            ))}
          </div>
        </div>

        <div className={cx("rounded-[1.45rem] p-5", softCard)}>
          <h3 className="text-xl font-black text-[#151A2D] mb-3">운동 목적</h3>
          <div className="flex flex-wrap gap-2">
            {purposes.map((purpose) => (
              <Chip
                key={purpose}
                active={selectedPurposes.includes(purpose)}
                onClick={() => setSelectedPurposes([purpose])}
              >
                {purpose}
              </Chip>
            ))}
          </div>
        </div>

        <CTA onClick={() => setScreen("loading")}>최종 추천 결과 보기</CTA>
      </StackPanel>
    </div>
  );
}

function LoadingScreen({ setScreen }) {
  React.useEffect(() => {
    const timer = setTimeout(() => setScreen("results"), 700);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div
      className={cx(
        "h-full flex flex-col items-center justify-center text-center",
        pageBg
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="w-24 h-24 rounded-[2rem] bg-[#0B1023] flex items-center justify-center mb-6"
      >
        <Dumbbell size={42} className="text-[#5E73FF]" />
      </motion.div>

      <h2 className="text-2xl font-black text-[#151A2D]">최종 추천 계산 중</h2>
      <p className="mt-3 text-[#7C8499] font-bold">
        가장 적합한 3곳을 찾고 있어요.
      </p>
    </div>
  );
}

function ResultCard({ item, rank, setSelectedItem, setScreen }) {
  return (
    <div className={cx("rounded-[1.45rem] p-5", softCard)}>
      <h3 className="font-black text-xl truncate text-[#151A2D]">
        {["🥇", "🥈", "🥉"][rank - 1]} {item.name}
      </h3>

      <p className="mt-2">
        <span className="text-[#3147FF] font-black">
          {formatDistance(item.distance)}
        </span>
        <span className="text-[#7C8499] font-bold"> · 도보 {item.walk}분</span>
      </p>

      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full bg-[#EEF1FF] text-[#3550FF] text-xs font-black">
          {item.type}
        </span>
        <span className="px-3 py-1 rounded-full bg-[#FFF1E7] text-[#F3872F] text-xs font-black">
          {item.score}점
        </span>
      </div>

      <div className="mt-4 bg-[linear-gradient(180deg,rgba(238,241,255,0.95)_0%,rgba(245,248,255,0.92)_100%)] rounded-2xl p-3 text-[#687086] text-sm border border-[rgba(49,71,255,0.10)]">
        <b className="text-[#151A2D]">추천 이유: </b>
        {item.reason}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => openGoogleDirections(item)}
          className="h-12 rounded-xl border border-[#E2E7F0] text-[#3147FF] font-black flex items-center justify-center gap-1"
        >
          <Navigation size={17} />
          길찾기
        </button>

        <button
          onClick={() => {
            setSelectedItem(item);
            setScreen("detail");
          }}
          className="h-12 rounded-xl bg-[#3147FF] text-white font-black"
        >
          상세보기
        </button>
      </div>
    </div>
  );
}

function ResultsScreen({ setScreen, setSelectedItem, recommendations }) {
  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <Header
        title="최종 추천 결과"
        onBack={() => setScreen("preference")}
        right={
          <button onClick={() => setScreen("preference")}>
            <SlidersHorizontal size={22} />
          </button>
        }
      />

      <StackPanel>
        <HeroRow
          title="TOP 3 추천"
          subtitle="AI 분석 결과"
          icon={Sparkles}
          onClick={() => setScreen("preference")}
        />

        {recommendations.slice(0, 3).map((item, index) => (
          <ResultCard
            key={item.id}
            item={item}
            rank={index + 1}
            setSelectedItem={setSelectedItem}
            setScreen={setScreen}
          />
        ))}
      </StackPanel>
    </div>
  );
}

function DetailScreen({ item, setScreen }) {
  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <Header
        title="상세 정보"
        onBack={() => setScreen("results")}
        right={
          <div className="flex gap-2">
            <Heart size={21} />
            <Share2 size={21} />
          </div>
        }
      />

      <StackPanel>
        <HeroRow
          title={item.name}
          subtitle={item.address}
          icon={MapPin}
          onClick={() => openGoogleDirections(item)}
        />

        <StackRow
          icon={ShieldCheck}
          title="상태"
          subtitle={item.status}
          pill={item.detailStatus}
          action
        />

        <StackRow
          icon={Phone}
          title="전화/관리"
          subtitle="터치하여 연결"
          pill={item.phone}
          onClick={() => callGym(item)}
        />

        <StackRow
          icon={MapPin}
          title="시설 위치"
          subtitle={`${item.area} · ${formatDistance(item.distance)}`}
          pill="길찾기"
          action
          onClick={() => openGoogleDirections(item)}
        />

        <div className={cx("rounded-[1.45rem] p-5", softCard)}>
          <h3 className="text-xl font-black text-[#151A2D] mb-3">데이터 정보</h3>
          <p className="flex gap-2 text-[#687086] font-bold">
            <CalendarDays size={18} className="text-[#3147FF]" />
            기준일/인허가: {item.licenseDate}
          </p>
          <p className="flex gap-2 mt-2 text-[#687086] font-bold">
            <Ruler size={18} className="text-[#3147FF]" />
            규모/기구수: {item.areaSize}
          </p>
        </div>
      </StackPanel>
    </div>
  );
}

function MyScreen({
  setScreen,
  distanceLimit,
  setDistanceLimit,
  selectedPurposes,
  setSelectedPurposes,
  selectedTypes,
  setSelectedTypes,
  preferenceLocked,
  setPreferenceLocked,
}) {
  const profiles = [
    {
      name: "헬스장 중심",
      purpose: "근력",
      types: ["헬스장/피트니스", "PT/퍼스널"],
      distance: 3,
    },
    {
      name: "시니어 야외운동",
      purpose: "시니어운동",
      types: ["실외운동기구"],
      distance: 3,
    },
    {
      name: "가까운 곳 중심",
      purpose: "자유운동",
      types: ["헬스장/피트니스", "PT/퍼스널", "필라테스/요가"],
      distance: 1.5,
    },
  ];

  return (
    <div className={cx("h-full pb-[86px] overflow-y-auto", noScrollBar, pageBg)}>
      <AppTop setScreen={setScreen} />

      <StackPanel>
        <HeroRow
          title="MY 설정"
          subtitle="내 운동 조건 고정"
          icon={Lock}
          onClick={() => setPreferenceLocked(true)}
        />

        {profiles.map((profile) => (
          <StackRow
            key={profile.name}
            icon={Settings}
            title={profile.name}
            subtitle={profile.purpose}
            pill="적용"
            onClick={() => {
              setSelectedPurposes([profile.purpose]);
              setSelectedTypes(profile.types);
              setDistanceLimit(profile.distance);
              setPreferenceLocked(true);
            }}
          />
        ))}

        <StackRow
          icon={ShieldCheck}
          title="현재 저장된 조건"
          subtitle={`${distanceLimit}km · ${selectedPurposes[0]}`}
          pill={preferenceLocked ? "고정됨" : "저장"}
          action
          onClick={() => setPreferenceLocked((value) => !value)}
        />

        <CTA dark onClick={() => setScreen("nearby")}>
          내 조건으로 바로 검색
        </CTA>
      </StackPanel>
    </div>
  );
}

export default function HealthMapAIPrototype() {
  const [screen, setScreen] = useState("start");
  const [distanceLimit, setDistanceLimit] = useState(3);
  const [currentLocation, setCurrentLocation] = useState(presetLocations[0]);
  const [selectedPurposes, setSelectedPurposes] = useState(["근력"]);
  const [selectedTypes, setSelectedTypes] = useState([
    "헬스장/피트니스",
    "PT/퍼스널",
    "필라테스/요가",
    "크로스핏/기능성",
  ]);
  const [preferenceLocked, setPreferenceLocked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activityMode, setActivityMode] = useState("gym");

  const nearbyGyms = useMemo(
    () => withDistance(gyms, distanceLimit, currentLocation),
    [distanceLimit, currentLocation]
  );

  const nearbyParks = useMemo(
    () =>
      withDistance(outdoorParks, distanceLimit, currentLocation, 2).sort(
        (a, b) => b.equipmentCount - a.equipmentCount
      ),
    [distanceLimit, currentLocation]
  );

  const items = activityMode === "senior" ? nearbyParks : nearbyGyms;

  const recommendations = useMemo(
    () => enrichItems(items, selectedPurposes, selectedTypes),
    [items, selectedPurposes, selectedTypes]
  );

  const activeItem = selectedItem || recommendations[0] || items[0] || gyms[0];

  const current = useMemo(() => {
    if (screen === "start") {
      return <StartScreen setScreen={setScreen} />;
    }

    if (screen === "home") {
      return (
        <HomeScreen
          setScreen={setScreen}
          distanceLimit={distanceLimit}
          setDistanceLimit={setDistanceLimit}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          activityMode={activityMode}
          setActivityMode={setActivityMode}
          setSelectedPurposes={setSelectedPurposes}
          setSelectedTypes={setSelectedTypes}
        />
      );
    }

    if (screen === "nearby") {
      return (
        <NearbyScreen
          setScreen={setScreen}
          items={items}
          distanceLimit={distanceLimit}
          currentLocation={currentLocation}
          activityMode={activityMode}
        />
      );
    }

    if (screen === "preference") {
      return (
        <PreferenceScreen
          setScreen={setScreen}
          selectedPurposes={selectedPurposes}
          setSelectedPurposes={setSelectedPurposes}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      );
    }

    if (screen === "loading") {
      return <LoadingScreen setScreen={setScreen} />;
    }

    if (screen === "results") {
      return (
        <ResultsScreen
          setScreen={setScreen}
          setSelectedItem={setSelectedItem}
          recommendations={recommendations}
        />
      );
    }

    if (screen === "detail") {
      return <DetailScreen item={activeItem} setScreen={setScreen} />;
    }

    return (
      <MyScreen
        setScreen={setScreen}
        distanceLimit={distanceLimit}
        setDistanceLimit={setDistanceLimit}
        selectedPurposes={selectedPurposes}
        setSelectedPurposes={setSelectedPurposes}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        preferenceLocked={preferenceLocked}
        setPreferenceLocked={setPreferenceLocked}
      />
    );
  }, [
    screen,
    distanceLimit,
    currentLocation,
    activityMode,
    items,
    selectedPurposes,
    selectedTypes,
    recommendations,
    activeItem,
    preferenceLocked,
  ]);

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.18 }}
          className="h-full relative"
        >
          {current}
          {screen !== "loading" && screen !== "start" && (
            <BottomTabs screen={screen} setScreen={setScreen} />
          )}
        </motion.div>
      </AnimatePresence>
    </PhoneFrame>
  );
}
