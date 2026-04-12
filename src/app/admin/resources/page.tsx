import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/admin-auth'
import AdminResourcesDashboard from '@/components/AdminResourcesDashboard'

export default async function AdminResourcesPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (adminSession !== getAdminSessionValue()) {
    redirect('/admin')
  }

  return <AdminResourcesDashboard />
}
