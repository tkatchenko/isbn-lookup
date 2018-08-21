module.exports = {
  key: 'book',
  noun: 'Book',
  display: {
    label: 'Find a Book',
    description: 'Search for book by ISBN.'
  },
  operation: {
    inputFields: [
      {
        key: 'isbn',
        type: 'string',
        label: 'ISBN',
        helpText: 'ISBN to search for.'
      }
    ],
    perform: (z, bundle) => {
      const url = 'https://www.googleapis.com/books/v1/volumes';

      const options = {
        params: {
          q: 'isbn:' + bundle.inputData.isbn,
          projection: 'full',
        }
      };

      return z.request(url, options).then((response) => {
        const result = JSON.parse(response.content);

        if (result.totalItems === 0) return [];

        const book = result.items[0].volumeInfo;

        return [
          {
            title: book.title,
            authors: book.authors.join(', '),
            publisher: book.publisher,
            publishDate: book.publishedDate,
            pages: book.pageCount,
            categories: book.categories.join(', '),
            cover: book.imageLinks.thumbnail.replace('&edge=curl', ''),
            webLink: book.infoLink,
          },
        ];
      });
    },
  }
};
