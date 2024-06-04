/* eslint-disable */
// @ts-nocheck

RegisterActivity('Vocabulary', () => {
  viewModel.submit();

  viewModel.nextAvailableWord(
    ko.utils.arrayFirst(window[0].viewModel.words(), function (item) {
      return !item.complete();
    })
  );

  viewModel.nextWord();
});
