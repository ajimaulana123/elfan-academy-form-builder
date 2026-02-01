import { Sparkles, FileText, Code, Image, Video, Play } from "lucide-react";

export function FloatingBadges() {
  return (
    <>
      {/* Top Left */}
      <div className="floating-badge absolute left-[5%] top-[15%] animate-float hidden lg:flex">
        <FileText className="h-4 w-4 text-primary" />
        <span>Text Generator</span>
      </div>
      
      {/* Left Middle */}
      <div className="floating-badge absolute left-[2%] top-[45%] animate-float-delayed hidden lg:flex">
        <Code className="h-4 w-4 text-cyan" />
        <span>Code Generator</span>
      </div>
      
      {/* Top Right */}
      <div className="floating-badge absolute right-[5%] top-[18%] animate-float-slow hidden lg:flex">
        <Image className="h-4 w-4 text-pink" />
        <span>Image Generator</span>
      </div>
      
      {/* Right Middle */}
      <div className="floating-badge absolute right-[3%] top-[40%] animate-float hidden lg:flex">
        <Video className="h-4 w-4 text-primary" />
        <span>Video Generator</span>
      </div>
      
      {/* Small decorative triangles */}
      <div className="absolute left-[12%] top-[12%] w-2 h-2 rotate-45 bg-primary/60 hidden lg:block animate-pulse-glow" />
      <div className="absolute right-[18%] top-[15%] w-2 h-2 rotate-45 bg-pink/60 hidden lg:block animate-pulse-glow" />
      <div className="absolute left-[8%] top-[55%] w-2 h-2 rotate-45 bg-blue/60 hidden lg:block animate-pulse-glow" />
    </>
  );
}
