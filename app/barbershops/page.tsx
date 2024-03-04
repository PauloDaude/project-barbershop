import { redirect } from 'next/navigation';
import BarbershopItem from '../(home)/_components/barbershop-item';
import Header from '../_components/header';
import { db } from '../_lib/prisma';

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    return redirect('/');
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  });
  console.log(barbershops);
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map(barbershop => (
            <div className="w-full" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
        {barbershops.length === 0 && <p>Nenhuma barbearia encontrada.</p>}
      </div>
    </>
  );
};
export default BarbershopPage;
