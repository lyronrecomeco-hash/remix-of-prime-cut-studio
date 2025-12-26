import { Scissors, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { shopInfo } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-narrow section-padding py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">{shopInfo.name}</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              {shopInfo.tagline}. Atendimento premium com agendamento online 
              para sua comodidade.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horários</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Seg - Sex: {shopInfo.hours.weekdays}</p>
              <p>Sábado: {shopInfo.hours.saturday}</p>
              <p>Domingo: {shopInfo.hours.sunday}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>{shopInfo.phone}</p>
              <p className="text-xs">{shopInfo.address}</p>
            </div>
            
            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a 
                href={shopInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={shopInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${shopInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} {shopInfo.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
