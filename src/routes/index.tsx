import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Users,
  GraduationCap,
  Leaf,
  ArrowRight,
  Globe2,
  HandHeart,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/Hero.jpg.png";
import educationImg from "@/assets/education.jpg";
import healthImg from "@/assets/health.jpg";
import environmentImg from "@/assets/environment.jpg";
import missionMain from "@/assets/mission.jpg.png"; // Replace with official InAmigos website or LinkedIn image (now using mission.jpg)
import sevaImg from "@/assets/Seva.jpg.png"; // Replace with official InAmigos gallery/event image
import bachpanshalaImg from "@/assets/bachpanshala.jpg.png"; // Replace with official InAmigos gallery/event image
import jeevImg from "@/assets/jeev.jpg.png"; // Replace with official InAmigos gallery/event image
import udaanImg from "@/assets/Udaan.jpg.png"; // Replace with official InAmigos gallery/event image
import prakritiImg from "@/assets/prakriti.jpg.png"; // Replace with official InAmigos gallery/event image
import vikasImg from "@/assets/Vikaas.jpg.png"; // Replace with official InAmigos gallery/event image

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "InAmigos Horizon — Building Hope, Together" },
      {
        name: "description",
        content:
          "InAmigos Horizon (InAmigos Foundation) is a Section 8 non-profit based in Chhattisgarh. We run community-led programs in education, livelihoods, environment, animal welfare and more.",
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
      className="glass reveal rounded-2xl p-6 text-center transition-transform hover:-translate-y-2 transition-all duration-300"
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
  const [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setNavVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="site-container min-h-screen bg-[#fff8ef] text-foreground relative overflow-x-hidden">
      {/* warm radial glows (visual only) - replace or adjust colors if needed */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-orange-200/40 to-transparent blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -top-32 right-[-8%] h-96 w-96 rounded-full bg-gradient-to-br from-teal-200/30 to-transparent blur-3xl pointer-events-none" aria-hidden />
      {/* NAV */}
      <header className={`fixed top-5 left-0 right-0 z-50 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 rounded-full border border-orange-200/70 bg-white/85 shadow-[0_18px_50px_rgba(234,88,12,0.12)] backdrop-blur-xl ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0' } transition-all duration-700`}>
        <div className="flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" />
            </span>
            InAmigos Horizon
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
            <a href="#about" className="hover:text-orange-600 transition-colors">Mission</a>
            <a href="#impact" className="hover:text-orange-600 transition-colors">Impact</a>
            <a href="#projects" className="hover:text-orange-600 transition-colors">Programs</a>
            <a href="#volunteer" className="hover:text-orange-600 transition-colors">Volunteer</a>
          </nav>
          <Button asChild size="sm" className="rounded-full">
            <a href="#volunteer">Donate</a>
          </Button>
        </div>
        <div className="absolute -bottom-2 left-6 right-6 h-1 bg-gradient-to-r from-orange-200/40 via-transparent to-teal-200/30 rounded-full blur-sm pointer-events-none" aria-hidden />
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="absolute right-[-6%] top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl animate-float" aria-hidden />
        <div className="absolute left-[-4%] bottom-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" aria-hidden />

        <div className="relative w-full max-w-screen-xl mx-auto grid items-center gap-12 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
          <div className="reveal">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/70">InAmigos Horizon</div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Uniting minds for change.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              InAmigos Foundation works to support communities through education, women empowerment,
              animal welfare, environmental care, social support, and skill development initiatives across India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 hover:scale-105 transition-transform">
                <a href="#volunteer">
                  Become a volunteer <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7 glass hover:scale-105 transition-transform">
                <a href="#about">Learn more</a>
              </Button>
            </div>
          </div>

            <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl glass p-2 shadow-2xl">
              {/* Replace this with an official InAmigos event/gallery image (inamigosfoundation.org.in) */}
              <img
                src={heroImg}
                alt="Volunteers smiling together at golden hour"
                width={1920}
                height={1280}
                className="max-w-full w-full h-[420px] rounded-2xl object-cover object-center md:h-[520px]"
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
                  <div className="text-sm font-semibold">200 volunteers</div>
                  <div className="text-xs text-muted-foreground">across 28 states</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION - split layout */}
      <section id="about" className="relative py-20 md:py-24 scroll-mt-32">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* LEFT */}
            <div className="reveal">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">OUR MISSION</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Awareness that inspires action.</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Through volunteer-led initiatives and community-driven programs, InAmigos Foundation focuses on creating practical, compassionate, and sustainable impact for people, animals, and the environment.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="md" className="rounded-full px-6 hover:scale-105 transition-transform">
                  <a href="#projects">Explore Initiatives</a>
                </Button>
                <Button asChild size="md" variant="outline" className="rounded-full px-6 hover:scale-105 transition-transform">
                  <a href="#volunteer">Become a Volunteer</a>
                </Button>
              </div>

              <div className="mt-6 flex gap-3">
                <span className="rounded-full bg-white/40 px-3 py-1 text-sm font-medium">Community Support</span>
                <span className="rounded-full bg-white/40 px-3 py-1 text-sm font-medium">Education & Skills</span>
                <span className="rounded-full bg-white/40 px-3 py-1 text-sm font-medium">Compassion in Action</span>
              </div>
            </div>

            {/* RIGHT - images & stat bubble */}
            <div className="reveal relative flex items-center justify-center">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-[420px] h-[420px] md:h-[520px]">
                  {/* Replace with official InAmigos event/gallery image */}
                  <img src={missionMain} alt="Mission main" className="w-full h-full object-cover animate-float" />
                </div>

                {/* secondary overlapping image removed per request */}

                <div className="absolute -top-6 right-[-6%] glass rounded-full px-4 py-2 shadow-lg">
                  <div className="text-sm font-semibold">50,000+ beneficiaries</div>
                </div>

                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-orange-100/60 to-transparent blur-3xl" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section id="impact" className="relative py-12 md:py-16">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <StatCard value={50000} suffix="+" label="Beneficiaries" icon={HandHeart} />
            <StatCard value={28} label="States" icon={Globe2} />
            <StatCard value={6} label="Causes" icon={Sparkles} />
            <StatCard value={200} suffix="+" label="Volunteers" icon={Users} />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="projects" className="relative py-20 md:py-24 scroll-mt-32">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our initiatives
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Six initiatives creating care, opportunity, and resilience.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {
              [
                {
                  title: "Project Seva",
                  desc: "Food and clothing support for underprivileged communities.",
                  img: sevaImg,
                  icon: HandHeart,
                },
                {
                  title: "Project Bachpanshala",
                  desc: "Education support for underprivileged children, including digital literacy, life skills, and school learning.",
                  img: bachpanshalaImg,
                  icon: GraduationCap,
                },
                {
                  title: "Project Jeev",
                  desc: "Animal welfare, including rescue, protection, feeding, and care for vulnerable animals.",
                  img: jeevImg,
                  icon: Heart,
                },
                {
                  title: "Project Udaan",
                  desc: "Women empowerment through skill development, financial independence, and awareness.",
                  img: udaanImg,
                  icon: Users,
                },
                {
                  title: "Project Prakriti",
                  desc: "Environmental conservation, sustainability, sapling plantation, and eco-friendly practices.",
                  img: prakritiImg,
                  icon: Leaf,
                },
                {
                  title: "Project Vikas",
                  desc: "Employability and skill development through internships, training, and youth development opportunities.",
                  img: vikasImg,
                  icon: Sparkles,
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="group reveal overflow-hidden rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                <div className="overflow-hidden">
                  {/* Replace this with an official InAmigos gallery/event image when available */}
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="max-w-full w-full h-56 object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-10 text-primary-foreground shadow-2xl md:p-16">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                  Your hands. Their future. One story.
                </h2>
                <p className="mt-4 max-w-md text-lg text-primary-foreground/90">
                  Volunteer with InAmigos Horizon and join our community across 28 states, supporting
                  50,000 beneficiaries through focused, local action.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="secondary" className="rounded-full px-7 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScAgWgiWEjMm5N5HO9f-kF5_MNCsFu0AjfF9-sFnWGYdJG7Jg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply to volunteer
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 px-7 text-white transition-transform duration-300 ease-out hover:bg-white/20 hover:scale-105 cursor-pointer">
                    <a href="https://pages.razorpay.com/pl_H621G6ea64ZMl7/view" target="_blank" rel="noopener noreferrer">
                      Donate today
                    </a>
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
                  <Button asChild className="w-full rounded-lg bg-white text-primary transition-transform duration-300 ease-out hover:bg-white/90 hover:scale-105 cursor-pointer">
                    <a href="https://inamigosfoundation.org.in/became-volunteer" target="_blank" rel="noopener noreferrer">Join the movement</a>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT ANCHOR (invisible) */}
      <section id="contact" aria-hidden className="sr-only" />

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-12">
      <div className="w-full max-w-screen-xl mx-auto grid gap-8 px-4 sm:px-6 lg:px-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </span>
              InAmigos Horizon
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Section 8 registered non-profit based in Chhattisgarh. Founded Sep 23, 2020 by Mr.
              Govind Shukla, Founder & CEO.
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Based in Chhattisgarh, India</div>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Founded Sep 23, 2020 — Govind Shukla</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> 80G · 12A · CSR-1 · NITI Aayog · ISO 9001:2015</div>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            © {new Date().getFullYear()} InAmigos Horizon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
