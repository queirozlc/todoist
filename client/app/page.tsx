import { MobileBottomSheet } from '@/components/mobile-bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { JetBrains_Mono } from 'next/font/google'

const titleFont = JetBrains_Mono({
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  weight: ['800']
})

export default function Home() {
  return (
    <>
      <header className="bg-transparent text-white min-h-12 flex items-center justify-center py-4 w-full fixed">
        <Typography
          variant={'h2'}
          className={cn('font-black text-foreground', titleFont.className)}
        >
          🎯 Todoist
        </Typography>
      </header>

      <main className="h-screen pt-20 container lg:max-w-[800px]">
        <Typography variant={'h4'} className="mt-5">
          Tasks 📝
        </Typography>

        <div className="flex items-center justify-center group sm:hidden">
          <MobileBottomSheet />
        </div>

        <form className="items-center group hidden sm:flex absolute bottom-8 right-0 left-0 w-[calc(100%-2rem)] mx-auto lg:w-[800px]">
          <Input
            className="h-12 bg-white/60 transition-all duration-400 px-4 py-2 text-base text-foreground font-medium rounded-r-none w-full flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus-visible:border-2 border-ring"
            placeholder="What needs to be done?"
            required
          />

          <Button
            type="button"
            className="h-12 rounded-l-none font-semibold text-lg"
          >
            + Add Task
          </Button>
        </form>
      </main>
    </>
  )
}
