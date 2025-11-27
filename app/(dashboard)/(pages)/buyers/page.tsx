import DataBuyerTable from './components/data-table';
import { forbidden } from 'next/navigation';
import getServer from '@/lib/getServer';

export default async function BuyersPage() {
  const session = await getServer();

  const role = session?.user.role;

  if (role !== 'admin') return forbidden();

  return (
    <div>
      <DataBuyerTable />
    </div>
  );
}
