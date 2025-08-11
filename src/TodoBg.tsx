import { Feather } from "lucide-react";

export default function TodoBg() {
  return (
    <div className="absolute inset-0 -z-10 bg-[rgb(254,236,211)]/80 backdrop-blur-sm">
      {/* Grandes formes floues automne */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[rgba(115,70,30,0.6)] rounded-full blur-[120px]" />
      <div className="absolute top-10 left-[-5%] w-96 h-96 bg-[rgba(90,50,15,0.5)] rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[rgba(160,82,45,0.5)] rounded-full blur-[80px]" />

      {/* Icônes Feather multiples */}
      <Feather
        size={60}
        className="absolute top-10 left-8 text-[rgba(115,70,30,0.85)] blur-sm rotate-[10deg]"
      />
      <Feather
        size={40}
        className="absolute top-20 right-20 text-[rgba(140,90,35,0.7)] blur-[1px] rotate-[30deg]"
      />
      <Feather
        size={80}
        className="absolute top-40 left-1/4 text-[rgba(115,60,20,0.8)] blur-[0.5px] -rotate-[25deg]"
      />
      <Feather
        size={100}
        className="absolute bottom-20 right-32 text-[rgba(160,82,45,0.75)] blur-[2px] rotate-[15deg]"
      />
      <Feather
        size={50}
        className="absolute bottom-32 left-20 text-[rgba(115,70,30,0.9)] blur-[0.3px] -rotate-[15deg]"
      />
      <Feather
        size={70}
        className="absolute bottom-10 left-1/3 text-[rgba(130,80,40,0.85)] blur-[1px] rotate-[5deg]"
      />
      <Feather
        size={90}
        className="absolute top-1/3 right-1/4 text-[rgba(140,75,20,0.8)] blur-sm -rotate-[40deg]"
      />
      <Feather
        size={60}
        className="absolute top-3/4 left-1/5 text-[rgba(120,65,25,0.7)] blur-[1.5px] rotate-[25deg]"
      />
    </div>
  );
}
