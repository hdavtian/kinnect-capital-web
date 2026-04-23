import "./OrnamentPickerPage.css";

type OrnamentOption = {
  id: string;
  symbol: string;
  name: string;
  codepoint: string;
};

const ORNAMENT_OPTIONS: OrnamentOption[] = [
  {
    id: "l1",
    symbol: "━━━━━━━━━━",
    name: "Heavy Box Rule",
    codepoint: "U+2501 x10",
  },
  {
    id: "l2",
    symbol: "────────────",
    name: "Light Box Rule",
    codepoint: "U+2500 x12",
  },
  {
    id: "l3",
    symbol: "══════════",
    name: "Double Rule",
    codepoint: "U+2550 x10",
  },
  {
    id: "l4",
    symbol: "┈┈┈┈┈┈┈┈",
    name: "Light Dashed Rule",
    codepoint: "U+2508 x8",
  },
  {
    id: "l5",
    symbol: "┉┉┉┉┉┉┉┉",
    name: "Heavy Dashed Rule",
    codepoint: "U+2509 x8",
  },
  {
    id: "l6",
    symbol: "╌╌╌╌╌╌╌╌",
    name: "Light Dotted Rule",
    codepoint: "U+254C x8",
  },
  {
    id: "l7",
    symbol: "╍╍╍╍╍╍╍╍",
    name: "Heavy Dotted Rule",
    codepoint: "U+254D x8",
  },
  {
    id: "l8",
    symbol: "⎯⎯⎯⎯⎯⎯⎯⎯",
    name: "Overline Rule",
    codepoint: "U+23AF x8",
  },
  {
    id: "l9",
    symbol: "▁▁▁▁▁▁▁▁▁",
    name: "Low Block Rule",
    codepoint: "U+2581 x9",
  },
  {
    id: "l10",
    symbol: "▔▔▔▔▔▔▔▔▔",
    name: "Overline Block Rule",
    codepoint: "U+2594 x9",
  },
  {
    id: "l11",
    symbol: "━━━━━━━━❧━━━━━━━━",
    name: "Floral Bullet Center Rule",
    codepoint: "U+2501 + U+2767",
  },
  {
    id: "l12",
    symbol: "────────❦────────",
    name: "Floral Heart Center Rule",
    codepoint: "U+2500 + U+2766",
  },
  {
    id: "l13",
    symbol: "────────⚜────────",
    name: "Fleur-de-Lis Center Rule",
    codepoint: "U+2500 + U+269C",
  },
  {
    id: "l14",
    symbol: "────────✦────────",
    name: "Star Center Rule",
    codepoint: "U+2500 + U+2726",
  },
  {
    id: "l15",
    symbol: "────────✧────────",
    name: "Outlined Star Center Rule",
    codepoint: "U+2500 + U+2727",
  },
  {
    id: "l16",
    symbol: "────────❈────────",
    name: "Sparkle Center Rule",
    codepoint: "U+2500 + U+2748",
  },
  {
    id: "l17",
    symbol: "────────❋────────",
    name: "Propeller Center Rule",
    codepoint: "U+2500 + U+274B",
  },
  {
    id: "l18",
    symbol: "────────⁂────────",
    name: "Asterism Center Rule",
    codepoint: "U+2500 + U+2042",
  },
  {
    id: "l19",
    symbol: "════════⚜════════",
    name: "Double Fleur Center Rule",
    codepoint: "U+2550 + U+269C",
  },
  {
    id: "l20",
    symbol: "════════❧════════",
    name: "Double Floral Center Rule",
    codepoint: "U+2550 + U+2767",
  },
  {
    id: "l21",
    symbol: "════════✦════════",
    name: "Double Star Center Rule",
    codepoint: "U+2550 + U+2726",
  },
  {
    id: "l22",
    symbol: "❦━━━━━━━━━━━━❦",
    name: "Floral Heart Endcaps",
    codepoint: "U+2766 + U+2501",
  },
  {
    id: "l23",
    symbol: "❧━━━━━━━━━━━━❧",
    name: "Floral Bullet Endcaps",
    codepoint: "U+2767 + U+2501",
  },
  {
    id: "l24",
    symbol: "⚜────────────⚜",
    name: "Fleur Endcaps",
    codepoint: "U+269C + U+2500",
  },
  {
    id: "l25",
    symbol: "✦════════════✦",
    name: "Star Endcaps",
    codepoint: "U+2726 + U+2550",
  },
  {
    id: "l26",
    symbol: "❈════════════❈",
    name: "Sparkle Endcaps",
    codepoint: "U+2748 + U+2550",
  },
  {
    id: "l27",
    symbol: "⁂────────────⁂",
    name: "Asterism Endcaps",
    codepoint: "U+2042 + U+2500",
  },
  {
    id: "l28",
    symbol: "※────────────※",
    name: "Reference Mark Endcaps",
    codepoint: "U+203B + U+2500",
  },
  {
    id: "l29",
    symbol: "§────────────§",
    name: "Section Endcaps",
    codepoint: "U+00A7 + U+2500",
  },
  {
    id: "l30",
    symbol: "¶────────────¶",
    name: "Pilcrow Endcaps",
    codepoint: "U+00B6 + U+2500",
  },
  {
    id: "l31",
    symbol: "••••••••••••",
    name: "Bullet Dot Chain",
    codepoint: "U+2022 x12",
  },
  {
    id: "l32",
    symbol: "◦◦◦◦◦◦◦◦◦◦",
    name: "Open Dot Chain",
    codepoint: "U+25E6 x10",
  },
  {
    id: "l33",
    symbol: "▪▪▪▪▪▪▪▪▪▪",
    name: "Small Square Chain",
    codepoint: "U+25AA x10",
  },
  {
    id: "l34",
    symbol: "◆◆◆◆◆◆◆",
    name: "Black Diamond Chain",
    codepoint: "U+25C6 x7",
  },
  {
    id: "l35",
    symbol: "◇◇◇◇◇◇◇",
    name: "White Diamond Chain",
    codepoint: "U+25C7 x7",
  },
  {
    id: "l36",
    symbol: "◈◈◈◈◈◈",
    name: "Diamond Dot Chain",
    codepoint: "U+25C8 x6",
  },
  {
    id: "l37",
    symbol: "✣✣✣✣✣",
    name: "Balloon Asterisk Chain",
    codepoint: "U+2723 x5",
  },
  {
    id: "l38",
    symbol: "✤✤✤✤✤",
    name: "Heavy Balloon Asterisk Chain",
    codepoint: "U+2724 x5",
  },
  {
    id: "l39",
    symbol: "❀❀❀❀❀",
    name: "Florette Chain",
    codepoint: "U+2740 x5",
  },
  { id: "l40", symbol: "❈❈❈❈❈", name: "Sparkle Chain", codepoint: "U+2748 x5" },
  {
    id: "l41",
    symbol: "⚜⚜⚜⚜⚜",
    name: "Fleur-de-Lis Chain",
    codepoint: "U+269C x5",
  },
  {
    id: "l42",
    symbol: "⚝⚝⚝⚝⚝",
    name: "Outlined Star Chain",
    codepoint: "U+269D x5",
  },
  {
    id: "l43",
    symbol: "✦✧✦✧✦✧",
    name: "Alternating Star Chain",
    codepoint: "U+2726/U+2727",
  },
  {
    id: "l44",
    symbol: "❦❧❦❧❦❧",
    name: "Alternating Floral Chain",
    codepoint: "U+2766/U+2767",
  },
  { id: "l45", symbol: "⁂⁂⁂⁂", name: "Asterism Chain", codepoint: "U+2042 x4" },
  {
    id: "l46",
    symbol: "⁘⁘⁘⁘",
    name: "Four-Dot Punctuation Chain",
    codepoint: "U+2058 x4",
  },
  {
    id: "l47",
    symbol: "⁙⁙⁙⁙",
    name: "Five-Dot Punctuation Chain",
    codepoint: "U+2059 x4",
  },
  {
    id: "l48",
    symbol: "※※※※",
    name: "Reference Mark Chain",
    codepoint: "U+203B x4",
  },
  {
    id: "l49",
    symbol: "§§§§",
    name: "Section Sign Chain",
    codepoint: "U+00A7 x4",
  },
  { id: "l50", symbol: "¶¶¶¶", name: "Pilcrow Chain", codepoint: "U+00B6 x4" },
  {
    id: "l51",
    symbol: "⌘⌘⌘⌘",
    name: "Place of Interest Chain",
    codepoint: "U+2318 x4",
  },
  {
    id: "l52",
    symbol: "❧⎯⎯⎯⎯⎯⎯❧",
    name: "Floral Overline Endcaps",
    codepoint: "U+2767 + U+23AF",
  },
  {
    id: "l53",
    symbol: "⚜⎯⎯⎯⎯⎯⎯⚜",
    name: "Fleur Overline Endcaps",
    codepoint: "U+269C + U+23AF",
  },
  {
    id: "l54",
    symbol: "✦⎯⎯⎯⎯⎯⎯✦",
    name: "Star Overline Endcaps",
    codepoint: "U+2726 + U+23AF",
  },
  {
    id: "l55",
    symbol: "~❦~❦~❦~",
    name: "Tilde Floral Chain",
    codepoint: "U+007E + U+2766",
  },
  {
    id: "l56",
    symbol: "-✦-✦-✦-",
    name: "Hyphen Star Chain",
    codepoint: "U+002D + U+2726",
  },
  {
    id: "l57",
    symbol: ".❧.❧.❧.",
    name: "Period Floral Chain",
    codepoint: "U+002E + U+2767",
  },
  {
    id: "l58",
    symbol: "·❧·❧·❧·",
    name: "Middle Dot Floral Chain",
    codepoint: "U+00B7 + U+2767",
  },
  {
    id: "l59",
    symbol: "⋅⚜⋅⚜⋅⚜⋅",
    name: "Dot Operator Fleur Chain",
    codepoint: "U+22C5 + U+269C",
  },
  {
    id: "l60",
    symbol: "⟡⟡⟡⟡⟡⟡",
    name: "White Diamond Chain",
    codepoint: "U+27E1 x6",
  },
  {
    id: "l61",
    symbol: "◉──────────◉",
    name: "Bullseye Endcaps Rule",
    codepoint: "U+25C9 + U+2500",
  },
  {
    id: "l62",
    symbol: "◍──────────◍",
    name: "Circle Dot Endcaps Rule",
    codepoint: "U+25CD + U+2500",
  },
  {
    id: "l63",
    symbol: "⬦──────────⬦",
    name: "Hexagon Endcaps Rule",
    codepoint: "U+2B26 + U+2500",
  },
  {
    id: "l64",
    symbol: "◈──────────◈",
    name: "Diamond Dot Endcaps Rule",
    codepoint: "U+25C8 + U+2500",
  },
  {
    id: "l65",
    symbol: "✠──────────✠",
    name: "Cross Endcaps Rule",
    codepoint: "U+2720 + U+2500",
  },
  {
    id: "l66",
    symbol: "✜──────────✜",
    name: "Maltese Cross Endcaps Rule",
    codepoint: "U+271C + U+2500",
  },
  {
    id: "l67",
    symbol: "⟐──────────⟐",
    name: "Pointed Diamond Endcaps Rule",
    codepoint: "U+27D0 + U+2500",
  },
  {
    id: "l68",
    symbol: "◊◊◊◊◊◊◊◊",
    name: "Lozenge Chain",
    codepoint: "U+25CA x8",
  },
  {
    id: "l69",
    symbol: "⸻⸻⸻⸻⸻",
    name: "Three-Em Dash Chain",
    codepoint: "U+2E3B x5",
  },
  {
    id: "l70",
    symbol: "⸺⸺⸺⸺⸺",
    name: "Two-Em Dash Chain",
    codepoint: "U+2E3A x5",
  },
  {
    id: "l71",
    symbol: "﹏﹏﹏﹏﹏﹏﹏",
    name: "Wavy Low Rule",
    codepoint: "U+FE4F x7",
  },
  {
    id: "l72",
    symbol: "﹋﹋﹋﹋﹋﹋﹋",
    name: "Wavy Overline Rule",
    codepoint: "U+FE4B x7",
  },
  {
    id: "l73",
    symbol: "〰〰〰〰〰〰",
    name: "Wavy Dash Rule",
    codepoint: "U+3030 x6",
  },
  {
    id: "l74",
    symbol: "～❦～❦～❦～",
    name: "Fullwidth Tilde Floral Chain",
    codepoint: "U+FF5E + U+2766",
  },
  {
    id: "l75",
    symbol: "〜❧〜❧〜❧〜",
    name: "Wave Dash Floral Chain",
    codepoint: "U+301C + U+2767",
  },
  {
    id: "l76",
    symbol: "﹏❦﹏❦﹏",
    name: "Low Wave Floral Chain",
    codepoint: "U+FE4F + U+2766",
  },
  {
    id: "l77",
    symbol: "﹋❧﹋❧﹋",
    name: "Over Wave Floral Chain",
    codepoint: "U+FE4B + U+2767",
  },
  {
    id: "l78",
    symbol: "⌇⌇⌇⌇⌇⌇⌇",
    name: "Wavy Vertical Chain",
    codepoint: "U+2307 x7",
  },
  {
    id: "l79",
    symbol: "◜────────◝",
    name: "Curved Cap Rule",
    codepoint: "U+25DC/U+25DD + U+2500",
  },
  {
    id: "l80",
    symbol: "◟────────◞",
    name: "Curved Base Rule",
    codepoint: "U+25DF/U+25DE + U+2500",
  },
  {
    id: "l81",
    symbol: "❨────────❩",
    name: "Curved Parenthesis Rule",
    codepoint: "U+2768/U+2769 + U+2500",
  },
  {
    id: "l82",
    symbol: "❪────────❫",
    name: "Medium Parenthesis Rule",
    codepoint: "U+276A/U+276B + U+2500",
  },
  {
    id: "l83",
    symbol: "❬────────❭",
    name: "Angle Bracket Rule",
    codepoint: "U+276C/U+276D + U+2500",
  },
  {
    id: "l84",
    symbol: "⟅────────⟆",
    name: "Math Curly Bracket Rule",
    codepoint: "U+27C5/U+27C6 + U+2500",
  },
  {
    id: "l85",
    symbol: "⸨────────⸩",
    name: "Double Parenthesis Rule",
    codepoint: "U+2E28/U+2E29 + U+2500",
  },
  {
    id: "l86",
    symbol: "༺────────༻",
    name: "Tibetan Ornament Endcaps",
    codepoint: "U+0F3A/U+0F3B + U+2500",
  },
  {
    id: "l87",
    symbol: "༼────────༽",
    name: "Tibetan Bracket Endcaps",
    codepoint: "U+0F3C/U+0F3D + U+2500",
  },
  {
    id: "l88",
    symbol: "۞────────۞",
    name: "Arabic Star Endcaps",
    codepoint: "U+06DE + U+2500",
  },
  {
    id: "l89",
    symbol: "۩────────۩",
    name: "Arabic Place Endcaps",
    codepoint: "U+06E9 + U+2500",
  },
  {
    id: "l90",
    symbol: "⚘────────⚘",
    name: "Flower Endcaps",
    codepoint: "U+2698 + U+2500",
  },
  {
    id: "l91",
    symbol: "⚚────────⚚",
    name: "Staff Endcaps",
    codepoint: "U+269A + U+2500",
  },
  {
    id: "l92",
    symbol: "✢────────✢",
    name: "Asterisk Endcaps",
    codepoint: "U+2722 + U+2500",
  },
  {
    id: "l93",
    symbol: "✥────────✥",
    name: "Balloon Endcaps",
    codepoint: "U+2725 + U+2500",
  },
  {
    id: "l94",
    symbol: "❀────────❀",
    name: "Florette Endcaps",
    codepoint: "U+2740 + U+2500",
  },
  {
    id: "l95",
    symbol: "❁────────❁",
    name: "Outlined Florette Endcaps",
    codepoint: "U+2741 + U+2500",
  },
  {
    id: "l96",
    symbol: "❂────────❂",
    name: "Circled Star Endcaps",
    codepoint: "U+2742 + U+2500",
  },
  {
    id: "l97",
    symbol: "❃────────❃",
    name: "Spoked Endcaps",
    codepoint: "U+2743 + U+2500",
  },
  {
    id: "l98",
    symbol: "❄────────❄",
    name: "Snowflake Endcaps",
    codepoint: "U+2744 + U+2500",
  },
  {
    id: "l99",
    symbol: "❇────────❇",
    name: "Sparkle Endcaps",
    codepoint: "U+2747 + U+2500",
  },
  {
    id: "l100",
    symbol: "❈────────❈",
    name: "Heavy Sparkle Endcaps",
    codepoint: "U+2748 + U+2500",
  },
  {
    id: "l101",
    symbol: "❉────────❉",
    name: "Florette Asterisk Endcaps",
    codepoint: "U+2749 + U+2500",
  },
  {
    id: "l102",
    symbol: "❊────────❊",
    name: "Propeller Endcaps",
    codepoint: "U+274A + U+2500",
  },
  {
    id: "l103",
    symbol: "❋────────❋",
    name: "Heavy Propeller Endcaps",
    codepoint: "U+274B + U+2500",
  },
  {
    id: "l104",
    symbol: "✶────────✶",
    name: "Six-Point Endcaps",
    codepoint: "U+2736 + U+2500",
  },
  {
    id: "l105",
    symbol: "✷────────✷",
    name: "Rectilinear Star Endcaps",
    codepoint: "U+2737 + U+2500",
  },
  {
    id: "l106",
    symbol: "✸────────✸",
    name: "Heavy Rectilinear Endcaps",
    codepoint: "U+2738 + U+2500",
  },
  {
    id: "l107",
    symbol: "✹────────✹",
    name: "Twelve-Point Endcaps",
    codepoint: "U+2739 + U+2500",
  },
  {
    id: "l108",
    symbol: "✺────────✺",
    name: "Sixteen-Point Endcaps",
    codepoint: "U+273A + U+2500",
  },
  {
    id: "l109",
    symbol: "✻────────✻",
    name: "Teardrop Endcaps",
    codepoint: "U+273B + U+2500",
  },
  {
    id: "l110",
    symbol: "✼────────✼",
    name: "Open Teardrop Endcaps",
    codepoint: "U+273C + U+2500",
  },
  {
    id: "l111",
    symbol: "✽────────✽",
    name: "Heavy Teardrop Endcaps",
    codepoint: "U+273D + U+2500",
  },
  {
    id: "l112",
    symbol: "✾────────✾",
    name: "Petalled Endcaps",
    codepoint: "U+273E + U+2500",
  },
  {
    id: "l113",
    symbol: "⟐────────⟐",
    name: "White Diamond Endcaps",
    codepoint: "U+27D0 + U+2500",
  },
  {
    id: "l114",
    symbol: "⟡────────⟡",
    name: "Large White Diamond Endcaps",
    codepoint: "U+27E1 + U+2500",
  },
  {
    id: "l115",
    symbol: "☙────────☙",
    name: "Reversed Floral Bullet Endcaps",
    codepoint: "U+2619 + U+2500",
  },
  {
    id: "l116",
    symbol: "⚜❦⚜❦⚜❦",
    name: "Fleur Floral Chain",
    codepoint: "U+269C/U+2766",
  },
  {
    id: "l117",
    symbol: "✦❧✦❧✦❧",
    name: "Star Floral Chain",
    codepoint: "U+2726/U+2767",
  },
  {
    id: "l118",
    symbol: "❦❈❦❈❦❈",
    name: "Floral Sparkle Chain",
    codepoint: "U+2766/U+2748",
  },
  {
    id: "l119",
    symbol: "⚜⁂⚜⁂⚜⁂",
    name: "Fleur Asterism Chain",
    codepoint: "U+269C/U+2042",
  },
  {
    id: "l120",
    symbol: "§⁘§⁘§⁘",
    name: "Section Dot Chain",
    codepoint: "U+00A7/U+2058",
  },
];

function OrnamentPickerPage() {
  return (
    <section className="ornament-picker-page">
      <header className="ornament-picker-header">
        <h1>Ornament Picker</h1>
        <p>
          Horizontal divider style options. Each row shows a long preview, a
          label, and the character recipe. If you see empty boxes for a row,
          that symbol is missing in your local font.
        </p>
      </header>

      <ul className="ornament-picker-list">
        {ORNAMENT_OPTIONS.map((option) => (
          <li key={option.id} className="ornament-picker-row">
            <div className="ornament-picker-symbol" aria-hidden="true">
              {option.symbol}
            </div>
            <div className="ornament-picker-meta">
              <p className="ornament-picker-name">{option.name}</p>
              <p className="ornament-picker-char">
                {option.symbol} | {option.codepoint}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OrnamentPickerPage;
