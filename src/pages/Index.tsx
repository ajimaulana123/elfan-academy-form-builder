import { Button } from "@/components/ui/button";
import { Sparkles, Play, ShieldCheck } from "lucide-react";
import { FloatingBadges } from "@/components/FloatingBadges";
import { RegistrationFormCard } from "@/components/RegistrationFormCard";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(262 83% 58% / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, hsl(220 90% 56% / 0.1), transparent),
            radial-gradient(ellipse 60% 40% at 20% 80%, hsl(262 83% 58% / 0.08), transparent)
          `
        }}
      />
      
      {/* Hero Section */}
      <header className="relative pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="container relative">
          {/* Floating Badges */}
          <FloatingBadges />
          
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Most Powerful AI Tools at One Place</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Ideas into Reality{" "}
              <span className="gradient-text">with Intelligent AI Tools</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Unleash the Power of Artificial Intelligence to Streamline Your Workflow, 
              Boost Productivity, and Redefine Success.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl">
                <span>Explore Apps</span>
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="h-4 w-4 fill-current" />
                <span>Watch Intro Video</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content - Registration Form */}
      <main className="relative pb-24">
        <div className="container px-4">
          <RegistrationFormCard />
        </div>
      </main>
      
      {/* Trusted By Section */}
      <section className="relative py-16 border-t border-border/30">
        <div className="container px-4">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by world&apos;s largest companies including...
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {["Spotify", "facebook", "tinder", "airbnb", "Cadbury", "Canon", "Spark"].map((company) => (
              <span 
                key={company} 
                className="text-xl md:text-2xl font-semibold text-muted-foreground/80"
                style={{ fontFamily: company === "tinder" || company === "Cadbury" ? "cursive" : "inherit" }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-8 border-t border-border/30">
        <div className="container px-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
