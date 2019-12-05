module.exports = (function(settings) {
  settings.test_workers = false;
  return settings;
})(require('./.kbase-service/worker/e2e/config/nightwatch/nightwatch.json'));