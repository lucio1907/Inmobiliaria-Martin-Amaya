export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`text-2xl font-black tracking-tight text-white flex flex-col leading-none ${className}`}>
      <span className="text-accent">J.MARTIN</span>
      <span className="text-center tracking-[0.2em] text-lg">AMAYA</span>
      <span className="text-center text-[8px] md:text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">M.P. N° 4022</span>
    </div>
  )
}
