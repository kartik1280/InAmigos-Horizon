import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Users,
  GraduationCap,
  Stethoscope,
  Leaf,
  ArrowRight,
  Globe2,
  HandHeart,
  Sparkles,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import educationImg from "@/assets/education.jpg";
import healthImg from "@/assets/health.jpg";
import environmentImg from "@/assets/environment.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "InAmigos Foundation — Building Hope, Together" },
      {
        name: "description",
        content:
          "InAmigos Foundation empowers communities through education, healthcare, and sustainable development. Join us as a volunteer and create lasting change.",
      },
    ],
  }),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp(target: number, duration = 1800, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value, 1800, seen);
  return (
    <div
      ref={ref}
      className="glass reveal rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
    >
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" />
            </span>
            InAmigos
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
            <a href="#mission" className="hover:text-primary">Mission</a>
            <a href="#impact" className="hover:text-primary">Impact</a>
            <a href="#programs" className="hover:text-primary">Programs</a>
            <a href="#volunteer" className="hover:text-primary">Volunteer</a>
          </nav>
          <Button asChild size="sm" className="rounded-full">
            <a href="#volunteer">Donate</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 gradient-bg" aria-hidden />
        <div className="absolute right-[-6%] top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl animate-float" aria-hidden />
        <div className="absolute left-[-4%] bottom-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="reveal">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Empowering communities since 2012
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Building hope,
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                together.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              InAmigos Foundation partners with local leaders to deliver education, healthcare, and
              sustainable opportunity to underserved communities around the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <a href="#volunteer">
                  Become a volunteer <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7 glass">
                <a href="#mission">Learn more</a>
              </Button>
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl glass p-2 shadow-2xl">
              <img
                src={heroImg}
                alt="Volunteers smiling together at golden hour"
                width={1920}
                height={1280}
                className="h-[420px] w-full rounded-2xl object-cover md:h-[520px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl glass p-4 shadow-xl md:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#e85d3a", "#5cbdb9", "#d4a574"].map((c) => (
                    <span key={c} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold">12,000+ volunteers</div>
                  <div className="text-xs text-muted-foreground">across 27 countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our mission
          </p>
          <h2 className="reveal text-3xl font-bold tracking-tight md:text-5xl">
            Small acts of kindness, multiplied into movements.
          </h2>
          <p className="reveal mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            We believe lasting change happens when communities lead. Our role is to listen, to
            resource, and to amplify the people already doing the work.
          </p>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section id="impact" className="relative py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <StatCard value={120000} suffix="+" label="Lives impacted" icon={HandHeart} />
            <StatCard value={27} label="Countries reached" icon={Globe2} />
            <StatCard value={350} suffix="+" label="Active projects" icon={Sparkles} />
            <StatCard value={12000} suffix="+" label="Volunteers worldwide" icon={Users} />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What we do
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Three pillars. One promise: dignity for every life.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Education",
                desc: "Scholarships, classrooms, and teacher training that put children on a path to opportunity.",
                img: educationImg,
                icon: GraduationCap,
              },
              {
                title: "Healthcare",
                desc: "Mobile clinics and maternal care reaching the last mile, where it matters most.",
                img: healthImg,
                icon: Stethoscope,
              },
              {
                title: "Environment",
                desc: "Reforestation and clean water initiatives co-designed with the communities we serve.",
                img: environmentImg,
                icon: Leaf,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group reveal overflow-hidden rounded-3xl glass transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <a
                    href="#volunteer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Get involved <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section id="volunteer" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-10 text-primary-foreground shadow-2xl md:p-16">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  Your hands. Their future. One story.
                </h2>
                <p className="mt-4 max-w-md text-lg text-primary-foreground/90">
                  Volunteer with InAmigos and join a global community changing lives — locally and
                  abroad.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" variant="secondary" className="rounded-full px-7">
                    Apply to volunteer
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/40 bg-white/10 px-7 text-white hover:bg-white/20"
                  >
                    Donate today
                  </Button>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-xl ring-1 ring-white/20"
              >
                <h3 className="mb-4 text-lg font-semibold">Stay in the loop</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:ring-white/60"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-lg bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:ring-white/60"
                  />
                  <Button className="w-full rounded-lg bg-white text-primary hover:bg-white/90">
                    Join the movement
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </span>
              InAmigos Foundation
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              A registered non-profit dedicated to amplifying community-led change.
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 1240 Mission Ave, Suite 300</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@inamigos.org</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (415) 555-0182</div>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            © {new Date().getFullYear()} InAmigos Foundation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
