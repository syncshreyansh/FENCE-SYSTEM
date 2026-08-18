export const mockDevices = [
  { id: 'DEV-001', zone: 'Kanha', sector: 'Sector 2-A', status: 'normal', dutyCycle: 3.2, x: 15, y: 30 },
  { id: 'DEV-002', zone: 'Kanha', sector: 'Sector 4-B', status: 'violation', dutyCycle: 94.3, x: 25, y: 45 },
  { id: 'DEV-003', zone: 'Kanha', sector: 'Sector 1-C', status: 'offline', dutyCycle: null, x: 10, y: 60 },
  { id: 'DEV-004', zone: 'Kanha', sector: 'Sector 3-A', status: 'normal', dutyCycle: 2.8, x: 35, y: 20 },
  { id: 'DEV-005', zone: 'Kanha', sector: 'Sector 5-D', status: 'normal', dutyCycle: 4.1, x: 40, y: 70 },
  
  { id: 'DEV-101', zone: 'Sonitpur', sector: 'Sector A-1', status: 'normal', dutyCycle: 2.4, x: 65, y: 20 },
  { id: 'DEV-102', zone: 'Sonitpur', sector: 'Sector B-3', status: 'violation', dutyCycle: 91.2, x: 75, y: 50 },
  { id: 'DEV-103', zone: 'Sonitpur', sector: 'Sector C-2', status: 'normal', dutyCycle: 1.9, x: 85, y: 35 },
  { id: 'DEV-104', zone: 'Sonitpur', sector: 'Sector D-4', status: 'normal', dutyCycle: 3.7, x: 60, y: 80 },
  { id: 'DEV-105', zone: 'Sonitpur', sector: 'Sector E-1', status: 'violation', dutyCycle: 88.6, x: 90, y: 65 },
];

export const mockAlerts = [
  { id: 'ALT-923', meterId: 'DEV-002', type: 'violation', zone: 'Kanha', timeAgo: 'Just now' },
  { id: 'ALT-922', meterId: 'DEV-102', type: 'violation', zone: 'Sonitpur', timeAgo: '2 min ago' },
  { id: 'ALT-921', meterId: 'DEV-105', type: 'violation', zone: 'Sonitpur', timeAgo: '5 min ago' },
  { id: 'ALT-920', meterId: 'DEV-003', type: 'offline', zone: 'Kanha', timeAgo: '15 min ago' },
];
