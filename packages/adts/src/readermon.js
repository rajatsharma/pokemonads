import { K, I, compose, run as Run, map as Map } from '@pokemonads/combinators'
import { flip } from 'ramda'

const Reader = Fn => {
  const run = x => Fn(x)
  const map = g =>
    Reader(
      compose(
        g,
        run
      )
    )
  const chain = g =>
    Reader(config =>
      compose(
        Run(config),
        g,
        run
      )(config)
    )
  const ap = compose(
    chain,
    flip(Map)
  )

  return { run, map, chain, ap }
}

Reader.of = compose(
  Reader,
  K
)
Reader.ask = Reader(I)

export default Reader
