require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('ISBN Lookup', () => {
  testISBN('9064507198');
  testISBN('9780992914684');
  testISBN('0822371057');
});

function testISBN(isbn) {
  it('should search for ' + isbn, (done) => {
    const bundle = {
      inputData: {
        isbn: isbn,
      }
    };

    appTester(App.searches.book.operation.perform, bundle)
      .then(results => {
        should(results.length).equal(1);

        console.log(results);

        done();
      })
      .catch(done);
  });
}
