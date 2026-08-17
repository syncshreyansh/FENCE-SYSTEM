export const mockDevices = [
  { id: 'DEV-001', zone: 'Kanha', status: 'normal', x: 15, y: 30 },
  { id: 'DEV-002', zone: 'Kanha', status: 'violation', x: 25, y: 45 },
  { id: 'DEV-003', zone: 'Kanha', status: 'offline', x: 10, y: 60 },
  { id: 'DEV-004', zone: 'Kanha', status: 'normal', x: 35, y: 20 },
  { id: 'DEV-005', zone: 'Kanha', status: 'normal', x: 40, y: 70 },
  
  { id: 'DEV-101', zone: 'Sonitpur', status: 'normal', x: 65, y: 20 },
  { id: 'DEV-102', zone: 'Sonitpur', status: 'violation', x: 75, y: 50 },
  { id: 'DEV-103', zone: 'Sonitpur', status: 'normal', x: 85, y: 35 },
  { id: 'DEV-104', zone: 'Sonitpur', status: 'normal', x: 60, y: 80 },
  { id: 'DEV-105', zone: 'Sonitpur', status: 'violation', x: 90, y: 65 },
];

export const mockAlerts = [
  { id: 'ALT-923', meterId: 'DEV-002', type: 'violation', zone: 'Kanha', timeAgo: 'Just now' },
  { id: 'ALT-922', meterId: 'DEV-102', type: 'violation', zone: 'Sonitpur', timeAgo: '2 min ago' },
  { id: 'ALT-921', meterId: 'DEV-105', type: 'violation', zone: 'Sonitpur', timeAgo: '5 min ago' },
  { id: 'ALT-920', meterId: 'DEV-003', type: 'offline', zone: 'Kanha', timeAgo: '15 min ago' },
];
