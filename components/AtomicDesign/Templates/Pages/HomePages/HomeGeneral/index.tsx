// Import customHooks
import { useIsMobile } from '@/hooks/useIsMobile';

//
import { HeaderWelcome } from '@/components/pages/HomePages/Headers/HeaderWelcome';
import { Title } from '@/components/AtomicDesign/Atoms/Typography/Title';
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';
import { CardEngineer } from '@/components/pages/HomePages/Cards/CardEngineer';
import { ButtonIcon } from '@/components/AtomicDesign/Atoms/Buttons/ButtonIcon';
import { GroupCardsQuoteChase } from '@/components/pages/HomePages/Groups/GroupCardsQuoteChase';
import { GroupCardsWeeklyStatistics } from '@/components/pages/HomePages/Groups/GroupCardsWeeklyStatistics';

//
import {
  dataExampleEngineers,
  groupWeeklyStatistics,
} from '@/components/pages/HomePages/constants';
import { useWeeklyCount } from '@/hooks/home/useWeeklyCount';

const HomeGeneral = () => {
  const {
    jobsWeeklyCountData,
    leadsWeeklyCountData,
    quotationsWeeklyCountData,
    invoicesWeeklyCountData,
  } = useWeeklyCount();

  // Implement customHooks
  const isMobileDevice = useIsMobile();
  return (
    <div className='page home'>
      {/** Column #1 */}
      <section className='h-[100%] md:col-span-2 flex flex-col justify-between gap-2'>
        <div className='lg:h-[70%] flex-grow space-y-3 md:space-y-2'>
          <HeaderWelcome />
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Title title='Engineers' extraClassName='home__title' />
              <Button text='View All' primary extraClassName='button--cell' />
            </div>
            {dataExampleEngineers?.map((engineer) => (
              <CardEngineer
                key={engineer.id}
                data={{
                  user: {
                    name: 'John wilmer chavarro',
                  },
                  progress: {
                    value: 20,
                    goal: 35,
                  },
                  rating: {
                    currentRating: 2,
                  },
                }}
              />
            ))}
          </div>
        </div>
        <div className='lg:h-[30%] space-y-2'>
          <Title title='Map jobs' extraClassName='home__title' />
          <div className='bg-primary-grayish rounded-2xl flex-shrink h-[85%]' />
        </div>
      </section>

      {/** Column #2 */}
      <section className='h-[100%] md:col-span-3 flex flex-col justify-between gap-2'>
        <div className='flex-grow flex flex-col gap-2 justify-between pb-2'>
          <div className='flex items-center justify-between md:justify-end gap-5'>
            <Button text='Booked Jobs' icon='iconoir:tools' primary />
            {!isMobileDevice && (
              <Button text='Quotation' icon='la:file-invoice' primary />
            )}
            {!isMobileDevice && (
              <Button
                text='Time Sheets'
                icon='la:file-invoice-dollar'
                primary
              />
            )}
            {isMobileDevice && (
              <div className='flex gap-5'>
                <ButtonIcon icon='la:file-invoice' />
                <ButtonIcon icon='la:file-invoice-dollar' />
              </div>
            )}
          </div>
          <div className='h-[85%]'>
            <GroupCardsWeeklyStatistics
              title='Weekly Statistics'
              labels={groupWeeklyStatistics}
              values={[
                leadsWeeklyCountData ?? 0,
                quotationsWeeklyCountData ?? 0,
                jobsWeeklyCountData ?? 0,
                invoicesWeeklyCountData ?? 0,
              ]}
            />
          </div>
        </div>
        <div className='flex-shrink'>
          <GroupCardsQuoteChase />
        </div>
      </section>
    </div>
  );
};

export { HomeGeneral };
