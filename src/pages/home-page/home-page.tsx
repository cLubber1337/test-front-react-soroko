import { Button } from '@/components/ui-kit'

export const HomePage = () => {
  return (
    <main>
      <div className={'container'}>
        <h1>Home page</h1>
        <Button variant={'outlined'}>outlined!</Button>
        <Button variant={'contained'}>contained!</Button>
        <Button variant={'unstyled'}>contained!</Button>
      </div>
    </main>
  )
}
