/* @ds-bundle: {"format":3,"namespace":"Ds0UTL1ERDesignSystem_683794","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ContributionBar","sourcePath":"components/data/ContributionBar.jsx"},{"name":"MemberRow","sourcePath":"components/data/MemberRow.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"9539f6516c8c","components/core/Badge.jsx":"41ccd3980e28","components/core/Button.jsx":"fa6fb7165187","components/core/Card.jsx":"4a000df0ff75","components/data/ContributionBar.jsx":"66fe76abaaaf","components/data/MemberRow.jsx":"2be5c9f48c83","components/data/StatCard.jsx":"3b6eced73900","ui_kits/bi-dashboard/CashScreen.jsx":"2a9c34eee272","ui_kits/bi-dashboard/Icons.jsx":"dcaf346b4db7","ui_kits/bi-dashboard/MemberDetailScreen.jsx":"5ee42e67f1f7","ui_kits/bi-dashboard/OverviewScreen.jsx":"2794b279a971","ui_kits/bi-dashboard/RankingScreen.jsx":"80f69fcc4227","ui_kits/bi-dashboard/SankeyFlow.jsx":"a9a001b771d3","ui_kits/bi-dashboard/Sidebar.jsx":"093752603ded","ui_kits/bi-dashboard/TopBar.jsx":"60a62863cd0d","ui_kits/bi-dashboard/data.js":"114e31b44a18"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds0UTL1ERDesignSystem_683794 = window.Ds0UTL1ERDesignSystem_683794 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 0UTL1ER Avatar — initials chip for a person.
 * Deterministic background tint from the name; optional accent ring and
 * profit/cost status ring color.
 */
function Avatar({
  name = "",
  size = 36,
  ring = "none",
  // none | accent | profit | cost
  src = null,
  style = {},
  ...rest
}) {
  const initials = (name || "").trim().split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase() || "—";

  // For Japanese names, take the first character (surname kanji) instead.
  const isCJK = /[\u3000-\u9fff\uff00-\uffef]/.test(name);
  const label = isCJK ? name.trim().slice(0, 1) : initials;
  const tints = ["var(--blue-tint)", "var(--cyan-tint)", "var(--profit-tint)", "rgba(245,158,11,0.16)", "rgba(124,58,237,0.18)", "rgba(236,72,153,0.16)"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  const bg = tints[h % tints.length];
  const ringColor = {
    none: "transparent",
    accent: "var(--accent)",
    profit: "var(--profit)",
    cost: "var(--cost)"
  }[ring];
  return /*#__PURE__*/React.createElement("div", _extends({
    title: name,
    style: {
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      background: src ? "transparent" : bg,
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)",
      fontSize: Math.round(size * 0.4),
      fontWeight: "var(--weight-semibold)",
      boxShadow: ring !== "none" ? `0 0 0 2px var(--bg-app), 0 0 0 ${Math.max(2, size * 0.06)}px ${ringColor}` : "none",
      overflow: "hidden",
      userSelect: "none",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : label);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 0UTL1ER Badge — compact status / category label.
 * tone drives color; `dot` shows a leading status dot; `solid` fills.
 */
function Badge({
  children,
  tone = "neutral",
  // neutral | profit | cost | accent | revenue | warning
  solid = false,
  dot = false,
  size = "md",
  // sm | md
  style = {},
  ...rest
}) {
  const palette = {
    neutral: {
      fg: "var(--slate-200)",
      bg: "rgba(139,150,178,0.14)",
      strong: "var(--slate-400)"
    },
    profit: {
      fg: "var(--profit-strong)",
      bg: "var(--profit-tint)",
      strong: "var(--profit)"
    },
    cost: {
      fg: "var(--cost-strong)",
      bg: "var(--cost-tint)",
      strong: "var(--cost)"
    },
    accent: {
      fg: "var(--blue-300)",
      bg: "var(--blue-tint)",
      strong: "var(--accent)"
    },
    revenue: {
      fg: "var(--cyan-400)",
      bg: "var(--cyan-tint)",
      strong: "var(--cyan-500)"
    },
    warning: {
      fg: "var(--amber-400)",
      bg: "var(--amber-tint)",
      strong: "var(--amber-500)"
    }
  }[tone];
  const dims = size === "sm" ? {
    fontSize: "var(--text-2xs)",
    pad: "2px 7px",
    gap: "4px",
    dotSize: 5
  } : {
    fontSize: "var(--text-xs)",
    pad: "3px 9px",
    gap: "6px",
    dotSize: 6
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: dims.gap,
      padding: dims.pad,
      fontFamily: "var(--font-sans)",
      fontSize: dims.fontSize,
      fontWeight: "var(--weight-semibold)",
      lineHeight: 1,
      letterSpacing: "var(--tracking-wide)",
      borderRadius: "var(--radius-pill)",
      color: solid ? "var(--text-on-accent)" : palette.fg,
      background: solid ? palette.strong : palette.bg,
      border: solid ? "none" : `1px solid ${palette.bg}`,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: dims.dotSize,
      height: dims.dotSize,
      borderRadius: "50%",
      background: solid ? "currentColor" : palette.strong,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 0UTL1ER Button — primary action control.
 * Variants: primary (blue), secondary (outline), ghost, danger.
 * Sizes: sm | md | lg. Optional leading/trailing icon nodes.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  style = {},
  ...rest
}) {
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height-md)",
    lg: "var(--control-height-lg)"
  };
  const fontSizes = {
    sm: "var(--text-xs)",
    md: "var(--text-base)",
    lg: "var(--text-md)"
  };
  const padX = {
    sm: "10px",
    md: "14px",
    lg: "20px"
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--accent)",
      boxShadow: "var(--shadow-xs)"
    },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--cost)",
      color: "var(--text-on-accent)",
      border: "1px solid var(--cost)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      background: "var(--accent-hover)"
    },
    secondary: {
      background: "var(--surface-3)",
      borderColor: "var(--navy-600)"
    },
    ghost: {
      background: "var(--surface-2)",
      color: "var(--text-primary)"
    },
    danger: {
      background: "var(--cost-strong)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-4)",
      height: heights[size],
      padding: `0 ${padX[size]}`,
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontSize: fontSizes[size],
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
      transform: !disabled && hover ? "translateY(-1px)" : "translateY(0)",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexShrink: 0
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexShrink: 0
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 0UTL1ER Card — base surface container.
 * Optional title/subtitle header and action slot. `tone` paints a left
 * accent + tinted glow for profit/cost emphasis.
 */
function Card({
  children,
  title = null,
  subtitle = null,
  action = null,
  tone = "default",
  // default | profit | cost | accent
  padding = "var(--card-padding)",
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const toneAccent = {
    default: null,
    profit: "var(--profit)",
    cost: "var(--cost)",
    accent: "var(--accent)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      background: "var(--surface-1)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: interactive && hover ? "var(--shadow-md), var(--edge-highlight)" : "var(--shadow-sm), var(--edge-highlight)",
      overflow: "hidden",
      transition: "box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      transform: interactive && hover ? "translateY(-2px)" : "none",
      borderColor: interactive && hover ? "var(--border-strong)" : "var(--border-default)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), toneAccent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      insetBlock: 0,
      left: 0,
      width: 3,
      background: toneAccent
    }
  }), (title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: `${padding} ${padding} 0`
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      marginTop: "var(--space-2)"
    }
  }, subtitle)), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, action)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/ContributionBar.jsx
try { (() => {
const fmtYen = n => "¥" + Math.round(n).toLocaleString("ja-JP");

/**
 * 0UTL1ER ContributionBar — the signature visualization.
 * A single person's revenue (売上) split into cost (コスト, red) and
 * profit (利益, green). The bar width encodes the revenue; the split point
 * shows how much value is retained. Animates fill on mount.
 */
function ContributionBar({
  revenue = 0,
  cost = 0,
  height = 14,
  showLabels = true,
  showLegend = false,
  animate = true,
  style = {}
}) {
  const profit = revenue - cost;
  const costPct = revenue > 0 ? cost / revenue * 100 : 0;
  const profitPct = revenue > 0 ? Math.max(profit, 0) / revenue * 100 : 0;
  const isLoss = profit < 0;
  const [mounted, setMounted] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) return;
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [animate]);
  const grow = pct => mounted ? `${pct}%` : "0%";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      ...style
    }
  }, showLabels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "var(--space-4)",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u58F2\u4E0A", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--revenue)",
      fontWeight: 600
    }
  }, fmtYen(revenue))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u30B3\u30B9\u30C8", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--cost)",
      fontWeight: 600
    }
  }, fmtYen(cost))), /*#__PURE__*/React.createElement("span", null, "\u5229\u76CA", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: isLoss ? "var(--cost)" : "var(--profit)",
      fontWeight: 700
    }
  }, (isLoss ? "−" : "+") + fmtYen(Math.abs(profit)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      width: "100%",
      height,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      background: "var(--surface-2)",
      boxShadow: "var(--edge-highlight)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: grow(costPct),
      background: "linear-gradient(180deg, var(--red-400), var(--red-600))",
      transition: "width var(--dur-flow) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: grow(profitPct),
      background: "linear-gradient(180deg, var(--green-400), var(--green-600))",
      transition: "width var(--dur-flow) var(--ease-out)",
      transitionDelay: "60ms"
    }
  })), showLegend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-7)",
      marginTop: "var(--space-4)",
      fontSize: "var(--text-2xs)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--cost)",
    label: `コスト ${costPct.toFixed(0)}%`
  }), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--profit)",
    label: `利益 ${Math.max(profitPct, 0).toFixed(0)}%`
  })));
}
function Legend({
  color,
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: color
    }
  }), label);
}
Object.assign(__ds_scope, { ContributionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ContributionBar.jsx", error: String((e && e.message) || e) }); }

// components/data/MemberRow.jsx
try { (() => {
const fmtYen = (n, sign = false) => {
  const s = sign ? n >= 0 ? "+" : "−" : "";
  return s + "¥" + Math.abs(Math.round(n)).toLocaleString("ja-JP");
};

/**
 * 0UTL1ER MemberRow — a ranking row for one person.
 * Rank, avatar, name + role, revenue/cost figures, profit, and an inline
 * ContributionBar. Designed for the member ranking table.
 */
function MemberRow({
  rank = null,
  name,
  role = "",
  revenue = 0,
  cost = 0,
  onClick = null,
  style = {}
}) {
  const profit = revenue - cost;
  const isLoss = profit < 0;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "28px 1fr 130px 130px 150px",
      alignItems: "center",
      gap: "var(--space-6)",
      padding: "var(--space-6) var(--space-7)",
      background: hover ? "var(--surface-3)" : "transparent",
      borderRadius: "var(--radius-md)",
      cursor: onClick ? "pointer" : "default",
      transition: "background var(--dur-fast) var(--ease-out)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      color: rank <= 3 ? "var(--accent)" : "var(--text-muted)",
      textAlign: "center"
    }
  }, rank != null ? rank : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    size: 34,
    ring: isLoss ? "cost" : "profit"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), role && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, role))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--revenue)",
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, fmtYen(revenue)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, fmtYen(cost)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-bold)",
      color: isLoss ? "var(--cost)" : "var(--profit)",
      fontVariantNumeric: "tabular-nums"
    }
  }, fmtYen(profit, true)), /*#__PURE__*/React.createElement(__ds_scope.ContributionBar, {
    revenue: revenue,
    cost: cost,
    height: 6,
    showLabels: false,
    style: {
      width: "100%"
    }
  })));
}
Object.assign(__ds_scope, { MemberRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MemberRow.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fmtYen = (n, sign = false) => {
  const s = sign ? n >= 0 ? "+" : "−" : "";
  return s + "¥" + Math.abs(Math.round(n)).toLocaleString("ja-JP");
};

/**
 * 0UTL1ER StatCard — KPI tile.
 * Big monospace figure with a label, optional delta vs. prior period, and
 * tone coloring for the figure (profit/cost/revenue/neutral).
 */
function StatCard({
  label,
  value,
  unit = "¥",
  tone = "neutral",
  // neutral | profit | cost | revenue
  delta = null,
  // number (percent) or null
  hint = null,
  format = "yen",
  // yen | number | raw
  style = {},
  ...rest
}) {
  const figureColor = {
    neutral: "var(--text-primary)",
    profit: "var(--profit)",
    cost: "var(--cost)",
    revenue: "var(--revenue)"
  }[tone];
  let display = value;
  if (format === "yen" && typeof value === "number") display = fmtYen(value);else if (format === "number" && typeof value === "number") display = value.toLocaleString("ja-JP");
  const deltaPositive = delta != null && delta >= 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-1)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--card-padding)",
      boxShadow: "var(--shadow-sm), var(--edge-highlight)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-muted)"
    }
  }, label), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      color: deltaPositive ? "var(--profit)" : "var(--cost)"
    }
  }, deltaPositive ? "▲" : "▼", " ", Math.abs(delta).toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-3xl)",
      fontWeight: "var(--weight-bold)",
      lineHeight: 1.05,
      letterSpacing: "var(--tracking-tight)",
      color: figureColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, display), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/CashScreen.jsx
try { (() => {
// CashScreen — 現金残高と将来予測、そして「誰の金か（取り分）」。
// Stacked area projection: 代表(あなた)の取り分 vs その他メンバー、を月次で。
(function () {
  const {
    Card,
    StatCard,
    Avatar,
    Badge
  } = window.Ds0UTL1ERDesignSystem_683794;
  const fmt = window.OUTLIER_FMT;

  // Compact yen for axis ticks: ¥12.4M 等
  const fmtM = n => "¥" + (n / 1000000).toFixed(n >= 10000000 ? 0 : 1) + "M";
  function CashScreen() {
    const D = window.OUTLIER_DATA;
    const C = D.cash;
    const owner = D.members.find(m => m.id === C.ownerId);
    const monthlyFlow = D.members.reduce((s, m) => s + m.profit, 0); // = totalProfit
    const ownerFlow = owner.profit;
    const othersFlow = monthlyFlow - ownerFlow;
    const ownerShare = ownerFlow / monthlyFlow;
    const M = C.months;
    const ownerStart = C.current * C.ownerEquityShare;
    const othersStart = C.current - ownerStart;
    const future = C.current + monthlyFlow * M;
    const ownerFuture = ownerStart + ownerFlow * M;

    // Build stacked-area points (month 0..M)
    const W = 880,
      H = 300,
      padL = 8,
      padR = 8,
      padT = 16,
      padB = 28;
    const plotW = W - padL - padR,
      plotH = H - padT - padB;
    const yMax = future * 1.06;
    const x = m => padL + m / M * plotW;
    const y = v => padT + plotH - v / yMax * plotH;
    const ownerPts = [],
      totalPts = [];
    for (let m = 0; m <= M; m++) {
      ownerPts.push([x(m), y(ownerStart + ownerFlow * m)]);
      totalPts.push([x(m), y(C.current + monthlyFlow * m)]);
    }
    const line = pts => pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    // owner area: from baseline up to owner line
    const ownerArea = line(ownerPts) + ` L ${x(M)} ${y(0)} L ${x(0)} ${y(0)} Z`;
    // others area: between owner line and total line
    const othersArea = line(totalPts) + " " + ownerPts.slice().reverse().map(p => "L" + p[0] + " " + p[1]).join(" ") + " Z";
    const gridVals = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax].map(v => v);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "\u73FE\u5728\u306E\u73FE\u91D1\u6B8B\u9AD8",
      value: C.current,
      tone: "neutral"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u6708\u6B21\u30AD\u30E3\u30C3\u30B7\u30E5\u30D5\u30ED\u30FC",
      value: monthlyFlow,
      tone: "profit",
      hint: "= \u5168\u54E1\u306E\u7D14\u5229\u76CA\u306E\u5408\u8A08"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: `${M}ヶ月後の予測`,
      value: future,
      tone: "revenue",
      hint: `+${fmt(monthlyFlow * M)}`
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u3042\u306A\u305F\u306E\u53D6\u308A\u5206\uFF08\u6708\uFF09",
      value: ownerFlow,
      tone: "accent",
      format: "yen",
      hint: `キャッシュフローの ${(ownerShare * 100).toFixed(0)}%`
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u73FE\u91D1\u306E\u5C06\u6765\u4E88\u6E2C",
      subtitle: `このキャッシュフローが続いた場合、${M}ヶ月で現金がどう増えるか`,
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 14,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement(Legend, {
        color: "var(--accent)",
        label: "\u3042\u306A\u305F\uFF08\u4EE3\u8868\uFF09\u306E\u53D6\u308A\u5206"
      }), /*#__PURE__*/React.createElement(Legend, {
        color: "var(--navy-600)",
        label: "\u305D\u306E\u4ED6\u30E1\u30F3\u30D0\u30FC"
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      style: {
        width: "100%",
        height: "auto",
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "cash-owner",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "var(--blue-500)",
      stopOpacity: "0.65"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "var(--blue-500)",
      stopOpacity: "0.30"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "cash-others",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "var(--navy-600)",
      stopOpacity: "0.55"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "var(--navy-700)",
      stopOpacity: "0.30"
    }))), gridVals.map((v, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: W - padR,
      y1: y(v),
      y2: y(v),
      stroke: "var(--border-subtle)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: W - padR,
      y: y(v) - 4,
      textAnchor: "end",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fill: "var(--text-muted)"
      }
    }, fmtM(v)))), /*#__PURE__*/React.createElement("path", {
      d: othersArea,
      fill: "url(#cash-others)",
      className: "cash-area",
      style: {
        animationDelay: "120ms"
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: ownerArea,
      fill: "url(#cash-owner)",
      className: "cash-area"
    }), /*#__PURE__*/React.createElement("path", {
      d: line(totalPts),
      fill: "none",
      stroke: "var(--revenue)",
      strokeWidth: "2",
      className: "cash-area",
      style: {
        animationDelay: "200ms"
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: line(ownerPts),
      fill: "none",
      stroke: "var(--accent)",
      strokeWidth: "2",
      strokeDasharray: "4 3",
      className: "cash-area"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x(M),
      cy: y(future),
      r: "4",
      fill: "var(--revenue)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x(M),
      cy: y(ownerFuture),
      r: "4",
      fill: "var(--accent)"
    }), [0, 3, 6, 9, 12].map(m => /*#__PURE__*/React.createElement("text", {
      key: m,
      x: x(m),
      y: H - 8,
      textAnchor: "middle",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fill: "var(--text-muted)"
      }
    }, m === 0 ? "現在" : "+" + m + "ヶ月")), /*#__PURE__*/React.createElement("style", null, `
                .cash-area { opacity: 0; animation: cashFade var(--dur-slow) var(--ease-out) forwards; }
                @keyframes cashFade { to { opacity: 1; } }
                @media (prefers-reduced-motion: reduce) { .cash-area { animation: none; opacity: 1; } }
              `)))), /*#__PURE__*/React.createElement(Card, {
      title: "\u3053\u306E\u6210\u9577\u306F\u8AB0\u306E\u91D1\u304B",
      subtitle: "\u6708\u3005\u5897\u3048\u308B\u73FE\u91D1\uFF08=\u7D14\u5229\u76CA\uFF09\u306E\u53D6\u308A\u5206"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: 4
      }
    }, [...D.members].sort((a, b) => b.profit - a.profit).filter(m => m.profit > 0).map(m => {
      const share = m.profit / monthlyFlow;
      const isOwner = m.id === C.ownerId;
      return /*#__PURE__*/React.createElement("div", {
        key: m.id,
        style: {
          display: "grid",
          gridTemplateColumns: "180px 1fr 150px",
          alignItems: "center",
          gap: 14,
          padding: "8px 12px",
          borderRadius: "var(--radius-md)",
          background: isOwner ? "var(--accent-tint)" : "transparent"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: m.name,
        size: 28,
        ring: isOwner ? "accent" : "none"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: isOwner ? 700 : 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, m.name, isOwner && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--accent)",
          marginLeft: 6,
          fontSize: 11
        }
      }, "\u3042\u306A\u305F"))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 10,
          borderRadius: 5,
          background: "var(--surface-2)",
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: (share * 100).toFixed(1) + "%",
          height: "100%",
          borderRadius: 5,
          background: isOwner ? "var(--accent)" : "var(--navy-600)"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontVariantNumeric: "tabular-nums"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: isOwner ? "var(--accent)" : "var(--text-primary)"
        }
      }, (share * 100).toFixed(0), "%"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11.5,
          color: "var(--text-muted)",
          marginLeft: 8
        }
      }, fmt(m.profit, true), "/\u6708")));
    }))));
  }
  function Legend({
    color,
    label
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11.5,
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 3,
        background: color
      }
    }), label);
  }
  window.CashScreen = CashScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/CashScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/Icons.jsx
try { (() => {
// Lucide icon paths (MIT). Rendered as stroke icons via a tiny <Icon> component.
(function () {
  const P = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    flow: '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    trendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    trendingDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>'
  };
  function Icon({
    name,
    size = 18,
    strokeWidth = 2,
    style = {},
    ...rest
  }) {
    return React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        display: "block",
        flexShrink: 0,
        ...style
      },
      dangerouslySetInnerHTML: {
        __html: P[name] || ""
      },
      ...rest
    });
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/MemberDetailScreen.jsx
try { (() => {
// MemberDetailScreen — one person's causal breakdown: 売上 → コスト内訳 → 純利益.
(function () {
  const {
    Card,
    Avatar,
    Badge,
    StatCard,
    ContributionBar,
    Button
  } = window.Ds0UTL1ERDesignSystem_683794;
  const Icon = window.Icon;
  const fmt = window.OUTLIER_FMT;
  function WaterfallRow({
    label,
    sub,
    amount,
    kind
  }) {
    // kind: revenue | deduction | result
    const color = kind === "deduction" ? "var(--cost)" : kind === "result" ? "var(--profit)" : "var(--revenue)";
    const sign = kind === "deduction" ? "−" : kind === "result" ? "" : "";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 16px",
        borderRadius: "var(--radius-md)",
        background: kind === "result" ? "var(--profit-tint)" : "var(--surface-2)",
        border: kind === "result" ? "1px solid var(--profit)" : "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 2,
        background: color
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: kind === "result" ? 700 : 600,
        color: "var(--text-primary)"
      }
    }, label), sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--text-muted)"
      }
    }, sub))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: kind === "result" ? 19 : 15,
        fontWeight: 700,
        color,
        fontVariantNumeric: "tabular-nums"
      }
    }, sign, fmt(amount)));
  }
  function MemberDetailScreen({
    memberId,
    onBack
  }) {
    const D = window.OUTLIER_DATA;
    const m = D.members.find(x => x.id === memberId) || D.members[0];
    const isLoss = m.profit < 0;
    const marginPct = (m.margin * 100).toFixed(1);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
        maxWidth: 980
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "none",
        border: "none",
        color: "var(--text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 500,
        alignSelf: "flex-start",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrowLeft",
      size: 16
    }), " \u30E9\u30F3\u30AD\u30F3\u30B0\u306B\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: m.name,
      size: 56,
      ring: isLoss ? "cost" : "profit"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 22,
        fontWeight: 700
      }
    }, m.name), /*#__PURE__*/React.createElement(Badge, {
      tone: m.type === "代表" ? "accent" : "neutral"
    }, m.type), /*#__PURE__*/React.createElement(Badge, {
      tone: isLoss ? "cost" : "profit",
      dot: true
    }, isLoss ? "赤字" : "黒字")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, m.role, " \xB7 ", D.period))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "\u58F2\u4E0A",
      value: m.revenue,
      tone: "revenue"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u30B3\u30B9\u30C8\uFF08\u793E\u4FDD\u8FBC\uFF09",
      value: m.cost,
      tone: "cost"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u4F1A\u793E\u3078\u306E\u7D14\u5229\u76CA",
      value: m.profit,
      tone: isLoss ? "cost" : "profit",
      hint: `利益率 ${marginPct}%`
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.15fr 1fr",
        gap: 16,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u5185\u8A33",
      subtitle: "\u58F2\u4E0A\u304B\u3089\u30B3\u30B9\u30C8\u3092\u5DEE\u3057\u5F15\u3044\u305F\u7D14\u5229\u76CA"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(WaterfallRow, {
      label: "\u58F2\u4E0A",
      sub: "\u672C\u4EBA\u304C\u751F\u307F\u51FA\u3057\u305F\u58F2\u4E0A",
      amount: m.revenue,
      kind: "revenue"
    }), /*#__PURE__*/React.createElement(WaterfallRow, {
      label: "\u7D66\u4E0E",
      sub: "\u6708\u984D\u7D66\u4E0E",
      amount: m.salary,
      kind: "deduction"
    }), /*#__PURE__*/React.createElement(WaterfallRow, {
      label: "\u793E\u4F1A\u4FDD\u967A\u6599",
      sub: "\u4F1A\u793E\u8CA0\u62C5\u5206",
      amount: m.social,
      kind: "deduction"
    }), m.other > 0 && /*#__PURE__*/React.createElement(WaterfallRow, {
      label: "\u305D\u306E\u4ED6\u7D4C\u8CBB",
      amount: m.other,
      kind: "deduction"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border-default)",
        margin: "4px 0"
      }
    }), /*#__PURE__*/React.createElement(WaterfallRow, {
      label: "\u4F1A\u793E\u3078\u306E\u7D14\u5229\u76CA",
      sub: `利益率 ${marginPct}%`,
      amount: m.profit,
      kind: "result"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "\u58F2\u4E0A\u306E\u69CB\u6210"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(ContributionBar, {
      revenue: m.revenue,
      cost: m.cost,
      height: 18,
      showLegend: true
    }))), /*#__PURE__*/React.createElement(Card, {
      tone: isLoss ? "cost" : "profit"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--text-primary)"
      }
    }, m.name), "\u3055\u3093\u306F\u6BCE\u6708", " ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--revenue)",
        fontFamily: "var(--font-mono)"
      }
    }, fmt(m.revenue)), " ", "\u306E\u58F2\u4E0A\u3092\u751F\u307F\u51FA\u3057\u3001\u793E\u4FDD\u8FBC\u307F\u3067", " ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--cost)",
        fontFamily: "var(--font-mono)"
      }
    }, fmt(m.cost)), " ", "\u306E\u30B3\u30B9\u30C8\u304C\u304B\u304B\u3063\u3066\u3044\u307E\u3059\u3002\u3064\u307E\u308A\u4F1A\u793E\u306B", " ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: isLoss ? "var(--cost)" : "var(--profit)",
        fontFamily: "var(--font-mono)"
      }
    }, fmt(m.profit, true)), " ", "\u306E", isLoss ? "損失をもたらしています。" : "利益をもたらしています。")))));
  }
  window.MemberDetailScreen = MemberDetailScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/MemberDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/OverviewScreen.jsx
try { (() => {
// OverviewScreen — KPI row + company contribution flow + top contributors.
(function () {
  const {
    StatCard,
    Card,
    MemberRow,
    Badge
  } = window.Ds0UTL1ERDesignSystem_683794;
  const fmt = window.OUTLIER_FMT;
  function OverviewScreen({
    onSelectMember,
    onViewAll
  }) {
    const D = window.OUTLIER_DATA;
    const ms = D.members;
    const totalRev = ms.reduce((s, m) => s + m.revenue, 0);
    const totalCost = ms.reduce((s, m) => s + m.cost, 0);
    const totalProfit = totalRev - totalCost;
    const margin = (totalProfit / totalRev * 100).toFixed(1);
    const top = [...ms].sort((a, b) => b.profit - a.profit).slice(0, 4);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
        maxWidth: 1180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "\u7DCF\u58F2\u4E0A",
      value: totalRev,
      tone: "revenue",
      delta: 6.2
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u7DCF\u30B3\u30B9\u30C8",
      value: totalCost,
      tone: "cost",
      delta: -2.1
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u7D14\u5229\u76CA",
      value: totalProfit,
      tone: "profit",
      delta: 8.4
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "\u5229\u76CA\u7387",
      value: margin + "%",
      tone: "neutral",
      format: "raw",
      hint: "\u524D\u6708\u6BD4 +1.2pt"
    })), /*#__PURE__*/React.createElement(Card, {
      title: "\u8CA2\u732E\u30D5\u30ED\u30FC",
      subtitle: "\u7DCF\u58F2\u4E0A\u304C\u30B3\u30B9\u30C8\u30FB\u7D14\u5229\u76CA\u306B\u5206\u304B\u308C\u3001\u30E1\u30F3\u30D0\u30FC\u5225\u306B\u5C55\u958B\u3059\u308B\u6D41\u308C",
      action: /*#__PURE__*/React.createElement(Badge, {
        tone: "revenue",
        dot: true
      }, D.period)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 18
      }
    }, /*#__PURE__*/React.createElement(window.SankeyFlow, {
      members: ms,
      height: 420
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "\u5229\u76CA\u8CA2\u732E\u30C8\u30C3\u30D7",
      subtitle: "\u7D14\u5229\u76CA\u306E\u591A\u3044\u9806",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: onViewAll,
        style: linkBtn
      }, "\u3059\u3079\u3066\u898B\u308B \u2192")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: headerRow
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center"
      }
    }, "#"), /*#__PURE__*/React.createElement("span", null, "\u30E1\u30F3\u30D0\u30FC"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u58F2\u4E0A"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u30B3\u30B9\u30C8"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u7D14\u5229\u76CA")), top.map((m, i) => /*#__PURE__*/React.createElement(MemberRow, {
      key: m.id,
      rank: i + 1,
      name: m.name,
      role: m.role,
      revenue: m.revenue,
      cost: m.cost,
      onClick: () => onSelectMember(m.id)
    })))));
  }
  const headerRow = {
    display: "grid",
    gridTemplateColumns: "28px 1fr 130px 130px 150px",
    gap: 16,
    padding: "0 20px 8px",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: 600,
    borderBottom: "1px solid var(--border-default)",
    marginBottom: 4
  };
  const linkBtn = {
    background: "none",
    border: "none",
    color: "var(--accent)",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    fontWeight: 600
  };
  window.OverviewScreen = OverviewScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/OverviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/RankingScreen.jsx
try { (() => {
// RankingScreen — full profit-contribution ranking with sort toggle.
(function () {
  const {
    Card,
    MemberRow,
    Badge,
    Button
  } = window.Ds0UTL1ERDesignSystem_683794;
  const Icon = window.Icon;
  function RankingScreen({
    onSelectMember
  }) {
    const D = window.OUTLIER_DATA;
    const [sortKey, setSortKey] = React.useState("profit");
    const sorted = [...D.members].sort((a, b) => b[sortKey] - a[sortKey]);
    const profitable = D.members.filter(m => m.profit > 0).length;
    const loss = D.members.length - profitable;
    const sortBtn = (key, label) => /*#__PURE__*/React.createElement("button", {
      onClick: () => setSortKey(key),
      style: {
        background: sortKey === key ? "var(--accent-tint)" : "transparent",
        color: sortKey === key ? "var(--blue-300)" : "var(--text-secondary)",
        border: "1px solid " + (sortKey === key ? "var(--accent)" : "var(--border-strong)"),
        borderRadius: "var(--radius-md)",
        padding: "5px 12px",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 600
      }
    }, label);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "profit",
      dot: true
    }, "\u9ED2\u5B57 ", profitable, "\u540D"), /*#__PURE__*/React.createElement(Badge, {
      tone: "cost",
      dot: true
    }, "\u8D64\u5B57 ", loss, "\u540D"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--text-muted)",
        marginRight: 4
      }
    }, "\u4E26\u3073\u66FF\u3048"), sortBtn("profit", "純利益"), sortBtn("revenue", "売上"), sortBtn("margin", "利益率")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: headerRow
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center"
      }
    }, "#"), /*#__PURE__*/React.createElement("span", null, "\u30E1\u30F3\u30D0\u30FC"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u58F2\u4E0A"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u30B3\u30B9\u30C8"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "\u7D14\u5229\u76CA / \u69CB\u6210")), sorted.map((m, i) => /*#__PURE__*/React.createElement(MemberRow, {
      key: m.id,
      rank: i + 1,
      name: m.name,
      role: m.role,
      revenue: m.revenue,
      cost: m.cost,
      onClick: () => onSelectMember(m.id)
    }))));
  }
  const headerRow = {
    display: "grid",
    gridTemplateColumns: "28px 1fr 130px 130px 150px",
    gap: 16,
    padding: "0 20px 10px",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: 600,
    borderBottom: "1px solid var(--border-default)",
    marginBottom: 6
  };
  window.RankingScreen = RankingScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/RankingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/SankeyFlow.jsx
try { (() => {
// SankeyFlow — causal flow, ROOT on the left, granular on the right:
//   総売上 (parent) → コスト / 純利益 → メンバー別の内訳 (leaves)
// Revenue-conserving: every yen of revenue becomes either cost or profit.
// Loss members surface as an all-red member bar (their profit share = 0).
(function () {
  const fmt = window.OUTLIER_FMT;
  function ribbonPath(x0, t0, b0, x1, t1, b1) {
    const cx = (x0 + x1) / 2;
    return `M ${x0} ${t0} C ${cx} ${t0}, ${cx} ${t1}, ${x1} ${t1} L ${x1} ${b1} C ${cx} ${b1}, ${cx} ${b0}, ${x0} ${b0} Z`;
  }
  function SankeyFlow({
    members,
    height = 420
  }) {
    const W = 940,
      H = height,
      padY = 18;
    const usable = H - padY * 2;
    const totalRev = members.reduce((s, m) => s + m.revenue, 0);
    const totalCost = members.reduce((s, m) => s + m.cost, 0);
    const totalProfit = totalRev - totalCost;
    const sumPos = members.reduce((s, m) => s + Math.max(m.profit, 0), 0);

    // Per-member display split, normalized so Σ(red)+Σ(green) === totalRev.
    const rows = members.map(m => {
      const green = sumPos > 0 ? Math.max(m.profit, 0) * (totalProfit / sumPos) : 0;
      const red = m.revenue - green; // loss member → green 0 → red = revenue
      return {
        ...m,
        green,
        red
      };
    }).sort((a, b) => b.profit - a.profit);
    const gap = 9;
    const n = rows.length;
    const scale = (usable - gap * (n - 1)) / totalRev;

    // Columns
    const c0x = 6,
      c0W = 16; // 総売上 (root)
    const c1x = W * 0.40,
      c1W = 16; // コスト / 純利益
    const c2x = W - 168,
      c2W = 13; // member leaves (names to the right)

    // Root node
    const rootH = totalRev * scale;
    const rootY = padY + (usable - rootH) / 2;

    // Middle nodes, centered as a group
    const groupH = totalRev * scale + gap;
    const groupY = padY + (usable - groupH) / 2;
    const costY = groupY,
      costH = totalCost * scale;
    const profitY = groupY + costH + gap,
      profitH = totalProfit * scale;

    // Member nodes
    let my = padY;
    const memberNodes = rows.map(r => {
      const h = r.revenue * scale;
      const node = {
        ...r,
        y: my,
        h,
        redH: r.red * scale,
        greenH: r.green * scale
      };
      my += h + gap;
      return node;
    });

    // 1) root → cost / profit
    const rootCost = ribbonPath(c0x + c0W, rootY, rootY + costH, c1x, costY, costY + costH);
    const rootProfit = ribbonPath(c0x + c0W, rootY + costH, rootY + rootH, c1x, profitY, profitY + profitH);

    // 2) cost → member red segments
    let costOff = costY;
    const costRibbons = memberNodes.map(m => {
      const t0 = costOff,
        b0 = costOff + m.redH;
      costOff = b0;
      return {
        id: m.id,
        d: ribbonPath(c1x + c1W, t0, b0, c2x, m.y, m.y + m.redH)
      };
    });
    // 3) profit → member green segments
    let profOff = profitY;
    const profitRibbons = memberNodes.filter(m => m.greenH > 0.5).map(m => {
      const t0 = profOff,
        b0 = profOff + m.greenH;
      profOff = b0;
      return {
        id: m.id,
        d: ribbonPath(c1x + c1W, t0, b0, c2x, m.y + m.redH, m.y + m.h)
      };
    });
    const nodeLabel = (x, y, anchor, primary, secondary, color) => /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
      x: x,
      y: y,
      textAnchor: anchor,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 600,
        fill: "var(--text-primary)"
      }
    }, primary), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: y + 16,
      textAnchor: anchor,
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 600,
        fill: color
      }
    }, secondary));
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      style: {
        width: "100%",
        height: "auto",
        display: "block",
        overflow: "visible"
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "sk-cost",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "var(--red-600)",
      stopOpacity: "0.22"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "var(--red-500)",
      stopOpacity: "0.40"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "sk-profit",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "var(--green-500)",
      stopOpacity: "0.26"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "var(--green-500)",
      stopOpacity: "0.44"
    }))), /*#__PURE__*/React.createElement("path", {
      d: rootCost,
      fill: "url(#sk-cost)",
      className: "sk-ribbon"
    }), /*#__PURE__*/React.createElement("path", {
      d: rootProfit,
      fill: "url(#sk-profit)",
      className: "sk-ribbon",
      style: {
        animationDelay: "70ms"
      }
    }), costRibbons.map((r, i) => /*#__PURE__*/React.createElement("path", {
      key: "c" + r.id,
      d: r.d,
      fill: "url(#sk-cost)",
      className: "sk-ribbon",
      style: {
        animationDelay: `${160 + i * 45}ms`
      }
    })), profitRibbons.map((r, i) => /*#__PURE__*/React.createElement("path", {
      key: "p" + r.id,
      d: r.d,
      fill: "url(#sk-profit)",
      className: "sk-ribbon",
      style: {
        animationDelay: `${200 + i * 45}ms`
      }
    })), /*#__PURE__*/React.createElement("rect", {
      x: c0x,
      y: rootY,
      width: c0W,
      height: rootH,
      rx: 4,
      fill: "var(--cyan-400)"
    }), nodeLabel(c0x, rootY - 12, "start", "総売上", fmt(totalRev), "var(--revenue)"), /*#__PURE__*/React.createElement("rect", {
      x: c1x,
      y: costY,
      width: c1W,
      height: Math.max(costH, 2),
      rx: 3,
      fill: "var(--cost)"
    }), nodeLabel(c1x + c1W + 8, costY + costH / 2 - 2, "start", "コスト", fmt(totalCost), "var(--cost)"), /*#__PURE__*/React.createElement("rect", {
      x: c1x,
      y: profitY,
      width: c1W,
      height: Math.max(profitH, 2),
      rx: 3,
      fill: "var(--profit)"
    }), nodeLabel(c1x + c1W + 8, profitY + profitH / 2 - 2, "start", "純利益", fmt(totalProfit), "var(--profit)"), memberNodes.map(m => /*#__PURE__*/React.createElement("g", {
      key: m.id
    }, /*#__PURE__*/React.createElement("rect", {
      x: c2x,
      y: m.y,
      width: c2W,
      height: Math.max(m.redH, 1),
      rx: 2,
      fill: "var(--cost)",
      opacity: "0.92"
    }), m.greenH > 0.5 && /*#__PURE__*/React.createElement("rect", {
      x: c2x,
      y: m.y + m.redH,
      width: c2W,
      height: m.greenH,
      rx: 2,
      fill: "var(--profit)"
    }), /*#__PURE__*/React.createElement("text", {
      x: c2x + c2W + 8,
      y: m.y + m.h / 2 - 3,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 11.5,
        fontWeight: 500,
        fill: "var(--text-secondary)"
      }
    }, m.name), /*#__PURE__*/React.createElement("text", {
      x: c2x + c2W + 8,
      y: m.y + m.h / 2 + 11,
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        fontWeight: 600,
        fill: m.profit < 0 ? "var(--cost)" : "var(--profit)"
      }
    }, fmt(m.profit, true)))), /*#__PURE__*/React.createElement("style", null, `
          .sk-ribbon { opacity: 0; animation: skFade var(--dur-flow) var(--ease-out) forwards; }
          @keyframes skFade { from { opacity: 0; } to { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) { .sk-ribbon { animation: none; opacity: 1; } }
        `));
  }
  window.SankeyFlow = SankeyFlow;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/SankeyFlow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/Sidebar.jsx
try { (() => {
// Sidebar — app navigation with the 0UTL1ER wordmark.
(function () {
  const {
    Badge
  } = window.Ds0UTL1ERDesignSystem_683794;
  const Icon = window.Icon;
  function Wordmark() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: 19,
        letterSpacing: "0.02em",
        color: "var(--text-primary)",
        lineHeight: 1
      }
    }, "0", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, "UTL"), "1", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--accent)"
      }
    }, "ER")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        fontWeight: 600
      }
    }, "Insight"));
  }
  function NavItem({
    icon,
    label,
    active,
    badge,
    onClick
  }) {
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: "9px 12px",
        border: "none",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--accent-tint)" : hover ? "var(--surface-2)" : "transparent",
        color: active ? "var(--blue-300)" : hover ? "var(--text-primary)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        textAlign: "left",
        position: "relative",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)"
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: 8,
        bottom: 8,
        width: 3,
        borderRadius: 3,
        background: "var(--accent)"
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), badge && /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      size: "sm"
    }, badge));
  }
  function Sidebar({
    current,
    onNavigate
  }) {
    const D = window.OUTLIER_DATA;
    const nav = [{
      id: "overview",
      icon: "dashboard",
      label: "概要"
    }, {
      id: "sankey",
      icon: "flow",
      label: "貢献フロー"
    }, {
      id: "cash",
      icon: "wallet",
      label: "現金・予測"
    }, {
      id: "ranking",
      icon: "trophy",
      label: "利益ランキング"
    }, {
      id: "members",
      icon: "users",
      label: "メンバー",
      badge: String(D.members.length)
    }];
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: "var(--sidebar-width)",
        flexShrink: 0,
        height: "100%",
        background: "var(--surface-panel)",
        borderRight: "1px solid var(--border-default)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 8px 22px"
      }
    }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, nav.map(n => /*#__PURE__*/React.createElement(NavItem, {
      key: n.id,
      icon: n.icon,
      label: n.label,
      badge: n.badge,
      active: current === n.id,
      onClick: () => onNavigate(n.id)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(NavItem, {
      icon: "sliders",
      label: "\u8A2D\u5B9A",
      active: false,
      onClick: () => {}
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        padding: "12px 12px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-1)",
        border: "1px solid var(--border-default)",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building",
      size: 16,
      style: {
        color: "var(--text-muted)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, D.company), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)"
      }
    }, D.members.length, "\u540D \xB7 ", D.period)))));
  }
  window.Sidebar = Sidebar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/TopBar.jsx
try { (() => {
// TopBar — page title, period selector, search, notifications, user.
(function () {
  const {
    Button,
    Avatar
  } = window.Ds0UTL1ERDesignSystem_683794;
  const Icon = window.Icon;
  function TopBar({
    title,
    subtitle
  }) {
    const D = window.OUTLIER_DATA;
    return /*#__PURE__*/React.createElement("header", {
      style: {
        height: "var(--topbar-height)",
        flexShrink: 0,
        borderBottom: "1px solid var(--border-default)",
        background: "var(--surface-panel)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        marginTop: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, subtitle)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        padding: "0 12px",
        background: "var(--surface-1)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        color: "var(--text-primary)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 15,
      style: {
        color: "var(--text-muted)"
      }
    }), D.period, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 15,
      style: {
        color: "var(--text-muted)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        width: 200,
        padding: "0 12px",
        background: "var(--surface-1)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, "\u30E1\u30F3\u30D0\u30FC\u3092\u691C\u7D22")), /*#__PURE__*/React.createElement("button", {
      style: iconBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 15
      })
    }, "\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        height: 28,
        background: "var(--border-default)",
        margin: "0 2px"
      }
    }), /*#__PURE__*/React.createElement(Avatar, {
      name: "\u9ED2\u7FBD \u665F",
      size: 34,
      ring: "accent"
    })));
  }
  const iconBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-default)",
    background: "var(--surface-1)",
    color: "var(--text-secondary)",
    cursor: "pointer"
  };
  window.TopBar = TopBar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/bi-dashboard/data.js
try { (() => {
// 0UTL1ER Insight — mock data for the UI kit.
// Monthly figures in yen. cost = salary + socialInsurance (+ other).
window.OUTLIER_DATA = {
  period: "2026年6月",
  company: "0UTL1ER株式会社",
  members: [{
    id: "kuroba",
    name: "黒羽 晟",
    role: "代表取締役",
    type: "代表",
    revenue: 800000,
    salary: 300000,
    social: 50000,
    other: 0
  }, {
    id: "yamamoto",
    name: "山本 健",
    role: "エンジニア",
    type: "正社員",
    revenue: 700000,
    salary: 380000,
    social: 50000,
    other: 0
  }, {
    id: "sato",
    name: "佐藤 結衣",
    role: "リードエンジニア",
    type: "正社員",
    revenue: 620000,
    salary: 350000,
    social: 60000,
    other: 0
  }, {
    id: "watanabe",
    name: "渡辺 美咲",
    role: "デザイナー",
    type: "正社員",
    revenue: 480000,
    salary: 310000,
    social: 50000,
    other: 0
  }, {
    id: "alex",
    name: "Alex Kim",
    role: "業務委託",
    type: "業務委託",
    revenue: 450000,
    salary: 300000,
    social: 0,
    other: 0
  }, {
    id: "nakamura",
    name: "中村 彩",
    role: "マーケティング",
    type: "正社員",
    revenue: 390000,
    salary: 290000,
    social: 50000,
    other: 0
  }, {
    id: "tanaka",
    name: "田中 大輔",
    role: "営業",
    type: "正社員",
    revenue: 540000,
    salary: 500000,
    social: 80000,
    other: 0
  }]
};
window.OUTLIER_DATA.members.forEach(m => {
  m.cost = m.salary + m.social + m.other;
  m.profit = m.revenue - m.cost;
  m.margin = m.revenue > 0 ? m.profit / m.revenue : 0;
});

// Cash position & projection.
// 現在の現金残高と、毎月のキャッシュフロー（=純利益）で将来どう増えるか。
// ownerId = 「俺の金」= 代表(黒羽)。equityShare = 現在の現金のうち代表の取り分。
window.OUTLIER_DATA.cash = {
  current: 12400000,
  // 現在の現金残高
  ownerId: "kuroba",
  // 「俺の金」の主
  ownerEquityShare: 0.40,
  // 現在の現金のうち代表の持ち分
  months: 12 // 予測する月数
};
window.OUTLIER_FMT = function (n, sign) {
  const s = sign ? n >= 0 ? "+" : "−" : "";
  return s + "¥" + Math.abs(Math.round(n)).toLocaleString("ja-JP");
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/bi-dashboard/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ContributionBar = __ds_scope.ContributionBar;

__ds_ns.MemberRow = __ds_scope.MemberRow;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
