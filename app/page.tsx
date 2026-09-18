"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
  Building2,
  Hammer,
  Building,
  ClipboardCheck
} from "lucide-react";
import { Crosshair } from "lucide-react";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("vertical-theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const nextTheme = !dark;

    setDark(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vertical-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vertical-theme", "light");
    }
  }

  // ADD THE SUBMIT FUNCTION HERE

  async function handleContactSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormStatus("loading");
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      setFormStatus("success");

      setFormMessage(
        "Thank you. Your inquiry has been received. We'll be in touch soon."
      );

      form.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setFormStatus("error");

      setFormMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border bg-background/85 px-5 py-3 shadow-sm backdrop-blur-xl">

          {/* LOGO */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black">
              <span className="text-lg font-black">V</span>
            </div>

            <div className="leading-none">
              <div className="text-sm font-black tracking-[0.18em]">
                VERTICAL
              </div>

              <div className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-muted">
                CONSTRUCTIONS
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#about" className="nav-link">
              About
            </a>

            <a href="#services" className="nav-link">
              Services
            </a>

            <a href="#projects" className="nav-link">
              Projects
            </a>

            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="theme-button"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-yellow-300 md:flex"
            >
              Start a Project
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="theme-button md:hidden"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mx-4 mt-2 rounded-2xl border border-border bg-background p-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-5">

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>

              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>

              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>

            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden pt-28">

        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">

          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-yellow-400/10" />

          <div className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-yellow-400/15 blur-3xl" />

          <div className="absolute -left-32 bottom-20 h-[300px] w-[300px] rounded-full bg-yellow-400/10 blur-3xl" />

        </div>

        {/* HERO CONTENT */}
        <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-2 lg:px-8">

          {/* LEFT CONTENT */}
          <div className="max-w-3xl">

            {/* EYEBROW */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted">

              <span className="h-2 w-2 rounded-full bg-yellow-400" />

              Building the future with purpose

            </div>

            {/* HEADING */}
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

              Built with{" "}

              <span className="text-yellow-400">
                strength.
              </span>

              <br />

              Built with{" "}

              <span className="text-muted">
                purpose.
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Vertical Constructions delivers professional construction,
              renovation, exterior and interior solutions with a focus on
              quality, precision and lasting results.
            </p>

            {/* ACTIONS */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-4 font-bold text-black transition hover:-translate-y-1 hover:bg-yellow-300"
              >
                Start Your Project

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </a>

              <a
                href="https://www.instagram.com/verticalconstructionss/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-4 font-bold text-foreground transition hover:-translate-y-1 hover:border-yellow-400"
              >
                View Our Work
              </a>

            </div>

            {/* TRUST */}
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-t border-border pt-7">

              <div>
                <div className="text-2xl font-black text-foreground sm:text-3xl">
                  10+
                </div>

                <div className="mt-1 text-xs text-muted sm:text-sm">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-foreground sm:text-3xl">
                  100+
                </div>

                <div className="mt-1 text-xs text-muted sm:text-sm">
                  Projects
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-foreground sm:text-3xl">
                  100%
                </div>

                <div className="mt-1 text-xs text-muted sm:text-sm">
                  Commitment
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

            {/* MAIN VISUAL */}
            <div className="relative min-h-[500px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

              {/* Construction-style background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-background to-background" />

              {/* Inner border */}
              <div className="absolute inset-6 rounded-2xl border border-border" />

              {/* Decorative architectural lines */}
              <div className="absolute left-10 top-10 h-32 w-px bg-yellow-400/60" />
              <div className="absolute left-10 top-10 h-px w-32 bg-yellow-400/60" />

              <div className="absolute bottom-10 right-10 h-32 w-px bg-yellow-400/40" />
              <div className="absolute bottom-10 right-10 h-px w-32 bg-yellow-400/40" />

              {/* Central mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 text-3xl font-black text-black shadow-xl">
                    VC
                  </div>

                  <div className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-muted">
                    Vertical
                  </div>

                  <div className="mt-1 text-sm font-black uppercase tracking-[0.25em] text-foreground">
                    Constructions
                  </div>

                </div>
              </div>

            </div>

            {/* CARDS OUTSIDE MAIN VISUAL */}
            <div className="mt-4 space-y-3">

              {/* CONSULTATION BOX */}
              <div className="rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-md">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Phone size={19} />
                  </div>

                  <div>
                    <div className="text-xs font-medium text-muted">
                      Need a consultation?
                    </div>

                    <div className="mt-1 text-base font-bold text-foreground">
                      Let's talk about your project.
                    </div>
                  </div>

                </div>

              </div>

              {/* COMMITMENT BOX */}
              <div className="rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-md">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Check size={19} />
                  </div>

                  <div>
                    <div className="text-xs font-medium text-muted">
                      Our commitment
                    </div>

                    <div className="mt-1 text-base font-bold text-foreground">
                      Quality. Precision. Results.
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER BEFORE ABOUT */}
      <div className="mx-auto h-px w-full max-w-7xl bg-gray-300" />

      {/* ABOUT */}
      <section
        id="about"
        className="relative overflow-hidden bg-background py-24 sm:py-28"
      >
        {/* Subtle background detail */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* SECTION INTRO */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              About Vertical Constructions
            </div>

            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              We build more than{" "}
              <span className="text-yellow-400">structures.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              We build spaces designed to stand strong, perform beautifully,
              and last for years to come.
            </p>
          </div>

          {/* ABOUT GRID */}
          <div className="mt-16 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT COLUMN */}
            <div className="flex flex-col">

              {/* OUR STORY */}
              <div className="self-start rounded-3xl border border-border bg-card p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9">

                <div className="flex items-start gap-5">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-black">
                    VC
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted">
                      Our Story
                    </div>

                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-foreground sm:text-3xl">
                      Built on quality. Driven by purpose.
                    </h3>
                  </div>

                </div>

                <div className="mt-8 space-y-5 text-sm leading-7 text-muted sm:text-base">

                  <p>
                    At Vertical Constructions, we believe every project deserves
                    careful planning, skilled execution, and attention to detail.
                  </p>

                  <p>
                    From the first conversation to the final finish, our approach
                    is focused on creating reliable results and a smooth experience
                    for every client.
                  </p>

                  <p>
                    Whether it&apos;s a new construction project, a renovation, or
                    transforming an existing space, we bring the same commitment
                    to quality, precision, and lasting value.
                  </p>

                </div>

              </div>



              {/* LASTING VALUE — SEPARATE CONTAINER */}
              <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <ArrowRight size={18} />
                  </div>

                </div>

                <h3 className="mt-6 text-xl font-black text-foreground sm:text-2xl">
                  Lasting Value
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  We aim to create spaces that continue to deliver value long
                  after the project is complete.
                </p>


                {/* TALK TO OUR TEAM */}
                <a
                  href="#contact"
                  className="group/link mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-foreground transition hover:text-yellow-500"
                >
                  Talk to our team

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </a>

              </div>

            </div>


            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">

              {/* 01 */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <span className="text-lg">✓</span>
                  </div>


                </div>

                <h3 className="mt-6 text-xl font-black text-foreground">
                  Quality First
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  We focus on materials, workmanship, and details that create
                  results you can depend on.
                </p>

              </div>


              {/* 02 */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <span className="text-sm font-black text-black">
                      <Crosshair className="h-5 w-5 text-black" />
                    </span>
                  </div>

                </div>

                <h3 className="mt-6 text-xl font-black text-foreground">
                  Precision
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Every stage is approached with planning, accuracy, and attention
                  to the smallest details.
                </p>

              </div>


              {/* 03 */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Phone size={18} />
                  </div>

                </div>

                <h3 className="mt-6 text-xl font-black text-foreground">
                  Reliability
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Clear communication and dependable execution from the first
                  discussion through completion.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-7xl bg-gray-300" />

      <section id="services" className="mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* SERVICES HEADER */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Our Services
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Built for every stage
              <br />
              <span className="text-yellow-500">of your project.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              From new construction to renovations and project planning, we bring
              the experience, precision, and care needed to turn your vision into
              a finished space.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* SERVICE 01 */}
            <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Building2 size={20} />
                </div>
              </div>

              <h3 className="mt-8 text-xl font-black text-foreground">
                New Construction
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Complete construction solutions from planning and groundwork to
                the final details of your new space.
              </p>

              <a
                href="#contact"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-yellow-500"
              >
                Learn more
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* SERVICE 02 */}
            <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Hammer size={20} />
                </div>
              </div>

              <h3 className="mt-8 text-xl font-black text-foreground">
                Renovation & Remodeling
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Transform existing spaces with thoughtful renovations focused on
                quality, function, and lasting results.
              </p>

              <a
                href="#contact"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-yellow-500"
              >
                Learn more
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* SERVICE 03 */}
            <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Building size={20} />
                </div>
              </div>

              <h3 className="mt-8 text-xl font-black text-foreground">
                Commercial Construction
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Reliable construction services for commercial spaces designed
                around performance, durability, and business needs.
              </p>

              <a
                href="#contact"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-yellow-500"
              >
                Learn more
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* SERVICE 04 */}
            <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <ClipboardCheck size={20} />
                </div>
              </div>

              <h3 className="mt-8 text-xl font-black text-foreground">
                Project Planning
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Careful planning, coordination, and project management to keep
                every stage organized and moving forward.
              </p>

              <a
                href="#contact"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground transition group-hover:text-yellow-500"
              >
                Learn more
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

          </div>

          {/* SERVICES CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                Ready to build?
              </p>

              <h3 className="mt-2 text-2xl font-black text-foreground">
                Let&apos;s build something together.
              </h3>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-1 hover:shadow-lg"
            >
              Start a Project
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-7xl bg-gray-300 mt-8 " />

      {/* PROJECTS */}
      <section
        id="projects"
        className="relative overflow-hidden bg-background py-24 sm:py-28"
      >
        {/* Subtle background detail */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-80px] bottom-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* SECTION INTRO */}
          <div className="mb-12 max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              Our Projects
            </div>

            <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl">
              Built with purpose.
              <br />
              <span className="text-yellow-500">Made to last.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore the projects we have delivered with careful planning,
              skilled execution, and attention to every detail.
            </p>
          </div>

          {/* PROJECT CARDS */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* 01 — FEATURED */}
            <article className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[28px] border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow-400/10 blur-2xl transition-all duration-300 group-hover:bg-yellow-400/20" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-lg font-bold text-foreground">
                  ↗
                </div>
              </div>

              <div className="relative mt-auto">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-600">
                  Featured Project
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Modern Residence
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  A carefully planned residential build combining modern design,
                  durable materials, and practical living spaces.
                </p>

                <a
                  href="https://www.instagram.com/verticalconstructionss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-yellow-600"
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>

            {/* 02 */}
            <article className="group flex min-h-[330px] flex-col rounded-[28px] border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-lg font-bold text-foreground">
                  ↗
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Renovations
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Existing spaces transformed with thoughtful design, quality
                  craftsmanship, and practical results.
                </p>
                <a
                  href="https://www.instagram.com/verticalconstructionss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-yellow-600"
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>

            {/* 03 */}
            <article className="group flex min-h-[330px] flex-col rounded-[28px] border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-lg font-bold text-foreground">
                  ↗
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Commercial Spaces
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Reliable construction for commercial environments designed around
                  performance, durability, and business needs.
                </p>

                <a
                  href="https://www.instagram.com/verticalconstructionss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-yellow-600"
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>

            {/* 04 */}
            <article className="group flex min-h-[330px] flex-col rounded-[28px] border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-lg font-bold text-foreground">
                  ↗
                </div>

              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Custom Builds
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Purpose-built spaces created around your requirements, vision,
                  and long-term goals.
                </p>

                <a
                  href="https://www.instagram.com/verticalconstructionss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-yellow-600"
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>

          </div>

          {/* PROJECT CTA */}
          <div className="mt-8 flex flex-col gap-6 rounded-[28px] border border-border bg-background p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Our Work
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                See the work. Feel the difference.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                From the first plan to the final detail, every project is built
                with purpose and attention to quality.
              </p>
            </div>

            <a
              href="https://www.instagram.com/verticalconstructionss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-yellow-500 hover:shadow-md"
            >
              View Our Work
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-7xl bg-gray-300" />

      {/* CONTACT */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-border bg-background py-24 sm:py-28"
      >
        {/* Subtle background detail */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* SECTION INTRO */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Get in touch
            </div>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Let’s build something
              <br />
              <span className="text-yellow-500">that lasts.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a project in mind? Tell us what you’re planning, and let’s
              talk about how we can bring it to life with careful planning,
              quality craftsmanship, and attention to detail.
            </p>
          </div>

          {/* CONTACT GRID */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            {/* CONTACT INFO */}
            <div className="rounded-[28px] border border-border bg-background p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Start a conversation
              </p>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                Tell us about your project.
              </h3>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Whether you’re planning a new build, renovation, commercial
                space, or something completely custom, we’d love to hear about it.
              </p>

              <div className="mt-10 space-y-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:verticalconstructions11@gmail.com"
                    className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                  >
                    verticalconstructions11@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Phone
                  </p>
                  <a
                    href="tel:7889384373"
                    className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                  >
                    7889384373
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Availability
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Monday – Saturday · 9:00 AM – 5:00 PM
                  </p>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="rounded-[28px] border border-border bg-background p-7 sm:p-8">

              <form
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>

                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Project type
                  </label>

                  <select
                    id="project"
                    name="projectType"
                    className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    <option value="new-construction">New Construction</option>
                    <option value="renovation">Renovation & Remodeling</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="planning">Project Planning</option>
                    <option value="custom">Custom Build</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Tell us about your project
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us a little about what you're planning..."
                    className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-yellow-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === "loading" ? "Sending..." : "Send Inquiry"}
                  {formStatus !== "loading" && <span>→</span>}
                </button>

                {formMessage && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${formStatus === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                  >
                    {formMessage}
                  </div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          {/* MAIN FOOTER */}
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.7fr_0.8fr]">

            {/* BRAND */}
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-black shadow-sm">
                  V
                </div>

                <div className="leading-none">
                  <div className="text-sm font-black tracking-[0.18em] text-foreground">
                    VERTICAL
                  </div>

                  <div className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-muted-foreground">
                    CONSTRUCTIONS
                  </div>
                </div>
              </a>

              <h2 className="mt-8 max-w-xl text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
                Built with strength.
                <br />
                <span className="text-yellow-500">
                  Built with purpose.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                Professional construction, renovation, exterior and interior
                solutions focused on quality, precision, and lasting results.
              </p>
            </div>

            {/* EXPLORE */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Explore
              </p>

              <nav className="mt-6 flex flex-col gap-4">
                <a
                  href="#about"
                  className="w-fit text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                >
                  About
                </a>

                <a
                  href="#services"
                  className="w-fit text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                >
                  Services
                </a>

                <a
                  href="#projects"
                  className="w-fit text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                >
                  Projects
                </a>

                <a
                  href="#contact"
                  className="w-fit text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* CONTACT */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Get in touch
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </p>

                  <a
                    href="mailto:verticalconstructions11@gmail.com"
                    className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                  >
                    verticalconstructions11@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Phone
                  </p>

                  <a
                    href="tel:7889384373"
                    className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                  >
                    7889384373
                  </a>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Hours
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Monday – Saturday
                    <br />
                    9:00 AM – 5:00 PM
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Instagram
                  </p>

                  <a
                    href="https://www.instagram.com/verticalconstructionss/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-yellow-500"
                  >
                    @verticalconstructionss
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* FOOTER DIVIDER */}
          <div className="my-12 h-px w-full bg-border" />

          {/* BOTTOM BAR */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-muted-foreground">
              © 2026 Vertical Constructions. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <a
                href="#contact"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Get Started
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:text-yellow-500"
              >
                Back to top
                <span className="text-base">↑</span>
              </a>

            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}