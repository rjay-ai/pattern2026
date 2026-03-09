import { useState, useRef, useCallback } from "react";

/* ─── FONTS ─────────────────────────────────────────────────── */
const G = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap');`;

/* ─── CSS ────────────────────────────────────────────────────── */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a12; --s2:#13141f; --card:#16182a; --card2:#1c1e32;
  --b1:rgba(255,255,255,0.1); --b2:rgba(255,255,255,0.18);
  --gold:#f0c050; --gold2:#fad878; --goldl:rgba(240,192,80,0.15);
  --violet:#8b6fff; --violet2:#b8a0ff; --violetl:rgba(139,111,255,0.15);
  --rose:#f95c82; --rosel:rgba(249,92,130,0.15);
  --teal:#34d9c3; --teall:rgba(52,217,195,0.15);
  --blue:#60a5fa; --bluel:rgba(96,165,250,0.15);
  --white:#fff; --off:#e8eaf0; --dim:#9da5b4; --dim2:#6e7585;
  --fs:'Syne',sans-serif; --fb:'DM Sans',sans-serif; --fm:'DM Mono',monospace;
}
html{background:var(--bg);scroll-behavior:smooth}
body{background:var(--bg);color:var(--off);font-family:var(--fb);font-size:16px;min-height:100vh;overflow-x:hidden}

/* mesh */
.mesh{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.mesh::before{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(139,111,255,0.1) 0%,transparent 65%);top:-200px;left:-200px;animation:d1 18s ease-in-out infinite}
.mesh::after{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(240,192,80,0.07) 0%,transparent 65%);bottom:-100px;right:-100px;animation:d2 22s ease-in-out infinite}
@keyframes d1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}
@keyframes d2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,-30px)}}
.grid-ov{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);background-size:60px 60px}

.wrap{position:relative;z-index:1;max-width:740px;margin:0 auto;padding:0 1.2rem 6rem}

/* nav */
.nav{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 0;border-bottom:1px solid var(--b1)}
.nav-logo{font-family:var(--fs);font-size:0.88rem;font-weight:700;letter-spacing:0.12em;color:var(--white);text-transform:uppercase;display:flex;align-items:center;gap:0.5rem}
.nav-logo em{color:var(--gold);font-style:normal}
.nav-pill{background:rgba(255,255,255,0.06);border:1px solid var(--b2);border-radius:999px;padding:0.32rem 0.85rem;font-size:0.7rem;font-family:var(--fm);color:var(--dim);letter-spacing:0.06em}

/* hero */
.hero{padding:4rem 0 2.5rem;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:var(--violetl);border:1px solid rgba(139,111,255,0.35);border-radius:999px;padding:0.38rem 1rem;font-size:0.74rem;font-family:var(--fm);color:var(--violet2);letter-spacing:0.08em;margin-bottom:1.8rem}
.hero-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--violet2);animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
.hero h1{font-family:var(--fs);font-size:clamp(2.6rem,7vw,4.6rem);font-weight:800;line-height:1.05;letter-spacing:-0.03em;margin-bottom:1.1rem}
.hero h1 .l1{display:block;color:var(--white)}
.hero h1 .l2{display:block;background:linear-gradient(135deg,var(--gold),var(--violet2),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1rem;color:var(--dim);max-width:440px;margin:0 auto;line-height:1.65}

/* step bar */
.sbar{display:flex;align-items:center;justify-content:center;gap:0;margin:2.2rem 0 1.8rem}
.sdot{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:0.7rem;border:1px solid var(--b2);color:var(--dim2);background:var(--s2);transition:all 0.3s;flex-shrink:0}
.sdot.act{background:linear-gradient(135deg,var(--violet),var(--gold));border-color:transparent;color:#fff;box-shadow:0 0 18px rgba(139,111,255,0.4)}
.sdot.done{background:var(--teall);border-color:rgba(52,217,195,0.4);color:var(--teal)}
.sline{width:36px;height:1px;background:var(--b1);margin:0 3px}
.sline.done{background:linear-gradient(90deg,var(--teal),var(--violet))}

/* section label */
.slbl{font-family:var(--fs);font-size:0.7rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--dim);margin-bottom:1.1rem}

/* lens cards */
.tgrid{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
@media(max-width:500px){.tgrid{grid-template-columns:1fr}}
.tcard{position:relative;background:var(--card);border:1px solid var(--b1);border-radius:14px;padding:1.3rem;cursor:pointer;transition:all 0.22s ease;overflow:hidden}
.tcard::before{content:'';position:absolute;inset:0;border-radius:14px;background:linear-gradient(135deg,var(--violetl),transparent);opacity:0;transition:opacity 0.22s}
.tcard:hover{border-color:var(--b2);transform:translateY(-2px);background:var(--card2)}
.tcard:hover::before{opacity:1}
.tcard.sel{border-color:rgba(139,111,255,0.55);background:#1a1c30;box-shadow:0 0 28px rgba(139,111,255,0.14)}
.tcard.sel::before{opacity:1}
.tick{position:absolute;top:0.85rem;right:0.85rem;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,var(--violet),var(--violet2));display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#fff;opacity:0;transition:opacity 0.2s;z-index:2}
.tcard.sel .tick{opacity:1}
.tico{font-size:1.3rem;margin-bottom:0.7rem;display:block;color:var(--violet2);font-family:var(--fm);position:relative;z-index:1}
.tname{font-family:var(--fs);font-size:0.88rem;font-weight:700;color:var(--white);position:relative;z-index:1}
.tdesc{font-size:0.82rem;color:var(--dim);margin-top:0.35rem;line-height:1.5;position:relative;z-index:1}
.ttag{font-family:var(--fm);font-size:0.7rem;color:var(--teal);margin-top:0.55rem;position:relative;z-index:1}
.tcard.sel .ttag{color:var(--violet2)}

/* form */
.fsec{background:var(--card);border:1px solid var(--b1);border-radius:18px;padding:1.8rem;margin:1rem 0}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
@media(max-width:500px){.frow{grid-template-columns:1fr}}
.field{margin-bottom:0.9rem}
.field:last-child{margin-bottom:0}
.field label{display:block;font-family:var(--fm);font-size:0.7rem;letter-spacing:0.1em;color:var(--dim);text-transform:uppercase;margin-bottom:0.42rem}
.field input,.field select,.field textarea{width:100%;background:rgba(255,255,255,0.055);border:1px solid var(--b1);border-radius:9px;padding:0.72rem 0.9rem;color:var(--white);font-family:var(--fb);font-size:0.94rem;transition:all 0.2s;-webkit-appearance:none;appearance:none}
.field select option{background:#1c1e32;color:var(--white)}
.field textarea{resize:vertical;min-height:72px;line-height:1.5}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:rgba(139,111,255,0.55);background:rgba(139,111,255,0.07);box-shadow:0 0 0 3px rgba(139,111,255,0.1)}
.field input::placeholder,.field textarea::placeholder{color:var(--dim2)}
.fnote{font-size:0.72rem;color:var(--dim2);margin-top:0.3rem;font-style:italic}
input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.6)}
.fsec-title{font-family:var(--fs);font-size:0.78rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--violet2);margin-bottom:1.1rem;padding-bottom:0.7rem;border-bottom:1px solid var(--b1)}

/* context chips */
.chips{display:flex;flex-wrap:wrap;gap:0.45rem;margin-top:0.45rem}
.chip{padding:0.3rem 0.75rem;border-radius:999px;font-size:0.78rem;font-family:var(--fb);border:1px solid var(--b1);background:rgba(255,255,255,0.04);color:var(--dim);cursor:pointer;transition:all 0.18s}
.chip:hover{border-color:var(--b2);color:var(--white)}
.chip.on{background:var(--violetl);border-color:rgba(139,111,255,0.5);color:var(--violet2)}

/* buttons */
.btn{width:100%;padding:0.95rem 1.4rem;border:none;border-radius:11px;font-family:var(--fs);font-size:0.86rem;font-weight:700;letter-spacing:0.08em;cursor:pointer;transition:all 0.22s;text-transform:uppercase;position:relative;overflow:hidden}
.btn::after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,0.07),transparent);pointer-events:none}
.btn-p{background:linear-gradient(135deg,#6d3fe0,#e8b84b);color:#fff;box-shadow:0 8px 28px rgba(109,63,224,0.32)}
.btn-p:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 36px rgba(109,63,224,0.42)}
.btn-p:disabled{opacity:0.32;cursor:not-allowed;transform:none}
.btn-g{background:var(--card);border:1px solid var(--b1);color:var(--dim);margin-top:1.2rem}
.btn-g:hover{border-color:var(--b2);color:var(--white);background:var(--card2)}
.btn-sm{background:none;border:1px solid var(--b1);border-radius:8px;color:var(--dim);padding:0.38rem 0.78rem;font-size:0.78rem;font-family:var(--fb);cursor:pointer;transition:all 0.18s;display:inline-flex;align-items:center;gap:0.35rem}
.btn-sm:hover{border-color:var(--b2);color:var(--white)}

/* loading */
.lw{text-align:center;padding:5rem 1rem}
.lorb-w{position:relative;width:96px;height:96px;margin:0 auto 2.2rem}
.lorb{width:96px;height:96px;border-radius:50%;background:conic-gradient(from 0deg,var(--violet),var(--gold),var(--rose),var(--teal),var(--violet));animation:spin 3s linear infinite}
.lorb::after{content:'';position:absolute;inset:4px;border-radius:50%;background:var(--bg)}
.lorb-in{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.8rem;animation:cspin 3s linear infinite;color:var(--white)}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes cspin{to{transform:rotate(-360deg)}}
.lw-t{font-family:var(--fs);font-size:1.05rem;font-weight:700;color:var(--white)}
.lw-s{font-size:0.82rem;color:var(--dim);margin-top:0.35rem;font-family:var(--fm)}
.lsteps{margin-top:2.2rem;display:flex;flex-direction:column;gap:0.45rem;max-width:280px;margin-left:auto;margin-right:auto}
.lstep{display:flex;align-items:center;gap:0.65rem;padding:0.5rem 0.85rem;border-radius:8px;font-family:var(--fm);font-size:0.74rem;color:var(--dim2);transition:all 0.4s}
.lstep.act{color:var(--white);background:rgba(255,255,255,0.06);border:1px solid var(--b1)}
.lstep.done{color:var(--teal)}
.ldot{width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0}
.lstep.act .ldot{animation:blink 1s ease-in-out infinite}

/* ── TAB NAV (result page) */
.tabs{display:flex;gap:0.25rem;background:var(--card);border:1px solid var(--b1);border-radius:12px;padding:0.28rem;margin:1.4rem 0;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:1;min-width:0;padding:0.55rem 0.4rem;border:none;border-radius:9px;font-family:var(--fs);font-size:0.68rem;font-weight:600;letter-spacing:0.04em;cursor:pointer;transition:all 0.2s;background:transparent;color:var(--dim);text-transform:uppercase;white-space:nowrap}
.tab.on{background:linear-gradient(135deg,var(--violet),#5a2fb0);color:#fff;box-shadow:0 2px 12px rgba(139,111,255,0.3)}

/* result header */
.rhdr{padding:2rem 0 0}
.rhdr-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:0.4rem}
.rname{font-family:var(--fs);font-size:1.4rem;font-weight:800;letter-spacing:-0.02em;color:var(--white)}
.rmeta{font-family:var(--fm);font-size:0.7rem;color:var(--dim);margin-top:0.25rem;letter-spacing:0.06em}
.qbadge{display:inline-flex;align-items:center;gap:0.35rem;background:var(--teall);border:1px solid rgba(52,217,195,0.35);border-radius:999px;padding:0.28rem 0.75rem;font-size:0.68rem;font-family:var(--fm);color:var(--teal);white-space:nowrap}

/* TODAY SCORE card */
.today-card{background:linear-gradient(135deg,rgba(139,111,255,0.12),rgba(96,165,250,0.08));border:1px solid rgba(139,111,255,0.25);border-radius:16px;padding:1.4rem;margin:1.2rem 0;position:relative;overflow:hidden}
.today-card::before{content:'';position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(139,111,255,0.2),transparent);pointer-events:none}
.today-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:1rem}
.today-label{font-family:var(--fs);font-size:0.7rem;font-weight:600;letter-spacing:0.16em;color:var(--violet2);text-transform:uppercase;margin-bottom:0.3rem}
.today-date{font-family:var(--fm);font-size:0.72rem;color:var(--dim)}
.score-ring-wrap{position:relative;width:80px;height:80px;flex-shrink:0}
.score-ring{width:80px;height:80px;transform:rotate(-90deg)}
.score-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--fs);font-size:1.4rem;font-weight:800;color:var(--white)}
.today-text{font-size:0.92rem;color:var(--off);line-height:1.7}
.today-tags{display:flex;gap:0.45rem;flex-wrap:wrap;margin-top:0.8rem}
.today-tag{font-family:var(--fm);font-size:0.7rem;padding:0.25rem 0.65rem;border-radius:999px;border:1px solid}

/* world box */
.wbox{background:linear-gradient(135deg,rgba(139,111,255,0.09),rgba(240,192,80,0.06));border:1px solid rgba(139,111,255,0.22);border-radius:14px;padding:1.35rem;margin:1.2rem 0}
.wtitle{font-family:var(--fs);font-size:0.7rem;font-weight:600;letter-spacing:0.16em;color:var(--violet2);text-transform:uppercase;margin-bottom:0.75rem}
.wbox p{font-size:0.94rem;line-height:1.78;color:var(--off)}

/* life cards */
.cgrid{display:grid;gap:0.9rem;margin:0.5rem 0}
.lcard{background:var(--card);border:1px solid var(--b1);border-radius:18px;overflow:hidden;transition:all 0.28s;animation:fadeUp 0.48s ease both}
.lcard:hover{border-color:var(--b2);background:var(--card2);transform:translateY(-2px);box-shadow:0 18px 50px rgba(0,0,0,0.45)}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.lcard:nth-child(1){animation-delay:.07s}.lcard:nth-child(2){animation-delay:.14s}.lcard:nth-child(3){animation-delay:.21s}.lcard:nth-child(4){animation-delay:.28s}
.ch{padding:1.2rem 1.4rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.ch-l{display:flex;align-items:center;gap:0.85rem}
.ch-ico{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.ic-health{background:var(--rosel);border:1px solid rgba(249,92,130,0.28)}
.ic-wealth{background:var(--goldl);border:1px solid rgba(240,192,80,0.28)}
.ic-work{background:var(--violetl);border:1px solid rgba(139,111,255,0.28)}
.ic-family{background:var(--teall);border:1px solid rgba(52,217,195,0.28)}
.ch-title{font-family:var(--fs);font-size:0.9rem;font-weight:700;color:var(--white)}
.ch-vibe{font-size:0.76rem;color:var(--dim);margin-top:0.1rem;font-family:var(--fm)}
.srow{display:flex;gap:3px}
.s{font-size:0.82rem;color:var(--dim2)}
.sf{color:var(--gold)}
.cb{padding:0 1.4rem 1.4rem}
.cdi{height:1px;background:var(--b1);margin-bottom:1.2rem}
.csum{font-size:1.05rem;font-style:italic;font-weight:400;color:var(--white);line-height:1.58;margin-bottom:1.2rem;padding-left:0.85rem;border-left:2px solid}
.csum-health{border-color:var(--rose)}.csum-wealth{border-color:var(--gold)}.csum-work{border-color:var(--violet)}.csum-family{border-color:var(--teal)}
.tags-row{display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.1rem}
.tag{font-family:var(--fm);font-size:0.68rem;letter-spacing:0.05em;padding:0.25rem 0.65rem;border-radius:999px}
.tag-g{background:var(--goldl);color:var(--gold2);border:1px solid rgba(240,192,80,0.28)}
.tag-r{background:var(--rosel);color:#ff8fa8;border:1px solid rgba(249,92,130,0.28)}
.cblk{margin-bottom:1rem}
.cblbl{font-family:var(--fm);font-size:0.68rem;letter-spacing:0.12em;color:var(--dim);text-transform:uppercase;margin-bottom:0.42rem}
.cbtxt{font-size:0.93rem;color:var(--off);line-height:1.72}
.pmove{background:linear-gradient(135deg,rgba(109,63,224,0.11),rgba(232,184,75,0.07));border:1px solid rgba(139,111,255,0.22);border-radius:11px;padding:0.95rem 1rem;margin-top:0.4rem}
.pml{font-family:var(--fs);font-size:0.66rem;font-weight:700;letter-spacing:0.14em;color:var(--violet2);text-transform:uppercase;margin-bottom:0.35rem}
.pmove p{font-size:0.93rem;color:var(--white);line-height:1.62}

/* MONTH CALENDAR */
.cal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin:0.5rem 0}
@media(max-width:400px){.cal-grid{grid-template-columns:repeat(2,1fr)}}
.cal-month{background:var(--card);border:1px solid var(--b1);border-radius:11px;padding:0.8rem 0.7rem;text-align:center;cursor:pointer;transition:all 0.2s;position:relative}
.cal-month:hover{border-color:var(--b2)}
.cal-month.best{border-color:rgba(52,217,195,0.45);background:var(--teall)}
.cal-month.careful{border-color:rgba(249,92,130,0.35);background:var(--rosel)}
.cal-month.selected{box-shadow:0 0 0 2px var(--violet2)}
.cm-name{font-family:var(--fs);font-size:0.8rem;font-weight:700;color:var(--white)}
.cm-dot{display:flex;justify-content:center;gap:3px;margin-top:0.35rem}
.cm-d{width:5px;height:5px;border-radius:50%}
.cm-score{font-family:var(--fm);font-size:0.7rem;margin-top:0.3rem}
.month-detail{background:var(--card2);border:1px solid var(--b1);border-radius:12px;padding:1.1rem;margin-top:0.6rem;animation:fadeUp 0.2s ease}
.md-title{font-family:var(--fs);font-size:0.82rem;font-weight:700;color:var(--white);margin-bottom:0.5rem}
.md-text{font-size:0.88rem;color:var(--off);line-height:1.68}

/* DECISION TOOL */
.decision-box{background:var(--card);border:1px solid var(--b1);border-radius:16px;padding:1.5rem;margin:1rem 0}
.dec-result{background:linear-gradient(135deg,rgba(240,192,80,0.1),rgba(139,111,255,0.08));border:1px solid rgba(240,192,80,0.2);border-radius:12px;padding:1.1rem;margin-top:1rem;animation:fadeUp 0.3s ease}
.dec-winner{font-family:var(--fs);font-size:0.75rem;font-weight:700;letter-spacing:0.1em;color:var(--gold);text-transform:uppercase;margin-bottom:0.4rem}
.dec-text{font-size:0.92rem;color:var(--off);line-height:1.7}

/* CHAT */
.chat-wrap{display:flex;flex-direction:column;gap:0;margin:0.5rem 0}
.chat-msgs{display:flex;flex-direction:column;gap:0.7rem;max-height:380px;overflow-y:auto;padding:0.2rem 0 1rem;scrollbar-width:thin;scrollbar-color:var(--b2) transparent}
.msg{max-width:88%;animation:fadeUp 0.25s ease}
.msg-u{align-self:flex-end;background:linear-gradient(135deg,var(--violet),#5a2fb0);color:#fff;border-radius:14px 14px 4px 14px;padding:0.7rem 1rem;font-size:0.9rem;line-height:1.55}
.msg-a{align-self:flex-start;background:var(--card2);border:1px solid var(--b1);color:var(--off);border-radius:4px 14px 14px 14px;padding:0.7rem 1rem;font-size:0.9rem;line-height:1.6}
.msg-a.typing{color:var(--dim)}
.chat-input-row{display:flex;gap:0.5rem;margin-top:0.8rem}
.chat-input{flex:1;background:rgba(255,255,255,0.055);border:1px solid var(--b1);border-radius:10px;padding:0.7rem 0.9rem;color:var(--white);font-family:var(--fb);font-size:0.92rem;transition:border-color 0.2s}
.chat-input:focus{outline:none;border-color:rgba(139,111,255,0.55);box-shadow:0 0 0 3px rgba(139,111,255,0.1)}
.chat-input::placeholder{color:var(--dim2)}
.chat-send{background:linear-gradient(135deg,var(--violet),#5a2fb0);border:none;border-radius:10px;padding:0.7rem 1.1rem;color:#fff;font-family:var(--fs);font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.2s;white-space:nowrap}
.chat-send:hover:not(:disabled){transform:translateY(-1px)}
.chat-send:disabled{opacity:0.4;cursor:not-allowed}
.chat-hint{font-family:var(--fm);font-size:0.7rem;color:var(--dim2);margin-top:0.5rem}
.chat-starters{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.8rem}
.starter{background:rgba(255,255,255,0.04);border:1px solid var(--b1);border-radius:999px;padding:0.3rem 0.75rem;font-size:0.78rem;color:var(--dim);cursor:pointer;transition:all 0.18s;font-family:var(--fb)}
.starter:hover{border-color:var(--violet2);color:var(--violet2)}

/* share/save bar */
.share-bar{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem}
.share-btn{display:inline-flex;align-items:center;gap:0.4rem;background:var(--card);border:1px solid var(--b1);border-radius:9px;padding:0.5rem 0.9rem;font-size:0.78rem;font-family:var(--fb);color:var(--dim);cursor:pointer;transition:all 0.18s}
.share-btn:hover{border-color:var(--b2);color:var(--white)}

/* dividers & footer */
.dline{height:1px;background:linear-gradient(90deg,transparent,var(--b2),transparent);margin:1.8rem 0}
.rfooter{text-align:center;color:var(--dim2);font-size:0.8rem;line-height:1.8;font-style:italic}

/* error */
.err{background:var(--rosel);border:1px solid rgba(249,92,130,0.28);border-radius:11px;padding:1.2rem;text-align:center;color:#ff8fa8;font-size:0.92rem;line-height:1.58}
`;

/* ─── DATA ───────────────────────────────────────────────────── */
const LENSES = [
  { id:"vedic", icon:"◉", name:"Vedic (Jyotish)", desc:"Maps planetary cycles to personal timing — no religious practice required.", tag:"→ Timing & life phases" },
  { id:"kerala", icon:"◎", name:"Kerala System",  desc:"Precise South Indian tradition — focused on your lunar position at birth.", tag:"→ Specific life questions" },
  { id:"numerology", icon:"⊞", name:"Numerology", desc:"Your name + birth date as a mathematical map of the year.", tag:"→ Identity & purpose" },
  { id:"blend", icon:"⊕", name:"All Three Lenses", desc:"Where all systems converge. Most well-rounded view.", tag:"→ The full picture" },
];

const AREAS = [
  { key:"health", icon:"🩺", label:"Health & Energy",    color:"health" },
  { key:"wealth", icon:"◈",  label:"Wealth & Finances",  color:"wealth" },
  { key:"work",   icon:"◎",  label:"Work & Career",      color:"work"   },
  { key:"family", icon:"◇",  label:"Family & Bonds",     color:"family" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const LOAD_STEPS = [
  "Mapping planetary cycles to your birth data",
  "Analysing current location context",
  "Building your year-ahead outlook",
  "Running quality review",
  "Finalising your report",
];

const CHAT_STARTERS = [
  "Is March good for a big decision?",
  "When should I launch my side project?",
  "What does the work outlook mean practically?",
  "How can I make the most of my best months?",
];

/* ─── HELPERS ────────────────────────────────────────────────── */
const callClaude = async (messages, maxTokens = 1000) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTokens, messages }),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `API ${res.status}`);
  }
  const d = await res.json();
  return d.content?.find(b => b.type === "text")?.text || "";
};

const safeParseJSON = (text) => {
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); }
  catch { return null; }
};

const getTodayStr = () => {
  const d = new Date();
  return d.toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
};

/* ─── SUB-COMPONENTS ─────────────────────────────────────────── */
function StepBar({ idx, total = 4 }) {
  const labels = ["Lens","Details","Context","Your 2026"];
  return (
    <div className="sbar">
      {labels.slice(0, total).map((l, i) => (
        <div key={l} style={{ display:"flex", alignItems:"center" }}>
          <div className={`sdot ${i === idx ? "act" : i < idx ? "done" : ""}`} title={l}>
            {i < idx ? "✓" : i + 1}
          </div>
          {i < total - 1 && <div className={`sline ${i < idx ? "done" : ""}`} />}
        </div>
      ))}
    </div>
  );
}

function Stars({ n, max = 5 }) {
  return <div className="srow">{Array.from({ length: max }).map((_, i) => <span key={i} className={`s ${i < n ? "sf" : ""}`}>★</span>)}</div>;
}

function ScoreRing({ score }) {
  const r = 34, c = 2 * Math.PI * r;
  const fill = (score / 10) * c;
  const color = score >= 7 ? "#34d9c3" : score >= 5 ? "#f0c050" : "#f95c82";
  return (
    <div className="score-ring-wrap">
      <svg className="score-ring" width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${fill} ${c}`} strokeLinecap="round" />
      </svg>
      <div className="score-num" style={{ color }}>{score}</div>
    </div>
  );
}

function MonthCalendar({ reading }) {
  const [selected, setSelected] = useState(null);

  const getMonthData = (m) => {
    const best = [], careful = [];
    AREAS.forEach(a => {
      const d = reading[a.key];
      if (!d) return;
      const norm = s => s.trim().slice(0, 3).toLowerCase();
      const target = m.slice(0, 3).toLowerCase();
      (d.bestMonths || "").split(",").forEach(x => { if (norm(x) === target) best.push(a.label); });
      (d.carefulMonths || "").split(",").forEach(x => { if (norm(x) === target) careful.push(a.label); });
    });
    return { best, careful };
  };

  return (
    <div>
      <div className="cal-grid">
        {MONTHS.map(m => {
          const { best, careful } = getMonthData(m);
          const isBest = best.length > 0 && careful.length === 0;
          const isCareful = careful.length > 0 && best.length === 0;
          const isMixed = best.length > 0 && careful.length > 0;
          return (
            <div key={m}
              className={`cal-month ${isBest ? "best" : isCareful ? "careful" : ""} ${selected === m ? "selected" : ""}`}
              onClick={() => setSelected(selected === m ? null : m)}
            >
              <div className="cm-name">{m}</div>
              <div className="cm-dot">
                {best.length > 0 && <div className="cm-d" style={{ background: "var(--teal)" }} />}
                {careful.length > 0 && <div className="cm-d" style={{ background: "var(--rose)" }} />}
                {isMixed && <div className="cm-d" style={{ background: "var(--gold)" }} />}
              </div>
              <div className="cm-score" style={{ color: isBest ? "var(--teal)" : isCareful ? "var(--rose)" : "var(--dim)" }}>
                {isBest ? "↑ Go" : isCareful ? "↓ Ease" : isMixed ? "~ Mix" : "—"}
              </div>
            </div>
          );
        })}
      </div>
      {selected && (() => {
        const { best, careful } = getMonthData(selected);
        return (
          <div className="month-detail">
            <div className="md-title">{selected} 2026</div>
            {best.length > 0 && <div className="md-text" style={{ marginBottom: "0.4rem" }}>
              <span style={{ color: "var(--teal)", fontFamily: "var(--fm)", fontSize: "0.72rem" }}>↑ STRONG FOR</span><br />
              {best.join(", ")}
            </div>}
            {careful.length > 0 && <div className="md-text">
              <span style={{ color: "var(--rose)", fontFamily: "var(--fm)", fontSize: "0.72rem" }}>↓ GO SLOWER</span><br />
              {careful.join(", ")}
            </div>}
            {best.length === 0 && careful.length === 0 && <div className="md-text" style={{ color: "var(--dim)" }}>A neutral month — steady as you go.</div>}
          </div>
        );
      })()}
      <div style={{ display:"flex", gap:"1rem", marginTop:"0.7rem", fontSize:"0.72rem", fontFamily:"var(--fm)", color:"var(--dim)" }}>
        <span><span style={{ color:"var(--teal)" }}>●</span> Strong</span>
        <span><span style={{ color:"var(--rose)" }}>●</span> Ease up</span>
        <span><span style={{ color:"var(--gold)" }}>●</span> Mixed</span>
      </div>
    </div>
  );
}

function LifeCard({ area, data }) {
  if (!data) return null;
  const best = (data.bestMonths || "").split(",").map(m => m.trim()).filter(Boolean);
  const slow = (data.carefulMonths || "").split(",").map(m => m.trim()).filter(Boolean);
  return (
    <div className="lcard">
      <div className="ch">
        <div className="ch-l">
          <div className={`ch-ico ic-${area.color}`}>{area.icon}</div>
          <div>
            <div className="ch-title">{area.label}</div>
            <div className="ch-vibe">{data.vibe}</div>
          </div>
        </div>
        <Stars n={data.stars || 3} />
      </div>
      <div className="cb">
        <div className="cdi" />
        <div className={`csum csum-${area.color}`}>{data.summary}</div>
        <div className="tags-row">
          {best.map(m => <span key={m} className="tag tag-g">↑ {m}</span>)}
          {slow.map(m => <span key={m} className="tag tag-r">↓ {m}</span>)}
        </div>
        <div className="cblk"><div className="cblbl">What's Happening</div><div className="cbtxt">{data.whatsHappening}</div></div>
        <div className="cblk"><div className="cblbl">Watch Out For</div><div className="cbtxt">{data.watchOut}</div></div>
        <div className="pmove"><div className="pml">⚡ Power Move</div><p>{data.powerMove}</p></div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  // flow
  const [step, setStep] = useState("lens");
  const [lens, setLens] = useState(null);
  const [form, setForm] = useState({ name:"", dob:"", tob:"06:00", birthCity:"" });
  const [ctx, setCtx] = useState({
    currentCity:"", jobStatus:"", lifeStatus:"", activeChallenge:"",
    focusQuestion:"", sidehustle: false, openToMove: false
  });
  const [loadStage, setLoadStage] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  // result
  const [reading, setReading] = useState(null);
  const [todayScore, setTodayScore] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  // chat
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  // decision
  const [dec, setDec] = useState({ question:"", date1:"", date2:"" });
  const [decResult, setDecResult] = useState(null);
  const [decBusy, setDecBusy] = useState(false);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);
  const lensObj = LENSES.find(l => l.id === lens);

  /* ── build system context string ── */
  const buildCtxStr = () => {
    const parts = [
      `Name: ${form.name}`,
      `Born: ${form.dob} at ${form.tob} in ${form.birthCity}`,
      `Currently lives in: ${ctx.currentCity || form.birthCity}`,
      `Job status: ${ctx.jobStatus || "not specified"}`,
      `Life stage: ${ctx.lifeStatus || "not specified"}`,
      `Active challenge: ${ctx.activeChallenge || "none specified"}`,
      `Building a side project: ${ctx.sidehustle ? "yes" : "no"}`,
      `Open to relocation: ${ctx.openToMove ? "yes" : "no"}`,
      `Main focus question: ${ctx.focusQuestion || "general overview"}`,
    ];
    return parts.join("\n");
  };

  const lensLabel = {
    vedic: "Vedic (Jyotish) — pattern-recognition framework, not religious practice",
    kerala: "Kerala system — lunar-position cycle framework, not religious practice",
    numerology: "Pythagorean Numerology — mathematical birth-date/name framework",
    blend: "blend of Vedic, Kerala, and Numerology — noting where all three agree",
  }[lens] || "";

  const BACKDROP = `2026 planetary cycle backdrop:
- Jupiter: Taurus→Gemini (May), Gemini→Cancer (Oct) — expansion in communication, then home/stability
- Saturn: Pisces all year — discipline, long-term commitments, restructuring
- North Node in Aquarius — tech, community, collective innovation cycles
- South Node in Leo — stepping back from spotlight, finding quieter strengths
- Eclipse windows: late March (reset) and late September (reset)`;

  const BASE_RULES = `RULES (breaking any = failed reading):
- Max 20 words per sentence
- Every technical term explained in plain English right after it
- Never "you will" — use "you may find" or "this period tends to support"
- No religious/mystical language: no karma, dharma, divine, fate, destined, blessed, sacred
- powerMove starts with an action verb
- Each card ends on an empowering practical note
- Speak like a knowledgeable caring coach`;

  /* ── generate main reading ── */
  const handleGenerate = async () => {
    setStep("loading"); setLoadStage(0);
    timerRef.current = setInterval(() => setLoadStage(s => s < LOAD_STEPS.length - 1 ? s + 1 : s), 2800);
    try {
      const userCtx = buildCtxStr();
      const draftPrompt = `You are a thoughtful analyst using ${lensLabel} as a pattern-recognition tool to help people plan the year ahead. Warm, practical, grounded — like a smart coach, not a fortune teller.

USER CONTEXT:
${userCtx}

${BACKDROP}

Generate a 2026 Year-Ahead Outlook. The current city context matters — tailor advice to where they actually live and work now.

Return ONLY valid JSON (no markdown fences):
{
  "worldConnector": "3 sentences. Connect 2026 cycle backdrop to THIS person specifically — reference their current city, job status, and focus question. What world pattern touches their life most, and what's the opportunity?",
  "todayScore": <integer 1-10 representing how strong today (${getTodayStr()}) is for this person based on current cycles>,
  "todayReason": "<2 sentences explaining today's score in plain English — what cycle is active today and what it means practically>",
  "todayBestFor": ["<activity1>","<activity2>","<activity3>"],
  "health":   { "stars":<1-5>,"vibe":"<5-8 words>","summary":"<1 sentence max 15 words>","whatsHappening":"<2 sentences>","watchOut":"<1-2 sentences>","powerMove":"<1 sentence starts with verb>","bestMonths":"<months csv>","carefulMonths":"<months csv>","monthlyNotes":{"Jan":"<10 words>","Feb":"<10 words>","Mar":"<10 words>","Apr":"<10 words>","May":"<10 words>","Jun":"<10 words>","Jul":"<10 words>","Aug":"<10 words>","Sep":"<10 words>","Oct":"<10 words>","Nov":"<10 words>","Dec":"<10 words>"} },
  "wealth":   { "stars":<1-5>,"vibe":"...","summary":"...","whatsHappening":"...","watchOut":"...","powerMove":"...","bestMonths":"...","carefulMonths":"...","monthlyNotes":{<same 12 months>} },
  "work":     { "stars":<1-5>,"vibe":"...","summary":"...","whatsHappening":"...","watchOut":"...","powerMove":"...","bestMonths":"...","carefulMonths":"...","monthlyNotes":{<same 12 months>} },
  "family":   { "stars":<1-5>,"vibe":"...","summary":"...","whatsHappening":"...","watchOut":"...","powerMove":"...","bestMonths":"...","carefulMonths":"...","monthlyNotes":{<same 12 months>} },
  "sideHustleNote": "${ctx.sidehustle ? `2 sentences specifically about launching or growing a side project in 2026 — best timing window and one concrete action to take` : `leave this field as an empty string`}",
  "locationNote": "1-2 sentences about how living in ${ctx.currentCity || form.birthCity} specifically shapes their 2026 — opportunities or friction tied to that place"
}
${BASE_RULES}`;

      const draft = await callClaude([{ role:"user", content:draftPrompt }], 2500);
      setLoadStage(3);

      const reviewPrompt = `Senior editor review — fix silently, return corrected JSON only:
${draft}
Fix: sentences >20 words, jargon without plain explanation, fatalistic language, religious words (karma/dharma/divine/fate/destined), powerMove not starting with verb, negative card endings, worldConnector >3 sentences.
No markdown. No commentary.`;

      const final = await callClaude([
        { role:"user", content:draftPrompt },
        { role:"assistant", content:draft },
        { role:"user", content:reviewPrompt },
      ], 2500);

      clearInterval(timerRef.current); setLoadStage(4);
      const parsed = safeParseJSON(final) || safeParseJSON(draft);
      if (!parsed) throw new Error("parse");

      await new Promise(r => setTimeout(r, 600));
      setReading(parsed);
      setTodayScore({ score: parsed.todayScore, reason: parsed.todayReason, bestFor: parsed.todayBestFor });
      setChatMsgs([{ role:"assistant", text:`Hi ${form.name.split(" ")[0]}! I've mapped your 2026 outlook. Ask me anything — about a specific month, a decision you're weighing, or how to make the most of your best windows.` }]);
      setStep("result");
    } catch (e) {
      clearInterval(timerRef.current);
      const msg = e?.message && !e.message.startsWith("API") ? e.message : "Something went wrong generating your outlook. Please check your API key and try again.";
      setErrMsg(msg);
      setStep("error");
    }
  };

  /* ── chat ── */
  const sendChat = useCallback(async (msg) => {
    if (!msg.trim() || chatBusy) return;
    const userMsg = { role:"user", text: msg };
    setChatMsgs(m => [...m, userMsg, { role:"assistant", text:"...", typing:true }]);
    setChatInput(""); setChatBusy(true);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
    try {
      const history = [...chatMsgs, userMsg].map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.role === "user" ? m.text : m.text,
      }));
      const systemCtx = `You are a helpful pattern-analysis assistant. The user has received a 2026 year-ahead outlook.

Their context:
${buildCtxStr()}

Their reading summary:
- Health: ${reading?.health?.summary}
- Wealth: ${reading?.wealth?.summary}
- Work: ${reading?.work?.summary}
- Family: ${reading?.family?.summary}
- World connector: ${reading?.worldConnector}

Answer their follow-up question in 2-4 sentences. Plain English, practical, grounded. No mystical language. No karma/fate/divine. Start directly with the answer.`;

      const reply = await callClaude([
        { role:"user", content: systemCtx + "\n\nUser question: " + msg }
      ], 400);
      setChatMsgs(m => [...m.slice(0, -1), { role:"assistant", text: reply }]);
    } catch {
      setChatMsgs(m => [...m.slice(0, -1), { role:"assistant", text:"Sorry, I couldn't process that. Try again." }]);
    }
    setChatBusy(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
  }, [chatMsgs, chatBusy, reading, ctx, form]);

  /* ── decision tool ── */
  const runDecision = async () => {
    if (!dec.question || !dec.date1) return;
    setDecBusy(true); setDecResult(null);
    try {
      const prompt = `Pattern-analysis decision timing tool.

User context:
${buildCtxStr()}

${BACKDROP}

Decision question: "${dec.question}"
Option A date: ${dec.date1}
Option B date: ${dec.date2 || "no second date provided"}

In 3-4 sentences: Which timing looks stronger and why, based on 2026 cycle patterns? Be specific about the cycle active on each date. Give one clear recommendation. Plain English, no mystical language, no karma/fate/divine.`;

      const result = await callClaude([{ role:"user", content:prompt }], 350);
      setDecResult(result);
    } catch {
      setDecResult("Unable to analyse timing right now — please try again.");
    }
    setDecBusy(false);
  };

  /* ── share ── */
  const copyReading = () => {
    const txt = `My 2026 Outlook — ${form.name}\n\n` +
      AREAS.map(a => `${a.label}: ${reading[a.key]?.summary}\nPower Move: ${reading[a.key]?.powerMove}`).join("\n\n");
    navigator.clipboard?.writeText(txt);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setStep("lens"); setLens(null);
    setForm({ name:"", dob:"", tob:"06:00", birthCity:"" });
    setCtx({ currentCity:"", jobStatus:"", lifeStatus:"", activeChallenge:"", focusQuestion:"", sidehustle:false, openToMove:false });
    setReading(null); setTodayScore(null); setChatMsgs([]); setDecResult(null);
    setDec({ question:"", date1:"", date2:"" }); setLoadStage(0); setErrMsg("");
  };

  /* ─── RENDER ─────────────────────────────────────────────── */
  return (
    <>
      <style>{`${G}\n${CSS}`}</style>
      <div className="mesh" />
      <div className="grid-ov" />
      <div className="wrap">

        {/* NAV */}
        <div className="nav">
          <div className="nav-logo">◎ <em>Pattern</em> 2026</div>
          <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
            {step === "result" && <button className="btn-sm" onClick={reset}>New ↺</button>}
            <div className="nav-pill">Year Ahead</div>
          </div>
        </div>

        {/* ── STEP 1: LENS ─────────────────────────────────── */}
        {step === "lens" && <>
          <div className="hero">
            <div className="hero-badge">2026 Outlook</div>
            <h1><span className="l1">Your Year,</span><span className="l2">Mapped.</span></h1>
            <p className="hero-sub">Ancient pattern-recognition systems translated into plain, practical guidance — tailored to where you are right now. No beliefs required.</p>
          </div>
          <StepBar idx={0} />
          <div className="slbl">Choose your lens</div>
          <div className="tgrid">
            {LENSES.map(l => (
              <div key={l.id} className={`tcard ${lens === l.id ? "sel" : ""}`} onClick={() => setLens(l.id)}>
                <div className="tick">✓</div>
                <span className="tico">{l.icon}</span>
                <div className="tname">{l.name}</div>
                <div className="tdesc">{l.desc}</div>
                <div className="ttag">{l.tag}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-p" style={{ marginTop:"1.4rem" }} disabled={!lens} onClick={() => setStep("form")}>
            Continue →
          </button>
        </>}

        {/* ── STEP 2: BIRTH DETAILS ────────────────────────── */}
        {step === "form" && <>
          <div className="hero" style={{ paddingBottom:"2rem" }}>
            <div className="hero-badge">{lensObj?.icon} {lensObj?.name}</div>
            <h1 style={{ fontSize:"clamp(2rem,5vw,3rem)" }}><span className="l1">Your</span><span className="l2">Details</span></h1>
          </div>
          <StepBar idx={1} />
          <button className="btn-sm" style={{ marginBottom:"1rem" }} onClick={() => setStep("lens")}>← Back</button>
          <div className="fsec">
            <div className="fsec-title">Birth Details</div>
            <div className="field">
              <label>Full Name at Birth</label>
              <input type="text" placeholder="e.g. Priya Nair" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} />
            </div>
            <div className="frow">
              <div className="field">
                <label>Date of Birth</label>
                <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob:e.target.value })} />
              </div>
              <div className="field">
                <label>Time of Birth</label>
                <input type="time" value={form.tob} onChange={e => setForm({ ...form, tob:e.target.value })} />
                <div className="fnote">Don't know? Leave as 6:00 AM</div>
              </div>
            </div>
            <div className="field" style={{ marginBottom:0 }}>
              <label>City of Birth</label>
              <input type="text" placeholder="e.g. Kochi, Kerala, India" value={form.birthCity} onChange={e => setForm({ ...form, birthCity:e.target.value })} />
            </div>
          </div>
          <button className="btn btn-p" disabled={!form.name || !form.dob || !form.birthCity} onClick={() => setStep("context")}>
            Next: Your Current Life →
          </button>
        </>}

        {/* ── STEP 3: CURRENT CONTEXT ──────────────────────── */}
        {step === "context" && <>
          <div className="hero" style={{ paddingBottom:"1.5rem" }}>
            <div className="hero-badge">Where You Are Now</div>
            <h1 style={{ fontSize:"clamp(1.8rem,5vw,2.8rem)" }}><span className="l1">Your</span><span className="l2">Context</span></h1>
            <p className="hero-sub" style={{ marginTop:"0.6rem", fontSize:"0.92rem" }}>This makes your reading specific to <em>your</em> life — not a generic horoscope.</p>
          </div>
          <StepBar idx={2} />
          <button className="btn-sm" style={{ marginBottom:"1rem" }} onClick={() => setStep("form")}>← Back</button>

          <div className="fsec">
            <div className="fsec-title">Where You Are Now</div>
            <div className="field">
              <label>Current City</label>
              <input type="text" placeholder="Where do you live now? e.g. Dubai, UAE" value={ctx.currentCity} onChange={e => setCtx({ ...ctx, currentCity:e.target.value })} />
              <div className="fnote">If different from birth city — this shapes the advice</div>
            </div>
            <div className="field">
              <label>Work / Job Status</label>
              <select value={ctx.jobStatus} onChange={e => setCtx({ ...ctx, jobStatus:e.target.value })}>
                <option value="">Select...</option>
                <option>Employed full-time</option>
                <option>Freelancing / consulting</option>
                <option>Running my own business</option>
                <option>Actively job hunting</option>
                <option>Between things / transitioning</option>
                <option>Student</option>
                <option>Not working currently</option>
              </select>
            </div>
            <div className="field">
              <label>Life Stage</label>
              <select value={ctx.lifeStatus} onChange={e => setCtx({ ...ctx, lifeStatus:e.target.value })}>
                <option value="">Select...</option>
                <option>Single, independent</option>
                <option>In a relationship</option>
                <option>Married / partnered</option>
                <option>Parent with young kids</option>
                <option>Parent with older kids</option>
                <option>Going through a transition</option>
              </select>
            </div>
          </div>

          <div className="fsec" style={{ marginTop:"0.75rem" }}>
            <div className="fsec-title">What You're Working On</div>
            <div className="field">
              <label>Your Biggest Active Challenge</label>
              <input type="text" placeholder='e.g. "Growing my client base" or "Finding a better job"' value={ctx.activeChallenge} onChange={e => setCtx({ ...ctx, activeChallenge:e.target.value })} maxLength={120} />
            </div>
            <div className="field">
              <label>What Do You Want Most Clarity On in 2026? <span style={{ color:"var(--dim2)", fontFamily:"var(--fb)", textTransform:"none", letterSpacing:0 }}>(optional)</span></label>
              <input type="text" placeholder='e.g. "Is this a year to take a risk?" or "When to launch?"' value={ctx.focusQuestion} onChange={e => setCtx({ ...ctx, focusQuestion:e.target.value })} maxLength={120} />
            </div>
            <div className="field" style={{ marginBottom:0 }}>
              <label>Which apply to you?</label>
              <div className="chips" style={{ marginTop:"0.5rem" }}>
                {[["sidehustle","Building a side hustle"],["openToMove","Open to relocating"]].map(([k, label]) => (
                  <div key={k} className={`chip ${ctx[k] ? "on" : ""}`} onClick={() => setCtx({ ...ctx, [k]:!ctx[k] })}>{label}</div>
                ))}
              </div>
            </div>
          </div>

          <button className="btn btn-p" style={{ marginTop:"0.5rem" }} onClick={handleGenerate}>
            Generate My 2026 Outlook →
          </button>
        </>}

        {/* ── LOADING ──────────────────────────────────────── */}
        {step === "loading" && (
          <div className="lw">
            <div className="lorb-w"><div className="lorb" /><div className="lorb-in">◎</div></div>
            <div className="lw-t">Mapping 2026 for {form.name}...</div>
            <div className="lw-s">{lensObj?.icon} {lensObj?.name} · {ctx.currentCity || form.birthCity}</div>
            <div className="lsteps">
              {LOAD_STEPS.map((l, i) => (
                <div key={i} className={`lstep ${i === loadStage ? "act" : i < loadStage ? "done" : ""}`}>
                  <div className="ldot" />{l}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ERROR ────────────────────────────────────────── */}
        {step === "error" && (
          <div style={{ padding:"3rem 0" }}>
            <div className="err">{errMsg}</div>
            <button className="btn btn-g" onClick={() => setStep("context")}>Try Again</button>
          </div>
        )}

        {/* ── RESULT ───────────────────────────────────────── */}
        {step === "result" && reading && (
          <div>
            {/* Header */}
            <div className="rhdr">
              <div className="rhdr-top">
                <div>
                  <div className="rname">{form.name}'s 2026 Outlook</div>
                  <div className="rmeta">{lensObj?.icon} {lensObj?.name?.toUpperCase()} · {ctx.currentCity || form.birthCity} · {form.dob}</div>
                </div>
                <span className="qbadge">✓ Quality Reviewed</span>
              </div>
            </div>

            {/* Share bar */}
            <div className="share-bar">
              <button className="share-btn" onClick={copyReading}>📋 Copy Summary</button>
              <button className="share-btn" onClick={() => window.print()}>🖨 Print / Save PDF</button>
            </div>

            {/* Today Score */}
            {todayScore && (
              <div className="today-card">
                <div className="today-top">
                  <div>
                    <div className="today-label">⚡ Right Now — Today's Score</div>
                    <div className="today-date">{getTodayStr()}</div>
                    <div className="today-text" style={{ marginTop:"0.6rem" }}>{todayScore.reason}</div>
                    {todayScore.bestFor?.length > 0 && (
                      <div className="today-tags">
                        {todayScore.bestFor.map((t, i) => (
                          <span key={i} className="today-tag" style={{ background:"var(--violetl)", borderColor:"rgba(139,111,255,0.35)", color:"var(--violet2)" }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ScoreRing score={todayScore.score} />
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="tabs">
              {[["overview","Overview"],["calendar","Calendar"],["decision","Decisions"],["chat","Ask Me"]].map(([id, label]) => (
                <button key={id} className={`tab ${activeTab === id ? "on" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
              ))}
            </div>

            {/* ── TAB: OVERVIEW */}
            {activeTab === "overview" && <>
              {reading.worldConnector && (
                <div className="wbox">
                  <div className="wtitle">🌍 2026 Trends & You</div>
                  <p>{reading.worldConnector}</p>
                </div>
              )}
              {reading.locationNote && (
                <div className="wbox" style={{ background:"linear-gradient(135deg,rgba(96,165,250,0.08),rgba(52,217,195,0.06))", borderColor:"rgba(96,165,250,0.22)" }}>
                  <div className="wtitle" style={{ color:"var(--teal)" }}>📍 Living in {ctx.currentCity || form.birthCity}</div>
                  <p>{reading.locationNote}</p>
                </div>
              )}
              {ctx.sidehustle && reading.sideHustleNote && (
                <div className="wbox" style={{ background:"linear-gradient(135deg,rgba(240,192,80,0.1),rgba(139,111,255,0.07))", borderColor:"rgba(240,192,80,0.22)" }}>
                  <div className="wtitle" style={{ color:"var(--gold)" }}>🚀 Your Side Hustle in 2026</div>
                  <p>{reading.sideHustleNote}</p>
                </div>
              )}
              <div className="cgrid">
                {AREAS.map(a => <LifeCard key={a.key} area={a} data={reading[a.key]} />)}
              </div>
            </>}

            {/* ── TAB: CALENDAR */}
            {activeTab === "calendar" && <>
              <div style={{ padding:"0.5rem 0 1rem" }}>
                <div className="slbl">Month-by-Month 2026</div>
                <p style={{ fontSize:"0.88rem", color:"var(--dim)", marginBottom:"1rem" }}>Tap any month to see what's strong or slow across Health, Wealth, Work, and Family.</p>
                <MonthCalendar reading={reading} />
              </div>
            </>}

            {/* ── TAB: DECISION */}
            {activeTab === "decision" && <>
              <div className="decision-box">
                <div className="slbl">Decision Timing Tool</div>
                <p style={{ fontSize:"0.88rem", color:"var(--dim)", marginBottom:"1.2rem" }}>Give me a decision and two possible dates — I'll tell you which timing looks stronger and why.</p>
                <div className="field">
                  <label>Your Decision or Question</label>
                  <input type="text" placeholder='e.g. "Sign the contract" or "Launch my product"' value={dec.question} onChange={e => setDec({ ...dec, question:e.target.value })} />
                </div>
                <div className="frow">
                  <div className="field">
                    <label>Option A — Date</label>
                    <input type="date" value={dec.date1} onChange={e => setDec({ ...dec, date1:e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Option B — Date <span style={{ color:"var(--dim2)", fontSize:"0.7rem" }}>(optional)</span></label>
                    <input type="date" value={dec.date2} onChange={e => setDec({ ...dec, date2:e.target.value })} />
                  </div>
                </div>
                <button className="btn btn-p" style={{ marginTop:"0.3rem" }} disabled={!dec.question || !dec.date1 || decBusy} onClick={runDecision}>
                  {decBusy ? "Analysing..." : "Analyse Timing →"}
                </button>
                {decResult && (
                  <div className="dec-result">
                    <div className="dec-winner">Timing Analysis</div>
                    <div className="dec-text">{decResult}</div>
                  </div>
                )}
              </div>
            </>}

            {/* ── TAB: CHAT */}
            {activeTab === "chat" && <>
              <div className="chat-wrap">
                <div className="slbl">Ask a Follow-Up Question</div>
                <div className="chat-starters">
                  {CHAT_STARTERS.map(s => (
                    <button key={s} className="starter" onClick={() => sendChat(s)}>{s}</button>
                  ))}
                </div>
                <div className="chat-msgs">
                  {chatMsgs.map((m, i) => (
                    <div key={i} className={`msg ${m.role === "user" ? "msg-u" : `msg-a ${m.typing ? "typing" : ""}`}`}>
                      {m.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="chat-input-row">
                  <input
                    className="chat-input"
                    placeholder="Ask about any month, decision, or life area..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendChat(chatInput)}
                  />
                  <button className="chat-send" disabled={chatBusy || !chatInput.trim()} onClick={() => sendChat(chatInput)}>
                    {chatBusy ? "..." : "Send"}
                  </button>
                </div>
                <div className="chat-hint">Press Enter or click Send · Context-aware based on your full outlook</div>
              </div>
            </>}

            <div className="dline" />
            <div className="rfooter">
              This is a guide for reflection — not a prediction, not a prescription.<br />
              Patterns inform. You decide.
            </div>
            <button className="btn btn-g" onClick={reset}>New Outlook ↺</button>
          </div>
        )}

      </div>
    </>
  );
}
