import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SectionTitle from "./SectionTitle";
import impressora from "../assets/impressora.webp";

const specs = [
  { label: "Impressora", value: "Bambu Lab A1 Mini", status: "online" },
  { label: "Precisão", value: "0.05mm", status: "online" },
  { label: "Volume", value: "180×180×180mm", status: "online" },
  { label: "Materiais", value: "PLA • PETG • TPU", status: "online" },
  { label: "Velocidade", value: "500mm/s max", status: "online" },
  { label: "Base", value: "Salvador — BA", status: "active" },
];

const logLines = [
  "> Inicializando sistema...",
  "> Bambu Lab A1 Mini conectada ✓",
  "> Filamento carregado: PLA Gold",
  "> Mesa aquecida: 60°C ✓",
  "> Calibração automática... OK",
  "> Sistema pronto para impressão",
  "> Aguardando próximo projeto...",
];

export default function Workshop() {
  const [revealed, setRevealed] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);
  const [typedText, setTypedText] = useState("");
  const imgRef = useRef<HTMLDivElement>(null);

  const ref = useScrollReveal((el) => {
    setRevealed(true);
    animate(el.querySelectorAll(".anim"), {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(120),
      ease: "outExpo",
    });
  });

  /* Typing effect for log */
  useEffect(() => {
    if (!revealed) return;

    let logIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const line = logLines[logIdx];
      if (charIdx <= line.length) {
        setTypedText(line.slice(0, charIdx));
        setCurrentLog(logIdx);
        charIdx++;
        timer = setTimeout(type, 30 + Math.random() * 20);
      } else {
        // Pause then move to next line
        timer = setTimeout(() => {
          logIdx = (logIdx + 1) % logLines.length;
          charIdx = 0;
          type();
        }, 2000);
      }
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, [revealed]);

  /* Parallax */
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (center - viewCenter) * 0.06;
      imgRef.current.style.transform = `translateY(${offset}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(77,166,224,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,166,224,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionTitle tag="WORKSHOP" title="Nosso Espaço" />

        <p className="anim text-center font-pixel text-[0.875rem] text-gold/20 tracking-[0.35em] -mt-8 mb-12 uppercase">
          {">"} Base de Operações — Salvador, BA {"<"}
        </p>

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ── Left: Viewport + image (2 cols) ── */}
          <div className="lg:col-span-2 anim">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0c0c1a] group">
              {/* Monitor header bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-[0.75rem] text-gray-600 ml-1">
                  cam_01 — live feed
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-[0.75rem] text-red-500/60 uppercase tracking-wider">
                    REC
                  </span>
                </div>
              </div>

              {/* Image viewport */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <div ref={imgRef} className="w-full h-full">
                  <img
                    src={impressora}
                    alt="Impressora 3D Bambu Lab no estúdio LumeArt"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Scan line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-crystal/30 to-transparent"
                    style={{ animation: "scan-line 3s linear infinite" }}
                  />
                </div>

                {/* Blueprint grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#4da6e0 1px, transparent 1px), linear-gradient(90deg, #4da6e0 1px, transparent 1px)",
                    backgroundSize: "25px 25px",
                  }}
                />

                {/* Corner crosshairs */}
                <div className="absolute top-2 left-2 w-5 h-5 border-l border-t border-crystal/30" />
                <div className="absolute top-2 right-2 w-5 h-5 border-r border-t border-crystal/30" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-l border-b border-crystal/30" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-r border-b border-crystal/30" />

                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-[0.15]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-crystal" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-crystal" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-crystal" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-crystal" />
                </div>

                {/* Timestamp overlay */}
                <div className="absolute bottom-2 left-3 font-mono text-[0.75rem] text-crystal/30">
                  {new Date().toLocaleDateString("pt-BR")} — STUDIO CAM
                </div>
              </div>
            </div>

            {/* Terminal log below image */}
            <div className="mt-4 rounded-lg border border-white/[0.04] bg-[#0c0c1a]/80 p-4 anim">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
                <span className="font-pixel text-[0.75rem] text-green-500/40 tracking-widest uppercase">
                  System Log
                </span>
              </div>
              <div className="font-mono text-sm space-y-1 min-h-[28px]">
                {logLines.slice(0, currentLog).map((line, i) => (
                  <p key={i} className="text-gray-600">
                    {line}
                  </p>
                ))}
                <p className="text-crystal/70">
                  {typedText}
                  <span
                    className="inline-block w-2 h-4 bg-crystal/50 ml-0.5 align-middle"
                    style={{
                      animation: "typing-cursor-blink 1s step-end infinite",
                    }}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Info + specs (3 cols) ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Description */}
            <div className="anim space-y-4">
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                É aqui que a mágica acontece. Nosso estúdio em{" "}
                <span className="text-gold font-semibold">Salvador</span> conta
                com equipamentos de última geração para garantir qualidade e
                precisão em cada impressão.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Cada peça é fabricada com cuidado artesanal e tecnologia de
                ponta, garantindo acabamento impecável e fidelidade ao modelo
                original. Do PLA à resina, escolhemos o material ideal para cada
                projeto.
              </p>
            </div>

            {/* Specs panel */}
            <div className="anim rounded-xl border border-white/[0.04] bg-[#0c0c1a]/60 overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse" />
                  <span className="font-pixel text-[0.875rem] text-gold/40 tracking-[0.3em] uppercase">
                    Tech Specs
                  </span>
                </div>
                <span className="font-mono text-[0.75rem] text-gray-600">
                  v2.0.26
                </span>
              </div>

              {/* Spec rows */}
              <div className="divide-y divide-white/[0.03]">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between px-5 py-3 group hover:bg-white/[0.015] transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gold/30">▸</span>
                      <span className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                        {spec.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
                        {spec.value}
                      </span>
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            spec.status === "online" ? "#22c55e" : "#d4a853",
                          boxShadow: `0 0 6px ${spec.status === "online" ? "#22c55e" : "#d4a853"}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Panel footer */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.04] bg-white/[0.01]">
                <span className="font-pixel text-[0.75rem] text-gray-700 tracking-widest uppercase">
                  All Systems Operational
                </span>
                <span className="font-pixel text-[0.75rem] text-green-500/40 tracking-widest uppercase">
                  ● OK
                </span>
              </div>
            </div>

            {/* Coming soon note */}
            <p className="anim text-gray-600 text-sm italic flex items-center gap-2">
              <span className="text-gold/30">*</span>
              Em breve adicionaremos mais fotos do nosso espaço de produção.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
