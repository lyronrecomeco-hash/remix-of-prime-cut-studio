// Mock data for the barbershop

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  icon: string;
}

export interface Barber {
  id: string;
  name: string;
  photo: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: Service;
  barber: Barber;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  position?: number;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte moderno com acabamento impecável',
    duration: 30,
    price: 45,
    icon: 'Scissors',
  },
  {
    id: '2',
    name: 'Barba Completa',
    description: 'Modelagem e hidratação profissional',
    duration: 25,
    price: 35,
    icon: 'Brush',
  },
  {
    id: '3',
    name: 'Corte + Barba',
    description: 'Combo completo para o visual perfeito',
    duration: 50,
    price: 70,
    icon: 'Crown',
  },
  {
    id: '4',
    name: 'Navalhado',
    description: 'Acabamento preciso com navalha',
    duration: 20,
    price: 25,
    icon: 'Zap',
  },
  {
    id: '5',
    name: 'Pigmentação',
    description: 'Cobertura natural de fios brancos',
    duration: 40,
    price: 55,
    icon: 'Palette',
  },
  {
    id: '6',
    name: 'Tratamento Capilar',
    description: 'Hidratação e revitalização',
    duration: 35,
    price: 60,
    icon: 'Sparkles',
  },
];

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Ricardo Silva',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    specialties: ['Corte Degradê', 'Barba'],
    rating: 4.9,
    reviewCount: 234,
    available: true,
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    specialties: ['Navalhado', 'Pigmentação'],
    rating: 4.8,
    reviewCount: 189,
    available: true,
  },
  {
    id: '3',
    name: 'André Costa',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    specialties: ['Corte Clássico', 'Tratamentos'],
    rating: 4.7,
    reviewCount: 156,
    available: false,
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'João Paulo',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Melhor barbearia da cidade. Atendimento impecável e resultado sempre perfeito.',
  },
  {
    id: '2',
    name: 'Marcelo Santos',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Ambiente sofisticado e profissionais de alto nível. Recomendo demais!',
  },
  {
    id: '3',
    name: 'Fernando Lima',
    photo: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'O agendamento online é muito prático. Nunca mais pego fila.',
  },
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=600&fit=crop',
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 20;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Simulate some unavailable slots
      const available = Math.random() > 0.3;
      slots.push({ time, available });
    }
  }
  
  return slots;
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Pedro Oliveira',
    clientPhone: '(11) 99999-1234',
    service: services[0],
    barber: barbers[0],
    date: '2025-01-02',
    time: '10:00',
    status: 'confirmed',
    position: 1,
  },
  {
    id: '2',
    clientName: 'Lucas Ferreira',
    clientPhone: '(11) 99999-5678',
    service: services[2],
    barber: barbers[0],
    date: '2025-01-02',
    time: '10:30',
    status: 'pending',
    position: 2,
  },
  {
    id: '3',
    clientName: 'Marcos Ribeiro',
    clientPhone: '(11) 99999-9012',
    service: services[1],
    barber: barbers[1],
    date: '2025-01-02',
    time: '11:00',
    status: 'confirmed',
    position: 3,
  },
];

export const shopInfo = {
  name: 'Barber Studio',
  tagline: 'Experiência Premium em Cortes Masculinos',
  description: 'Há mais de 10 anos transformando o visual masculino com precisão, estilo e atendimento de excelência.',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  phone: '(11) 99999-0000',
  whatsapp: '5511999990000',
  mapsLink: 'https://maps.google.com/?q=Av.+Paulista,+1000,+São+Paulo',
  hours: {
    weekdays: '09:00 - 20:00',
    saturday: '09:00 - 18:00',
    sunday: 'Fechado',
  },
  social: {
    instagram: 'https://instagram.com/barberstudio',
    facebook: 'https://facebook.com/barberstudio',
  },
};
