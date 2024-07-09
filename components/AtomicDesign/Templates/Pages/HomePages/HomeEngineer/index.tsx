import React from 'react';

// Import of custom components
import { HeaderWelcome } from '@/components/pages/HomePages/Headers/HeaderWelcome';
import { Title } from '@/components/AtomicDesign/Atoms/Typography/Title';
import { HeaderActions } from '@/components/pages/HomePages/Headers/HeaderActions';
import { GroupCardsWeeklyStatistics } from '@/components/pages/HomePages/Groups/GroupCardsWeeklyStatistics';
import { GroupCardsQuoteChase } from '@/components/pages/HomePages/Groups/GroupCardsQuoteChase';

//
import { groupWeeklyReports } from '@/components/pages/HomePages/constants';

const HomeEngineer = () => (
  // Implement customHooks
  <div className='page home'>
    {/** Column #1 */}
    <section className='h-[100%] md:col-span-2 flex flex-col justify-between gap-2'>
      <div className='lg:h-[70%] flex-grow space-y-5'>
        <HeaderWelcome />
        <div className='w-11/12'>
          <GroupCardsWeeklyStatistics
            title='Weekly reports'
            labels={groupWeeklyReports}
            values={[40, 50]}
            extraClassName='home-engineer__cards-weekly'
          />
        </div>
      </div>
      <div className='lg:h-[30%] space-y-2'>
        <Title title='Map jobs' extraClassName='home__title' />
        <div className='bg-primary-grayish rounded-2xl flex-shrink h-[80%]' />
      </div>
    </section>

    {/** Column #2 */}
    <section className='h-[100%] md:col-span-3 flex flex-col justify-between gap-2'>
      <div className='flex-grow flex flex-col gap-2 justify-between pb-2'>
        <HeaderActions title='Booked jobs today' />
        <div className='bg-primary-grayish rounded-xl md:h-[85%]' />
      </div>
      <div className='flex-shrink'>
        <GroupCardsQuoteChase />
      </div>
    </section>
  </div>
);
export { HomeEngineer };
