import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const DARK = "#151918";
const LIGHT = "#F5F6F3";
const SAGE = "#77977F";

function frame({ w, h, bg, grid = 50, children, gridColor }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none" role="img">
<defs>
<pattern id="grid" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">
<path d="M ${grid} 0 L 0 0 0 ${grid}" stroke="${gridColor ?? LIGHT}" stroke-opacity="${bg === DARK ? 0.05 : 0.07}" stroke-width="1"/>
</pattern>
</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
<rect width="${w}" height="${h}" fill="url(#grid)"/>
${children}
</svg>`;
}

const line = (x1, y1, x2, y2, color = LIGHT, opacity = 0.7, width = 1.5) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}"/>`;

const rect = (
  x,
  y,
  w,
  h,
  color = LIGHT,
  opacity = 0.7,
  width = 1.5,
  fill = "none",
  fillOpacity = 0,
) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" fill="${fill}" fill-opacity="${fillOpacity}"/>`;

const circle = (
  cx,
  cy,
  r,
  color = SAGE,
  opacity = 0.6,
  width = 1.5,
  fill = "none",
  fillOpacity = 0,
) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" fill="${fill}" fill-opacity="${fillOpacity}"/>`;

const cross = (x, y, size = 8, color = SAGE, opacity = 0.8) =>
  `${line(x - size, y, x + size, y, color, opacity, 1)}${line(x, y - size, x, y + size, color, opacity, 1)}`;

function towerScene(w, h) {
  const baseY = h * 0.82;
  const parts = [];
  parts.push(circle(w * 0.74, h * 0.26, w * 0.16, SAGE, 0.25, 1.2));
  parts.push(circle(w * 0.74, h * 0.26, w * 0.16, SAGE, 0.12, 0.8, SAGE, 0.06));
  // main tower
  parts.push(
    rect(w * 0.3, h * 0.16, w * 0.2, baseY - h * 0.16, LIGHT, 0.85, 2),
  );
  for (let i = 1; i < 14; i += 1) {
    const y = h * 0.16 + ((baseY - h * 0.16) / 14) * i;
    parts.push(line(w * 0.3, y, w * 0.5, y, LIGHT, 0.35, 1));
  }
  // offset volume
  parts.push(
    rect(w * 0.5, h * 0.34, w * 0.14, baseY - h * 0.34, LIGHT, 0.55, 1.5),
  );
  for (let i = 1; i < 9; i += 1) {
    const y = h * 0.34 + ((baseY - h * 0.34) / 9) * i;
    parts.push(line(w * 0.5, y, w * 0.64, y, LIGHT, 0.25, 1));
  }
  // lower block
  parts.push(
    rect(w * 0.16, h * 0.56, w * 0.14, baseY - h * 0.56, LIGHT, 0.5, 1.5),
  );
  parts.push(
    rect(w * 0.64, h * 0.6, w * 0.18, baseY - h * 0.6, LIGHT, 0.4, 1.2),
  );
  // ground line + dimensions
  parts.push(line(w * 0.08, baseY, w * 0.92, baseY, LIGHT, 0.8, 2));
  parts.push(line(w * 0.08, baseY + 26, w * 0.92, baseY + 26, SAGE, 0.4, 1));
  parts.push(cross(w * 0.08, baseY + 26, 5, SAGE, 0.7));
  parts.push(cross(w * 0.92, baseY + 26, 5, SAGE, 0.7));
  // vertical accent
  parts.push(line(w * 0.78, h * 0.62, w * 0.78, baseY, SAGE, 0.8, 1.5));
  parts.push(cross(w * 0.78, h * 0.62, 5, SAGE, 0.9));
  return frame({ w, h, bg: DARK, grid: 46, children: parts.join("") });
}

function oasisScene(w, h) {
  const baseY = h * 0.84;
  const parts = [];
  // cubic volumes with terraces
  const blocks = [
    [0.22, 0.24, 0.24, 0.3],
    [0.22, 0.54, 0.24, 0.3],
    [0.46, 0.38, 0.18, 0.46],
    [0.64, 0.2, 0.14, 0.3],
    [0.64, 0.5, 0.14, 0.34],
  ];
  blocks.forEach(([x, y, bw, bh], index) => {
    parts.push(rect(w * x, h * y, w * bw, h * bh, LIGHT, 0.7, 1.6));
    for (let i = 1; i < 5; i += 1) {
      const ly = h * y + ((h * bh) / 5) * i;
      parts.push(line(w * x, ly, w * (x + bw), ly, LIGHT, 0.22, 1));
    }
    // green terrace
    const ty = h * (y + bh * 0.72);
    for (let i = 0; i < 4; i += 1) {
      const px = w * (x + bw * (0.12 + i * 0.2));
      parts.push(line(px, ty, px + 4, ty - 12, SAGE, 0.9, 1.2));
      parts.push(line(px + 4, ty - 12, px + 8, ty, SAGE, 0.9, 1.2));
    }
    if (index === 0) {
      parts.push(
        line(
          w * (x + bw * 0.5),
          h * (y + bh),
          w * (x + bw * 0.5),
          h * (y + bh + 0.06),
          SAGE,
          0.6,
          1,
        ),
      );
    }
  });
  parts.push(line(w * 0.1, baseY, w * 0.9, baseY, LIGHT, 0.8, 2));
  parts.push(line(w * 0.1, baseY + 24, w * 0.9, baseY + 24, SAGE, 0.4, 1));
  parts.push(cross(w * 0.1, baseY + 24, 5, SAGE, 0.7));
  parts.push(cross(w * 0.9, baseY + 24, 5, SAGE, 0.7));
  parts.push(circle(w * 0.83, h * 0.2, 40, SAGE, 0.35, 1.2));
  return frame({ w, h, bg: DARK, grid: 46, children: parts.join("") });
}

function planScene(w, h, variant = 0) {
  const parts = [];
  parts.push(rect(w * 0.12, h * 0.16, w * 0.76, h * 0.68, LIGHT, 0.75, 2));
  parts.push(rect(w * 0.2, h * 0.26, w * 0.28, h * 0.3, LIGHT, 0.5, 1.2));
  parts.push(rect(w * 0.56, h * 0.26, w * 0.24, h * 0.18, LIGHT, 0.4, 1.2));
  parts.push(rect(w * 0.56, h * 0.5, w * 0.24, h * 0.24, SAGE, 0.5, 1.2));
  parts.push(rect(w * 0.2, h * 0.62, w * 0.22, h * 0.12, LIGHT, 0.4, 1.2));
  if (variant % 2 === 0) {
    parts.push(line(w * 0.48, h * 0.16, w * 0.48, h * 0.84, SAGE, 0.45, 1));
  } else {
    parts.push(circle(w * 0.44, h * 0.58, 34, SAGE, 0.5, 1.2));
  }
  // dimension lines
  parts.push(line(w * 0.12, h * 0.9, w * 0.88, h * 0.9, SAGE, 0.35, 1));
  parts.push(cross(w * 0.12, h * 0.9, 5, SAGE, 0.6));
  parts.push(cross(w * 0.88, h * 0.9, 5, SAGE, 0.6));
  parts.push(line(w * 0.94, h * 0.16, w * 0.94, h * 0.84, SAGE, 0.35, 1));
  return frame({ w, h, bg: DARK, grid: 40, children: parts.join("") });
}

function serviceScene(w, h, motif) {
  const cx = w * 0.5;
  const cy = h * 0.52;
  const parts = [];
  const common = [
    circle(cx, cy, Math.min(w, h) * 0.3, SAGE, 0.22, 1),
    circle(cx, cy, Math.min(w, h) * 0.42, LIGHT, 0.08, 1),
    cross(w * 0.5, h * 0.14, 8, SAGE, 0.5),
    cross(w * 0.5, h * 0.88, 8, SAGE, 0.5),
  ];
  parts.push(...common);

  if (motif === "design") {
    parts.push(rect(cx - 90, cy - 110, 180, 220, LIGHT, 0.8, 2));
    for (let i = 1; i < 8; i += 1)
      parts.push(
        line(
          cx - 90,
          cy - 110 + i * 27,
          cx + 90,
          cy - 110 + i * 27,
          LIGHT,
          0.28,
          1,
        ),
      );
    parts.push(line(cx - 90, cy - 110, cx - 90, cy + 110, SAGE, 0.8, 1.5));
    parts.push(line(cx + 90, cy - 110, cx + 90, cy + 110, SAGE, 0.8, 1.5));
    parts.push(circle(cx + 120, cy - 130, 42, SAGE, 0.5, 1.2));
  } else if (motif === "safety") {
    parts.push(
      `<path d="M ${cx} ${cy - 130} L ${cx + 110} ${cy - 60} L ${cx + 90} ${cy + 90} L ${cx} ${cy + 140} L ${cx - 90} ${cy + 90} L ${cx - 110} ${cy - 60} Z" stroke="${LIGHT}" stroke-opacity="0.8" stroke-width="2"/>`,
    );
    parts.push(
      `<path d="M ${cx} ${cy - 80} L ${cx + 66} ${cy - 36} L ${cx + 54} ${cy + 56} L ${cx} ${cy + 92} L ${cx - 54} ${cy + 56} L ${cx - 66} ${cy - 36} Z" stroke="${SAGE}" stroke-opacity="0.8" stroke-width="1.5"/>`,
    );
    parts.push(cross(cx, cy, 12, SAGE, 0.9));
  } else if (motif === "fire") {
    for (let i = 1; i <= 4; i += 1) {
      parts.push(
        `<path d="M ${cx - 120 - i * 14} ${cy + 90} Q ${cx} ${cy - 60 - i * 26} ${cx + 120 + i * 14} ${cy + 90}" stroke="${i === 2 ? SAGE : LIGHT}" stroke-opacity="${0.65 - i * 0.1}" stroke-width="1.5"/>`,
      );
    }
    parts.push(
      `<path d="M ${cx} ${cy + 96} C ${cx - 56} ${cy + 40} ${cx - 26} ${cy + 6} ${cx - 40} ${cy - 44} C ${cx - 8} ${cy - 20} ${cx + 2} ${cy - 52} ${cx - 6} ${cy - 90} C ${cx + 58} ${cy - 36} ${cx + 64} ${cy + 34} ${cx} ${cy + 96} Z" stroke="${SAGE}" stroke-opacity="0.85" stroke-width="2" fill="${SAGE}" fill-opacity="0.06"/>`,
    );
  } else if (motif === "civil") {
    parts.push(rect(cx - 150, cy - 40, 120, 150, LIGHT, 0.7, 1.5));
    parts.push(rect(cx + 30, cy - 90, 120, 200, LIGHT, 0.7, 1.5));
    parts.push(rect(cx - 120, cy - 100, 70, 40, SAGE, 0.6, 1.2));
    parts.push(line(cx - 190, cy + 120, cx + 190, cy + 120, LIGHT, 0.8, 2));
    parts.push(line(cx - 190, cy + 138, cx + 190, cy + 138, SAGE, 0.4, 1));
  } else if (motif === "surveying") {
    for (let i = 1; i <= 5; i += 1) {
      parts.push(
        `<path d="M ${cx - 190 + i * 12} ${cy + 60} C ${cx - 100} ${cy + 20 + i * 8} ${cx - 30} ${cy - 10 - i * 6} ${cx + 30} ${cy + 20} S ${cx + 120} ${cy - 30 - i * 6} ${cx + 190} ${cy - 10}" stroke="${LIGHT}" stroke-opacity="${0.14 + i * 0.1}" stroke-width="1.2"/>`,
      );
    }
    parts.push(cross(cx, cy, 18, SAGE, 0.9));
    parts.push(circle(cx, cy, 60, SAGE, 0.5, 1.2));
  } else if (motif === "management") {
    const rows = [cy - 90, cy - 30, cy + 30, cy + 90];
    rows.forEach((y, index) => {
      parts.push(line(cx - 170, y, cx + 170, y, LIGHT, 0.18, 1));
      parts.push(
        rect(
          cx - 150 + index * 20,
          y - 10,
          120 + index * 30,
          20,
          index === 1 ? SAGE : LIGHT,
          index === 1 ? 0.8 : 0.45,
          1.2,
          index === 1 ? SAGE : LIGHT,
          index === 1 ? 0.15 : 0.04,
        ),
      );
    });
  } else {
    const nodes = [
      [cx, cy - 100],
      [cx - 120, cy - 20],
      [cx + 120, cy - 20],
      [cx - 70, cy + 100],
      [cx + 80, cy + 100],
    ];
    const edges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [1, 2],
      [3, 4],
    ];
    edges.forEach(([a, b]) => {
      parts.push(
        line(
          nodes[a][0],
          nodes[a][1],
          nodes[b][0],
          nodes[b][1],
          SAGE,
          0.5,
          1.2,
        ),
      );
    });
    nodes.forEach(([x, y]) =>
      parts.push(circle(x, y, 7, SAGE, 0.95, 1.5, SAGE, 0.25)),
    );
    parts.push(cross(cx, cy, 10, LIGHT, 0.4));
  }
  return frame({ w, h, bg: DARK, grid: 40, children: parts.join("") });
}

function newsScene(w, h, tone) {
  const bg = LIGHT;
  const parts = [];
  parts.push(rect(w * 0.1, h * 0.16, w * 0.5, h * 0.62, DARK, 0.75, 2));
  for (let i = 1; i < 6; i += 1) {
    parts.push(
      line(
        w * 0.1,
        h * 0.16 + (h * 0.62 * i) / 6,
        w * 0.6,
        h * 0.16 + (h * 0.62 * i) / 6,
        DARK,
        0.2,
        1,
      ),
    );
  }
  parts.push(
    rect(
      w * 0.54,
      h * 0.28,
      w * 0.26,
      h * 0.26,
      SAGE,
      0.7,
      1.5,
      SAGE,
      tone === "dark" ? 0.2 : 0.12,
    ),
  );
  parts.push(rect(w * 0.54, h * 0.58, w * 0.36, h * 0.2, DARK, 0.5, 1.5));
  for (let i = 1; i < 4; i += 1) {
    parts.push(
      line(
        w * 0.54,
        h * 0.58 + (h * 0.2 * i) / 4,
        w * 0.9,
        h * 0.58 + (h * 0.2 * i) / 4,
        DARK,
        0.2,
        1,
      ),
    );
  }
  parts.push(circle(w * 0.83, h * 0.2, 46, SAGE, 0.5, 1.2));
  parts.push(line(w * 0.1, h * 0.9, w * 0.9, h * 0.9, DARK, 0.4, 1));
  return frame({ w, h, bg, grid: 36, children: parts.join("") });
}

const files = {
  "services/engineering-design.svg": serviceScene(800, 600, "design"),
  "services/safety-engineering.svg": serviceScene(800, 600, "safety"),
  "services/fire-protection.svg": serviceScene(800, 600, "fire"),
  "services/civil-defense.svg": serviceScene(800, 600, "civil"),
  "services/surveying.svg": serviceScene(800, 600, "surveying"),
  "services/project-management.svg": serviceScene(800, 600, "management"),
  "services/engineering-consultancy.svg": serviceScene(800, 600, "consultancy"),
  "projects/tower-al-qadiri.svg": towerScene(1000, 750),
  "projects/tower-al-qadiri-01.svg": planScene(1200, 800, 0),
  "projects/tower-al-qadiri-02.svg": towerScene(1200, 800),
  "projects/oasis-tower.svg": oasisScene(1000, 750),
  "projects/oasis-tower-01.svg": oasisScene(1200, 800),
  "projects/oasis-tower-02.svg": planScene(1200, 800, 1),
  "news/news-01.svg": newsScene(800, 600, "light"),
  "news/news-02.svg": newsScene(800, 600, "dark"),
  "news/news-03.svg": newsScene(800, 600, "light"),
};

for (const [path, svg] of Object.entries(files)) {
  const full = join(OUT, path);
  mkdirSync(join(OUT, path.split("/")[0]), { recursive: true });
  writeFileSync(full, svg, "utf8");
  console.log("wrote", full);
}

// Editorial portrait for the About page
const aboutSvg = frame({
  w: 1000,
  h: 1250,
  bg: DARK,
  grid: 55,
  children: [
    circle(720, 300, 210, SAGE, 0.16, 1.2),
    rect(200, 240, 330, 760, LIGHT, 0.75, 2),
    ...Array.from({ length: 16 }, (_, i) =>
      line(200, 240 + i * 47.5, 530, 240 + i * 47.5, LIGHT, 0.22, 1),
    ),
    rect(530, 430, 160, 570, LIGHT, 0.45, 1.5),
    ...Array.from({ length: 10 }, (_, i) =>
      line(530, 430 + i * 57, 690, 430 + i * 57, LIGHT, 0.18, 1),
    ),
    rect(690, 620, 160, 380, SAGE, 0.55, 1.5),
    line(120, 1040, 880, 1040, LIGHT, 0.8, 2),
    line(120, 1064, 880, 1064, SAGE, 0.4, 1),
    cross(880, 1064, 6, SAGE, 0.7),
    cross(120, 1064, 6, SAGE, 0.7),
  ].join(""),
});
mkdirSync(join(OUT, "about"), { recursive: true });
writeFileSync(join(OUT, "about", "engineering-portrait.svg"), aboutSvg, "utf8");
console.log("wrote about portrait");

// Open Graph image
const og = frame({
  w: 1200,
  h: 630,
  bg: DARK,
  grid: 60,
  children: [
    circle(920, 180, 220, SAGE, 0.18, 1.2),
    rect(760, 170, 260, 400, LIGHT, 0.45, 1.5),
    ...Array.from({ length: 9 }, (_, i) =>
      line(760, 170 + i * 50, 1020, 170 + i * 50, LIGHT, 0.16, 1),
    ),
    line(100, 494, 1100, 494, LIGHT, 0.6, 2),
    line(100, 516, 1100, 516, SAGE, 0.4, 1),
    rect(100, 120, 8, 374, SAGE, 0.9, 0),
  ].join(""),
});
writeFileSync(join(OUT, "og-image.svg"), og, "utf8");
console.log("wrote og image");
