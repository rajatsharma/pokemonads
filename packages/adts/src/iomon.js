import { K, compose } from '@pokemonads/combinators'

const IO = g => {
  const map = f =>
    compose(
      IO,
      K,
      f,
      g
    )()

  const chain = f =>
    IO(_ =>
      compose(
        f,
        g
      )().run()
    )

  const ap = a => chain(a.map)

  const run = _ => g()

  return { map, chain, ap, run }
}

IO.of = f => IO(f)
IO.print = x => {
  console.log(x)
  return x
}

export default IO
