import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Clock, Heart, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Excelência',
    description: 'Profissionais certificados com anos de experiência',
  },
  {
    icon: Clock,
    title: 'Pontualidade',
    description: 'Respeito ao seu tempo com atendimento agendado',
  },
  {
    icon: Heart,
    title: 'Experiência',
    description: 'Ambiente sofisticado e acolhedor',
  },
  {
    icon: Shield,
    title: 'Qualidade',
    description: 'Produtos premium e equipamentos de ponta',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sobre" className="section-padding bg-background" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Mais que uma barbearia,
            <br />
            <span className="text-gradient">uma experiência</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Há mais de 10 anos transformando o visual masculino com precisão, 
            estilo e atendimento de excelência. Cada detalhe pensado para você.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
