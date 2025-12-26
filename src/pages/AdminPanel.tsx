import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Settings,
  Bell,
  Scissors,
  LogOut,
  Menu,
  X,
  Check,
  XCircle,
  Play,
  Pause,
  Plus,
  ChevronRight,
  Moon,
  Sun,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockAppointments, services, Appointment, shopInfo } from '@/lib/data';

const menuItems = [
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'fila', label: 'Fila de Espera', icon: Users },
  { id: 'horarios', label: 'Horários', icon: Clock },
  { id: 'servicos', label: 'Serviços', icon: Scissors },
  { id: 'config', label: 'Configurações', icon: Settings },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('agenda');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [queueEnabled, setQueueEnabled] = useState(true);
  const [maxQueueSize, setMaxQueueSize] = useState(10);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light' | 'gold'>('dark');

  // Simulate real-time queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (queueEnabled && appointments.length > 0) {
        // Randomly update positions
        const shouldUpdate = Math.random() > 0.7;
        if (shouldUpdate) {
          setNotifications(prev => [
            `Cliente chamado para atendimento`,
            ...prev.slice(0, 4)
          ]);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [queueEnabled, appointments]);

  const handleAppointmentAction = (id: string, action: 'confirm' | 'cancel' | 'complete') => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id
          ? { ...apt, status: action === 'confirm' ? 'confirmed' : action === 'cancel' ? 'cancelled' : 'completed' }
          : apt
      )
    );
    
    const actionText = action === 'confirm' ? 'confirmado' : action === 'cancel' ? 'cancelado' : 'concluído';
    setNotifications(prev => [`Agendamento ${actionText}`, ...prev.slice(0, 4)]);
  };

  const callNextInQueue = () => {
    const pending = appointments.find(a => a.status === 'pending' || a.status === 'confirmed');
    if (pending) {
      setNotifications(prev => [
        `${pending.clientName} chamado para atendimento ✂️`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'agenda':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Agenda de Hoje</h2>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </Button>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{apt.time}</div>
                        <div className="text-xs text-muted-foreground">{apt.service.duration} min</div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{apt.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{apt.service.name}</p>
                        <p className="text-xs text-muted-foreground">{apt.clientPhone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === 'confirmed' ? 'bg-primary/20 text-primary' :
                        apt.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        apt.status === 'cancelled' ? 'bg-destructive/20 text-destructive' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {apt.status === 'confirmed' ? 'Confirmado' :
                         apt.status === 'completed' ? 'Concluído' :
                         apt.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                      </span>
                      
                      {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleAppointmentAction(apt.id, 'confirm')}
                            className="w-8 h-8 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAppointmentAction(apt.id, 'complete')}
                            className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center justify-center"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAppointmentAction(apt.id, 'cancel')}
                            className="w-8 h-8 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 flex items-center justify-center"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'fila':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Fila de Espera</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQueueEnabled(!queueEnabled)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    queueEnabled ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {queueEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {queueEnabled ? 'Ativa' : 'Desativada'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Na fila</p>
                <p className="text-3xl font-bold text-primary">{appointments.filter(a => a.status === 'pending').length}</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Limite máximo</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={maxQueueSize}
                    onChange={(e) => setMaxQueueSize(Number(e.target.value))}
                    className="w-20 text-2xl font-bold bg-transparent focus:outline-none"
                  />
                  <span className="text-muted-foreground">pessoas</span>
                </div>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Tempo médio</p>
                <p className="text-3xl font-bold">~25 min</p>
              </div>
            </div>

            <Button variant="hero" size="lg" onClick={callNextInQueue} className="w-full mb-6">
              Chamar Próximo Cliente
            </Button>

            <div className="space-y-2">
              {appointments
                .filter(a => a.status === 'pending' || a.status === 'confirmed')
                .map((apt, index) => (
                <div key={apt.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}°
                    </div>
                    <div>
                      <h3 className="font-semibold">{apt.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{apt.service.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Estimativa</p>
                    <p className="font-medium">~{(index + 1) * 15} min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'horarios':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Gestão de Horários</h2>
            
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Horário de Funcionamento</h3>
              <div className="space-y-3">
                {[
                  { day: 'Segunda a Sexta', time: '09:00 - 20:00' },
                  { day: 'Sábado', time: '09:00 - 18:00' },
                  { day: 'Domingo', time: 'Fechado' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span>{item.day}</span>
                    <span className="text-primary font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Intervalo para Almoço</h3>
              <div className="flex items-center gap-4">
                <input
                  type="time"
                  defaultValue="12:00"
                  className="bg-secondary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span>até</span>
                <input
                  type="time"
                  defaultValue="13:00"
                  className="bg-secondary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-4">Bloquear Horários</h3>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4" />
                Adicionar Bloqueio
              </Button>
            </div>
          </div>
        );

      case 'servicos':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Serviços</h2>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                Novo Serviço
              </Button>
            </div>

            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">R$ {service.price}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'config':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>
            
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Tema Visual
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dark Luxury', colors: ['bg-black', 'bg-emerald-500'] },
                    { id: 'light', label: 'Clean Luxe', colors: ['bg-slate-200', 'bg-slate-600'] },
                    { id: 'gold', label: 'Black & Gold', colors: ['bg-black', 'bg-amber-500'] },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === t.id ? 'border-primary' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        {t.colors.map((c, i) => (
                          <div key={i} className={`w-6 h-6 rounded-full ${c}`} />
                        ))}
                      </div>
                      <p className="text-sm font-medium">{t.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-primary" />
                  Modo Escuro
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ativar modo escuro</span>
                  <button className="w-12 h-6 rounded-full bg-primary relative">
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground" />
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-4">Logo da Barbearia</h3>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <p className="text-muted-foreground mb-2">Arraste uma imagem ou clique para enviar</p>
                  <Button variant="outline" size="sm">Escolher arquivo</Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold">Painel Admin</h1>
              <p className="text-xs text-muted-foreground">Demo</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                activeTab === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 lg:hidden"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold">Admin</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="px-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                      activeTab === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h2 className="font-semibold">Olá, Ricardo!</h2>
            <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Notifications Toast */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          <AnimatePresence>
            {notifications.slice(0, 3).map((notification, index) => (
              <motion.div
                key={`${notification}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-card"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm">{notification}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminPanel;
