module.exports = function(config) {
  config.set({
    basePath: '../..',

    frameworks: ['jasmine'],

    autoWatch: true,

    preprocessors: {
      '**/*.coffee': 'coffee'
    },

    files: [
      'app/assets/javascripts/angular/angular.js',
      'app/assets/javascripts/angular/angular-mocks.js',
      'app/assets/javascripts/angular/main.js.coffee',
      'app/assets/javascripts/angular/controllers/PostIndexCtrl.js.coffee',
      'app/assets/javascripts/angular/*',
      'spec/javascripts/*_spec.js.coffee'
    ]
  });
};
