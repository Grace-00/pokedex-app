export enum Pages {
  PokemonList = '/',
  PokemonCard = '/pokemon/' + ':pokemonName',
  Favourites = '/favourites',
  NotFound = '*',
}

// POKEMON INTERFACES

export interface PokemonPage {
  results: {
    name: string
    url: string
    sprites: Sprites
  }[]
  next: string | null
  previous: string | null
  count: number
}

export interface Pokemon {
  readonly name: string
  readonly url: string
  readonly sprites: Sprites
  readonly height?: number
  readonly weight?: number
  readonly types?: Types[]
  readonly moves?: Moves[]
  readonly stats?: Stats[]
}
export interface Types {
  readonly type: {
    readonly name: string
    readonly url: string
  }
}

export interface Moves {
  readonly move: {
    readonly name: string
    readonly url: string
  }
}

export interface Stats {
  readonly base_stat: number
  readonly effort: number
  readonly stat: {
    readonly name: string
    readonly url: string
  }
}

export interface Sprites {
  front_default: string
  front_female?: string
  front_shiny: string
  front_shiny_female?: string
  back_default: string
  back_female?: string
  back_shiny: string
  back_shiny_female?: string
}
