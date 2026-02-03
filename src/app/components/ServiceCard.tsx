import { Stethoscope, Building2, TestTube, Video, Home, FileText } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}

const iconMap = {
  stethoscope: Stethoscope,
  building2: Building2,
  testTube: TestTube,
  video: Video,
  home: Home,
  fileText: FileText
};

export function ServiceCard({ title, description, icon, onClick }: ServiceCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Stethoscope;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-[#0D9488] group"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0D9488]/10 to-[#0D9488]/5 flex items-center justify-center group-hover:from-[#0D9488]/20 group-hover:to-[#0D9488]/10 transition-colors">
          <IconComponent className="w-8 h-8 text-[#0D9488]" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}