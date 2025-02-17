class FavoriteFilms {
  #data = $state<number[]>([]);

  constructor() {
    this.#data = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
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
