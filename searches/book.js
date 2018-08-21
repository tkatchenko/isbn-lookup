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
      const url = 'https://openlibrary.org/api/books';

      const options = {
        params: {
          bibkeys: 'ISBN:' + bundle.inputData.isbn,
          format: 'JSON',
          jscmd: 'data',
        }
      };

      return z.request(url, options).then((response) => {
        const books = JSON.parse(response.content);
        const bookIndex = Object.keys(books)[0]
        const book = books[bookIndex];
        console.log(book);
        return [
          {
            title: book.title,    
            authors: book.authors.map(el => el.name).join(', '),
          },
        ];
      });
    },
  }
};
