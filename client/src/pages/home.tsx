import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertWaitlistSignupSchema } from "@shared/schema";
import { z } from "zod";
import {
  Zap,
  CheckCircle,
  Sun,
  Heart,
  Lightbulb,
  Building,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

// Load GSAP from CDN
declare const gsap: any;
declare const ScrollTrigger: any;
declare const TextPlugin: any;

const waitlistFormSchema = insertWaitlistSignupSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

export default function Home() {
  const { toast } = useToast();
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const credibilityRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const waitlistRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `${data.email} has been added to our waitlist.`,
      });
      reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    waitlistMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: element,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    // Wait for GSAP to load
    const initAnimations = () => {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        setTimeout(initAnimations, 100);
        return;
      }

      // Register plugins
      gsap.registerPlugin(ScrollTrigger);

      // Scroll progress bar
      if (scrollProgressRef.current) {
        gsap.to(scrollProgressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      // Navbar background on scroll
      if (navbarRef.current) {
        ScrollTrigger.create({
          start: "top -80",
          end: 99999,
          onToggle: (self) => {
            if (navbarRef.current) {
              if (self.isActive) {
                navbarRef.current.classList.add("scrolled");
              } else {
                navbarRef.current.classList.remove("scrolled");
              }
            }
          },
        });
      }

      // Hero section animations
      gsap
        .timeline()
        .from(".hero-headline", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        })
        .from(
          ".hero-subheadline",
          { duration: 1, y: 30, opacity: 0, ease: "power2.out" },
          "-=0.5",
        )
        .from(
          ".hero-badge",
          { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)" },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          { duration: 1, y: 30, opacity: 0, ease: "power2.out" },
          "-=0.3",
        );

      // Typing animation is now handled by CSS

      // Product section animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: productRef.current,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".product-headline", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        })
        .from(
          ".feature-item",
          { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power2.out" },
          "-=0.5",
        )
        .from(
          ".product-visual",
          { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)" },
          "-=0.5",
        );

      // Description section animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".description-content h2", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        })
        .from(
          ".description-content p",
          { duration: 1, y: 30, opacity: 0, ease: "power2.out" },
          "-=0.5",
        )
        .from(
          ".stat-item",
          { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power2.out" },
          "-=0.3",
        );

      // Credibility section animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: credibilityRef.current,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".credibility-headline", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        })
        .from(
          ".partner-card",
          { duration: 1, y: 30, opacity: 0, stagger: 0.3, ease: "power2.out" },
          "-=0.5",
        );

      // Team section animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".team-card", {
          duration: 1,
          y: 30,
          opacity: 0,
          stagger: 0.2,
          ease: "power2.out",
        })
        .from(
          ".made-in-india-badge",
          { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)" },
          "-=0.3",
        );

      // Waitlist section animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: waitlistRef.current,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        })
        .from(".waitlist-content h2", {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power2.out",
        })
        .from(
          ".waitlist-content p",
          { duration: 1, y: 30, opacity: 0, ease: "power2.out" },
          "-=0.5",
        )
        .from(
          ".waitlist-form",
          { duration: 1, y: 30, opacity: 0, ease: "power2.out" },
          "-=0.3",
        );

      // Parallax effect for hero section
      gsap.to(".hero-gradient", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-gradient",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    initAnimations();

    // Cleanup
    return () => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="font-inter bg-white text-dark-grey overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div
        ref={scrollProgressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-midnight to-teal transform-gpu origin-left scale-x-0 z-[1000]"
      />

      {/* Sticky Navigation */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 backdrop-blur-md bg-white/95 border-b border-midnight/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Navigation Links - Hidden on mobile for cleaner design */}
            <div className="hidden lg:flex space-x-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-midnight hover:text-teal transition-colors text-sm"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("product")}
                className="text-midnight hover:text-teal transition-colors text-sm"
              >
                Product
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-midnight hover:text-teal transition-colors text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-midnight hover:text-teal transition-colors text-sm"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="text-midnight hover:text-teal transition-colors text-sm"
              >
                Waitlist
              </button>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection("waitlist")}
              className="bg-gradient-to-r from-midnight to-teal hover:scale-105 transition-transform text-sm px-4 py-2"
              size="sm"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-28 px-4 "
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-light-teal rounded-full animate-float" />
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-light-teal rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="hero-content max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <div className="mb-12">
            {/* Eye-catching main headline with extra spacing */}
            <div className="hero-headline mb-6 mt-16">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-light-teal">
                World's First Untethered Machine
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <div className="block animate-pulse">Breathe Free</div>
                <div className="block animate-pulse">Sleep Better</div>
              </h2>
            </div>

            <p className="hero-subheadline text-lg sm:text-xl md:text-2xl mb-6 text-light-teal font-light">
              Revolutionary Sleep Apnea Therapy Technology
            </p>
          </div>

          <div className="hero-cta flex flex-col gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("waitlist")}
              className="bg-white text-midnight hover:bg-white hover:text-midnight transition-all duration-300 hover:scale-105 hover:shadow-2xl transform px-6 py-3 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto"
              size="lg"
            >
              🔗 Join Our Waitlist
            </Button>
            <Button
              onClick={() => scrollToSection("waitlist")}
              className="bg-white text-midnight hover:bg-white hover:text-midnight transition-all duration-300 hover:scale-105 hover:shadow-2xl transform px-6 py-3 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto"
              size="lg"
            >
              📩 Subscribe for Updates
            </Button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Product Highlights Section */}
      <section id="product" ref={productRef} className="pt-2 pb-8 scroll-mt-20 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h2 className="product-headline text-4xl sm:text-5xl font-bold text-midnight mb-10">
              No hoses. No cords.{" "}
              <span className="text-gradient">No compromise.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary untethered design that gives you complete freedom
              while delivering clinical-grade therapy
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                <div className="feature-item bg-white shadow-lg rounded-lg p-6">
                  <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-midnight mb-2">
                    Wireless Freedom
                  </h3>
                  <p className="text-gray-600">
                    Experience complete mobility with our breakthrough
                    untethered design
                  </p>
                </div>

                <div className="feature-item bg-white shadow-lg rounded-lg p-6">
                  <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-midnight mb-2">
                    Clinical Grade
                  </h3>
                  <p className="text-gray-600">
                    Medically validated technology that meets the highest
                    standards
                  </p>
                </div>

                <div className="feature-item bg-white shadow-lg rounded-lg p-6">
                  <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center mb-4">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-midnight mb-2">
                    All-Day Comfort
                  </h3>
                  <p className="text-gray-600">
                    Lightweight, ergonomic design for comfortable use anywhere
                  </p>
                </div>
              </div>

              <div className="product-visual relative order-1 md:order-2 mb-8 md:mb-0">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal to-light-teal rounded-full opacity-20 animate-pulse-slow" />
                  <div className="absolute inset-8 bg-gradient-to-br from-teal to-light-teal rounded-full opacity-60 animate-glow" />
                  <div className="absolute inset-16 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center">
                    <div className="text-4xl text-teal mb-2">💤</div>
                    <div className="text-sm text-gray-600 mt-2">
                      Sleep Better
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-light-teal rounded-full animate-float flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal rounded-full animate-float flex items-center justify-center"
                    style={{ animationDelay: "1s" }}
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Product description */}
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-midnight mb-4">
                    Revolutionary Design
                  </h3>
                  <p className="text-gray-600">
                    The world's first untethered sleep apnea therapy machine.
                    Experience complete freedom while receiving clinically
                    effective treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-12 bg-midnight text-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="description-content">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              A revolution in{" "}
              <span className="text-gradient bg-gradient-to-r from-teal to-light-teal bg-clip-text text-transparent">
                sleep health
              </span>{" "}
              is on its way.
            </h2>
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-300 mb-12">
              Our breakthrough wearable technology delivers freedom, comfort,
              and clinically effective therapy — anytime, anywhere. Experience
              the future of sleep apnea treatment with our pioneering untethered
              solution.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="stat-item text-center">
                <div className="text-4xl font-bold text-teal mb-2">100%</div>
                <div className="text-gray-300">Wireless</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-4xl font-bold text-teal mb-2">24/7</div>
                <div className="text-gray-300">Monitoring</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-4xl font-bold text-teal mb-2">∞</div>
                <div className="text-gray-300">Freedom</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Credibility Section */}
      <section id="credibility" ref={credibilityRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="credibility-headline text-4xl font-bold text-midnight mb-4">
              <span className="text-gradient">Backed by science.</span> Built
              for life.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Made in India. Ready for the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="partner-card bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg rounded-lg p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-midnight">
                    SRM MedTech Innovation Centre
                  </h3>
                  <p className="text-gray-600">Innovation Partner</p>
                </div>
              </div>
              <p className="text-gray-700">
                Incubated at one of India's leading medical technology
                innovation hubs
              </p>
            </div>

            <div className="partner-card bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg rounded-lg p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-midnight rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-midnight">
                    IHFC – IIT Delhi
                  </h3>
                  <p className="text-gray-600">Technology Support</p>
                </div>
              </div>
              <p className="text-gray-700">
                Supported by the prestigious Industrial Health & Fitness Centre
                at IIT Delhi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        id="team"
        ref={teamRef}
        className="py-12 bg-gradient-to-br from-slate-50 to-white scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-midnight mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Pioneering the future of sleep apnea therapy with innovative
              medical technology
            </p>

            {/* Team Photos */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto mb-16">
              <div className="text-center">
                <img
                  src="/jayanthi.png"
                  alt="Dr. T. Jayanthi"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-teal/20"
                />
                <h3 className="text-xl font-bold text-midnight">
                  Dr. T. Jayanthi
                </h3>
                <p className="text-teal font-semibold">Biomedical Engineer</p>
              </div>
              <div className="text-center">
                <img
                  src="/vinoth.png"
                  alt="Mr. VinothKumar GK"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-teal/20"
                />
                <h3 className="text-xl font-bold text-midnight">
                  Mr. VinothKumar GK
                </h3>
                <p className="text-teal font-semibold">Biomedical Engineer</p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-teal/10 to-light-teal/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-midnight mb-6">
                We are...
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-lg font-semibold text-teal mb-2">
                    🚀 Driving
                  </div>
                  <p className="text-gray-600">
                    <span className="text-teal font-semibold">
                      affordable innovation
                    </span>{" "}
                    in assistive and medical health technologies
                  </p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-teal mb-2">
                    ⚡ Upgrading
                  </div>
                  <p className="text-gray-600">
                    <span className="text-teal font-semibold">
                      legacy devices
                    </span>{" "}
                    with smarter, ergonomic, and scalable solutions
                  </p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-teal mb-2">
                    🎯 To lead
                  </div>
                  <p className="text-gray-600">
                    in diagnostics, wearables, and{" "}
                    <span className="text-teal font-semibold">
                      bio-data platforms
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="made-in-india-badge inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-midnight font-semibold">Made in India</span>
              <span className="text-gray-600">|</span>
              <span className="text-midnight font-semibold">
                Ready for the World
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        id="waitlist"
        ref={waitlistRef}
        className="py-20 bg-gradient-to-br from-teal to-light-teal scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="waitlist-content">
            <Badge className="mb-8 bg-white backdrop-blur-md text-black-600 text-5xl px-8 py-3 cursor-pointer animate-pulse">
              🌟
            </Badge>
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 animate-pulse">
              Coming
            </div>
            {/* <div className="text-5xl mb-6">🔜</div> */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-pulse">
              Soon
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Be among the first to experience the future of sleep apnea care.
            </p>
            <p className="text-base sm:text-lg mb-8 opacity-80 px-4">
              From VinovaMedTech Private Limited - Pioneering the first
              untethered machine for Sleep Apnea Therapy.
            </p>

            <Card className="waitlist-form bg-white/20 backdrop-blur-md border-white/20 max-w-md mx-auto">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className="text-midnight placeholder-gray-500 focus:ring-midnight text-center py-4"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-200 mt-1 text-center">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full bg-midnight text-white hover:bg-midnight py-4 text-lg"
                  >
                    {waitlistMutation.isPending
                      ? "Joining..."
                      : "Join Our Waitlist"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <Button
                    onClick={() => scrollToSection("waitlist")}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-white py-3"
                  >
                    Subscribe for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="sm:col-span-2">
              <Logo variant="footer" />
              <p className="text-gray-400 text-sm mt-4 mb-6">
                Revolutionizing sleep health through innovative medical
                technology. Pioneering the world's first untethered machine for
                Sleep Apnea Therapy.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-teal mb-4">Contact Us</h3>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-teal" />
                  <span className="text-gray-400 text-sm">
                    vinovamedtech@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-sm">📞</span>
                  <span className="text-gray-400 text-sm">+91 9840490315</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="w-4 h-4 text-teal mt-1" />
                  <div className="text-gray-400 text-sm">
                    <div>C1-1102, The Belevedere Apartments,</div>
                    <div>Nandhivaram Guduvanchery</div>
                    <div>Changalpattu dist-603202</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-teal">
                Powered by Innovation
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    🔬 Incubated at
                  </p>
                  <p className="text-gray-400 text-sm">
                    SRM Medical College Hospital & Research Centre
                  </p>
                  <p className="text-gray-400 text-sm">
                    SRM MedTech Innovation Centre
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-300 text-sm font-medium">
                    🤝 Supported by
                  </p>
                  <p className="text-gray-400 text-sm">
                    IHFC – Medical Cobotics, IIT Delhi
                  </p>
                  <p className="text-gray-400 text-xs">
                    (Technology Innovation Hub of IIT Delhi under NM-ICPS, DST)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-teal">
                Follow Our Journey
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Be the first to know when we launch.
              </p>
              <div className="flex space-x-3 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-teal hover:bg-teal/20 p-2 rounded-full transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-teal hover:bg-teal/20 p-2 rounded-full transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-teal hover:bg-teal/20 p-2 rounded-full transition-all"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>

              {/* Made in India badge */}
              <div className="inline-flex items-center space-x-2 bg-teal/20 rounded-full px-4 py-2">
                <span className="text-lg">🇮🇳</span>
                <span className="text-white text-sm font-semibold">
                  Made in India
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <p className="text-gray-400 text-sm mb-4 sm:mb-0">
                © 2025 VinovaMedTech Private Limited. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                🔬 Backed by science. Built for life. 🌍 Ready for the world.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
