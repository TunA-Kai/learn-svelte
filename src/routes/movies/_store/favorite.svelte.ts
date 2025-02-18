class FavoriteFilms {
  #data = $state<number[]>([]);

  constructor() {
    try {
      // NOTE: on server side localStorage is not available
      this.#data = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    } catch (e) {
      this.#data = [];
    }
  }

  get data() {
    return this.#data;
  }

  set data(value: number[]) {
    this.#data = value;
    localStorage.setItem('favoriteFilms', JSON.stringify(value));
  }

  add(id: number) {
    this.data = [...this.data, id];
  }

  remove(id: number) {
    this.data = this.data.filter((item) => item !== id);
  }

  isFavorite(id: number) {
    return this.data.includes(id);
  }
}

export const favoriteFilms = new FavoriteFilms();
