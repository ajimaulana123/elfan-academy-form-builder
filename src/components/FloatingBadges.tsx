import { Sparkles, Brain, Code2, Image, Video, Play, Zap, BookOpen } from "lucide-react";

export function FloatingBadges() {
  return (
    <>
      {/* Top Left */}
      <div className="floating-badge absolute left-[5%] top-[15%] animate-float hidden lg:flex">
          <Brain className="w-4 h-4 text-primary" />
          <span>AI Learning</span>
      </div>
      
      {/* Left Middle */}
      <div className="floating-badge absolute left-[10%] top-[80%] animate-float-delayed hidden lg:flex">
        <Code2 className="h-4 w-4 text-cyan" />     
        <span>Coding Skills</span>
      </div>
      
      {/* Top Right */}
      <div className="floating-badge absolute right-[5%] top-[18%] animate-float-slow hidden lg:flex">
        <Zap className="h-4 w-4 text-pink" />
        <span>Innovation</span>
      </div>
      
      {/* Right Middle */}
      <div className="floating-badge absolute right-[10%] top-[80%] animate-float hidden lg:flex">
        <BookOpen className="h-4 w-4 text-primary" />
        <span>Education</span>
      </div>
    </>
  );
}
