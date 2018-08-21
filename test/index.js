require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('ISBN Lookup', () => {
  it('should search for a book', (done) => {
    const bundle = {
      inputData: {
        isbn: '0451526538',
      }
    };

    appTester(App.searches.book.operation.perform, bundle)
      .then(results => {
        should(results.length).equal(1);

        console.log('Result: ', results)

        done();
      })
      .catch(done);
  });

});
