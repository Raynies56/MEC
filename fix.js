
const fs = require('fs');

function replaceInFile(path, replacements) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  replacements.forEach(([find, replace]) => {
    content = content.split(find).join(replace);
  });
  fs.writeFileSync(path, content);
}

const apiRoutes = [
  'app/api/appointments/[id]/route.ts',
  'app/api/appointments/route.ts',
  'app/api/appointments/today-schedule/route.ts',
  'app/api/blocked-slots/route.ts'
];

apiRoutes.forEach(route => {
  replaceInFile(route, [
    ['import { getServerSession } from \'next-auth\';', 'import { getSession } from \'@/lib/session\';'],
    ['import { authOptions } from \'@/lib/auth\';', ''],
    ['const session = await getServerSession(authOptions);', 'const session = await getSession();'],
    ['if (!session) {', 'if (!session.isLoggedIn) {'],
    ['if (!session) return', 'if (!session.isLoggedIn) return']
  ]);
});

replaceInFile('components/admin/AdminModals.tsx', [
  ['disabled={(d: any) => d < new Date(new Date().setHours(0, 0, 0, 0))}', ''],
  ['disabled={(d: any) => d < new Date(new Date().setHours(0,0,0,0))}', '']
]);

replaceInFile('components/dashboard/RescheduleModal.tsx', [
  ['disabled={(date: any) => date < new Date(new Date().setHours(0, 0, 0, 0))}', ''],
  ['disabled={(date: any) => date < new Date(new Date().setHours(0,0,0,0))}', '']
]);

replaceInFile('app/api/admin/appointments/route.ts', [
  ['const newAppointment = await createManualAppointment(result.data);', 'const newAppointment = await createManualAppointment(result.data as any);']
]);

console.log('Done');

